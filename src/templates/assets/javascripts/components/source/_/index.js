"use strict";
/*
 * Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchSource = watchSource;
exports.mountSource = mountSource;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const templates_1 = require("~/templates");
const _1 = require("../../_");
const facts_1 = require("../facts");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Repository information observable
 */
let fetch$;
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch repository information
 *
 * This function tries to read the repository facts from session storage, and
 * if unsuccessful, fetches them from the underlying provider.
 *
 * @param el - Repository information element
 *
 * @returns Repository information observable
 */
function watchSource(el) {
    return fetch$ || (fetch$ = (0, rxjs_1.defer)(() => {
        const cached = __md_get("__source", sessionStorage);
        if (cached) {
            return (0, rxjs_1.of)(cached);
        }
        else {
            /* Check if consent is configured and was given */
            const els = (0, _1.getComponentElements)("consent");
            if (els.length) {
                const consent = __md_get("__consent");
                if (!(consent && consent.github))
                    return rxjs_1.EMPTY;
            }
            /* Fetch repository facts */
            return (0, facts_1.fetchSourceFacts)(el.href)
                .pipe((0, rxjs_1.tap)(facts => __md_set("__source", facts, sessionStorage)));
        }
    })
        .pipe((0, rxjs_1.catchError)(() => rxjs_1.EMPTY), (0, rxjs_1.filter)(facts => Object.keys(facts).length > 0), (0, rxjs_1.map)(facts => ({ facts })), (0, rxjs_1.shareReplay)(1)));
}
/**
 * Mount repository information
 *
 * @param el - Repository information element
 *
 * @returns Repository information component observable
 */
function mountSource(el) {
    const inner = (0, browser_1.getElement)(":scope > :last-child", el);
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        push$.subscribe(({ facts }) => {
            inner.appendChild((0, templates_1.renderSourceFacts)(facts));
            inner.classList.add("md-source__repository--active");
        });
        /* Create and return component */
        return watchSource(el)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map