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
exports.watchDetails = watchDetails;
exports.mountDetails = mountDetails;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch details
 *
 * @param el - Details element
 * @param options - Options
 *
 * @returns Details observable
 */
function watchDetails(el, { target$, print$ }) {
    let open = true;
    return (0, rxjs_1.merge)(
    /* Open and focus details on location target */
    target$
        .pipe((0, rxjs_1.map)(target => target.closest("details:not([open])")), (0, rxjs_1.filter)(details => el === details), (0, rxjs_1.map)(() => ({
        action: "open", reveal: true
    }))), 
    /* Open details on print and close afterwards */
    print$
        .pipe((0, rxjs_1.filter)(active => active || !open), (0, rxjs_1.tap)(() => open = el.open), (0, rxjs_1.map)(active => ({
        action: active ? "open" : "close"
    }))));
}
/**
 * Mount details
 *
 * This function ensures that `details` tags are opened on anchor jumps and
 * prior to printing, so the whole content of the page is visible.
 *
 * @param el - Details element
 * @param options - Options
 *
 * @returns Details component observable
 */
function mountDetails(el, options) {
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        push$.subscribe(({ action, reveal }) => {
            el.toggleAttribute("open", action === "open");
            if (reveal)
                el.scrollIntoView();
        });
        /* Create and return component */
        return watchDetails(el, options)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map