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
exports.getViewportOffset = getViewportOffset;
exports.watchViewportOffset = watchViewportOffset;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve viewport offset
 *
 * On iOS Safari, viewport offset can be negative due to overflow scrolling.
 * As this may induce strange behaviors downstream, we'll just limit it to 0.
 *
 * @returns Viewport offset
 */
function getViewportOffset() {
    return {
        x: Math.max(0, scrollX),
        y: Math.max(0, scrollY)
    };
}
/* ------------------------------------------------------------------------- */
/**
 * Watch viewport offset
 *
 * @returns Viewport offset observable
 */
function watchViewportOffset() {
    return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(window, "scroll", { passive: true }), (0, rxjs_1.fromEvent)(window, "resize", { passive: true }))
        .pipe((0, rxjs_1.map)(getViewportOffset), (0, rxjs_1.startWith)(getViewportOffset()));
}
//# sourceMappingURL=index.js.map