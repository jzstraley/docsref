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
exports.getElementOffset = getElementOffset;
exports.getElementOffsetAbsolute = getElementOffsetAbsolute;
exports.watchElementOffset = watchElementOffset;
exports.watchElementOffsetAbsolute = watchElementOffsetAbsolute;
const rxjs_1 = require("rxjs");
const size_1 = require("../../size");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve element offset
 *
 * @param el - Element
 *
 * @returns Element offset
 */
function getElementOffset(el) {
    return {
        x: el.offsetLeft,
        y: el.offsetTop
    };
}
/**
 * Retrieve absolute element offset
 *
 * @param el - Element
 *
 * @returns Element offset
 */
function getElementOffsetAbsolute(el) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.x + window.scrollX,
        y: rect.y + window.scrollY
    };
}
/* ------------------------------------------------------------------------- */
/**
 * Watch element offset
 *
 * @param el - Element
 *
 * @returns Element offset observable
 */
function watchElementOffset(el) {
    return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(window, "load"), (0, rxjs_1.fromEvent)(window, "resize"))
        .pipe((0, rxjs_1.auditTime)(0, rxjs_1.animationFrameScheduler), (0, rxjs_1.map)(() => getElementOffset(el)), (0, rxjs_1.startWith)(getElementOffset(el)));
}
/**
 * Watch absolute element offset
 *
 * @param el - Element
 *
 * @returns Element offset observable
 */
function watchElementOffsetAbsolute(el) {
    return (0, rxjs_1.merge)(watchElementOffset(el), (0, size_1.watchElementSize)(document.body) // @todo find a better way for this
    )
        .pipe((0, rxjs_1.map)(() => getElementOffsetAbsolute(el)), (0, rxjs_1.startWith)(getElementOffsetAbsolute(el)));
}
//# sourceMappingURL=index.js.map