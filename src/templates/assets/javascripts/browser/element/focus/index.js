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
exports.watchElementFocus = watchElementFocus;
const rxjs_1 = require("rxjs");
const _1 = require("../_");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Focus observable
 *
 * Previously, this observer used `focus` and `blur` events to determine whether
 * an element is focused, but this doesn't work if there are focusable elements
 * within the elements itself. A better solutions are `focusin` and `focusout`
 * events, which bubble up the tree and allow for more fine-grained control.
 *
 * `debounceTime` is necessary, because when a focus change happens inside an
 * element, the observable would first emit `false` and then `true` again.
 */
const observer$ = (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(document.body, "focusin"), (0, rxjs_1.fromEvent)(document.body, "focusout"))
    .pipe((0, rxjs_1.debounceTime)(1), (0, rxjs_1.startWith)(undefined), (0, rxjs_1.map)(() => (0, _1.getActiveElement)() || document.body), (0, rxjs_1.shareReplay)(1));
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch element focus
 *
 * @param el - Element
 *
 * @returns Element focus observable
 */
function watchElementFocus(el) {
    return observer$
        .pipe((0, rxjs_1.map)(active => el.contains(active)), (0, rxjs_1.distinctUntilChanged)());
}
//# sourceMappingURL=index.js.map