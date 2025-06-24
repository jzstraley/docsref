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
exports.watchConsent = watchConsent;
exports.mountConsent = mountConsent;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch consent
 *
 * @param el - Consent element
 * @param options - Options
 *
 * @returns Consent observable
 */
function watchConsent(el, { target$ }) {
    return target$
        .pipe((0, rxjs_1.map)(target => ({ hidden: target !== el })));
}
/* ------------------------------------------------------------------------- */
/**
 * Mount consent
 *
 * @param el - Consent element
 * @param options - Options
 *
 * @returns Consent component observable
 */
function mountConsent(el, options) {
    const internal$ = new rxjs_1.Subject();
    internal$.subscribe(({ hidden }) => {
        el.hidden = hidden;
    });
    /* Create and return component */
    return watchConsent(el, options)
        .pipe((0, rxjs_1.tap)(state => internal$.next(state)), (0, rxjs_1.finalize)(() => internal$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
}
//# sourceMappingURL=index.js.map