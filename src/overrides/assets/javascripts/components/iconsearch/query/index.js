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
exports.mountIconSearchQuery = mountIconSearchQuery;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount icon search query
 *
 * @param el - Icon search query element
 *
 * @returns Icon search query component observable
 */
function mountIconSearchQuery(el) {
    /* Intercept focus and input events */
    const focus$ = (0, browser_1.watchElementFocus)(el);
    const value$ = (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(el, "keyup"), (0, rxjs_1.fromEvent)(el, "focus").pipe((0, rxjs_1.delay)(1)))
        .pipe((0, rxjs_1.map)(() => el.value), (0, rxjs_1.startWith)(el.value), (0, rxjs_1.distinctUntilChanged)());
    /* Log search on blur */
    focus$
        .pipe((0, rxjs_1.filter)(active => !active), (0, rxjs_1.withLatestFrom)(value$))
        .subscribe(([, value]) => {
        const path = document.location.pathname;
        if (typeof ga === "function" && value.length)
            ga("send", "pageview", `${path}?q=[icon]+${value}`);
    });
    /* Combine into single observable */
    return (0, rxjs_1.combineLatest)([value$, focus$])
        .pipe((0, rxjs_1.map)(([value, focus]) => ({ ref: el, value, focus })));
}
//# sourceMappingURL=index.js.map