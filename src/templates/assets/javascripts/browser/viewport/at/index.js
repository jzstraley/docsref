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
exports.watchViewportAt = watchViewportAt;
const rxjs_1 = require("rxjs");
const element_1 = require("../../element");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch viewport relative to element
 *
 * @param el - Element
 * @param options - Options
 *
 * @returns Viewport observable
 */
function watchViewportAt(el, { viewport$, header$ }) {
    const size$ = viewport$
        .pipe((0, rxjs_1.distinctUntilKeyChanged)("size"));
    /* Compute element offset */
    const offset$ = (0, rxjs_1.combineLatest)([size$, header$])
        .pipe((0, rxjs_1.map)(() => (0, element_1.getElementOffset)(el)));
    /* Compute relative viewport, return hot observable */
    return (0, rxjs_1.combineLatest)([header$, viewport$, offset$])
        .pipe((0, rxjs_1.map)(([{ height }, { offset, size }, { x, y }]) => ({
        offset: {
            x: offset.x - x,
            y: offset.y - y + height
        },
        size
    })));
}
//# sourceMappingURL=index.js.map