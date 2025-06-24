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
exports.watchDialog = watchDialog;
exports.mountDialog = mountDialog;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch dialog
 *
 * @param _el - Dialog element
 * @param options - Options
 *
 * @returns Dialog observable
 */
function watchDialog(_el, { alert$ }) {
    return alert$
        .pipe((0, rxjs_1.switchMap)(message => (0, rxjs_1.merge)((0, rxjs_1.of)(true), (0, rxjs_1.of)(false).pipe((0, rxjs_1.delay)(2000)))
        .pipe((0, rxjs_1.map)(active => ({ message, active })))));
}
/**
 * Mount dialog
 *
 * This function reveals the dialog in the right corner when a new alert is
 * emitted through the subject that is passed as part of the options.
 *
 * @param el - Dialog element
 * @param options - Options
 *
 * @returns Dialog component observable
 */
function mountDialog(el, options) {
    const inner = (0, browser_1.getElement)(".md-typeset", el);
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        push$.subscribe(({ message, active }) => {
            el.classList.toggle("md-dialog--active", active);
            inner.textContent = message;
        });
        /* Create and return component */
        return watchDialog(el, options)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map