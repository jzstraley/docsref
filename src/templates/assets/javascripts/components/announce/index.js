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
exports.watchAnnounce = watchAnnounce;
exports.mountAnnounce = mountAnnounce;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch announcement bar
 *
 * @param el - Announcement bar element
 *
 * @returns Announcement bar observable
 */
function watchAnnounce(el) {
    const button = (0, browser_1.getElement)(".md-typeset > :first-child", el);
    return (0, rxjs_1.fromEvent)(button, "click", { once: true })
        .pipe((0, rxjs_1.map)(() => (0, browser_1.getElement)(".md-typeset", el)), (0, rxjs_1.map)(content => ({ hash: __md_hash(content.innerHTML) })));
}
/**
 * Mount announcement bar
 *
 * @param el - Announcement bar element
 *
 * @returns Announcement bar component observable
 */
function mountAnnounce(el) {
    if (!(0, _1.feature)("announce.dismiss") || !el.childElementCount)
        return rxjs_1.EMPTY;
    /* Support instant navigation - see https://t.ly/3FTme */
    if (!el.hidden) {
        const content = (0, browser_1.getElement)(".md-typeset", el);
        if (__md_hash(content.innerHTML) === __md_get("__announce"))
            el.hidden = true;
    }
    /* Mount component on subscription */
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        push$.subscribe(({ hash }) => {
            el.hidden = true;
            /* Persist preference in local storage */
            __md_set("__announce", hash);
        });
        /* Create and return component */
        return watchAnnounce(el)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map