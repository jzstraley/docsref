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
exports.getElementContentOffset = getElementContentOffset;
exports.watchElementContentOffset = watchElementContentOffset;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve element content offset (= scroll offset)
 *
 * @param el - Element
 *
 * @returns Element content offset
 */
function getElementContentOffset(el) {
    return {
        x: el.scrollLeft,
        y: el.scrollTop
    };
}
/* ------------------------------------------------------------------------- */
/**
 * Watch element content offset
 *
 * @param el - Element
 *
 * @returns Element content offset observable
 */
function watchElementContentOffset(el) {
    return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(el, "scroll"), (0, rxjs_1.fromEvent)(window, "scroll"), (0, rxjs_1.fromEvent)(window, "resize"))
        .pipe((0, rxjs_1.auditTime)(0, rxjs_1.animationFrameScheduler), (0, rxjs_1.map)(() => getElementContentOffset(el)), (0, rxjs_1.startWith)(getElementContentOffset(el)));
}
//# sourceMappingURL=index.js.map