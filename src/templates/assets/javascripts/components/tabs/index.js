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
exports.watchTabs = watchTabs;
exports.mountTabs = mountTabs;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch navigation tabs
 *
 * @param el - Navigation tabs element
 * @param options - Options
 *
 * @returns Navigation tabs observable
 */
function watchTabs(el, { viewport$, header$ }) {
    return (0, browser_1.watchElementSize)(document.body)
        .pipe((0, rxjs_1.switchMap)(() => (0, browser_1.watchViewportAt)(el, { header$, viewport$ })), (0, rxjs_1.map)(({ offset: { y } }) => {
        return {
            hidden: y >= 10
        };
    }), (0, rxjs_1.distinctUntilKeyChanged)("hidden"));
}
/**
 * Mount navigation tabs
 *
 * This function hides the navigation tabs when scrolling past the threshold
 * and makes them reappear in a nice CSS animation when scrolling back up.
 *
 * @param el - Navigation tabs element
 * @param options - Options
 *
 * @returns Navigation tabs component observable
 */
function mountTabs(el, options) {
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        push$.subscribe({
            /* Handle emission */
            next({ hidden }) {
                el.hidden = hidden;
            },
            /* Handle complete */
            complete() {
                el.hidden = false;
            }
        });
        /* Create and return component */
        return ((0, _1.feature)("navigation.tabs.sticky")
            ? (0, rxjs_1.of)({ hidden: false })
            : watchTabs(el, options))
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map