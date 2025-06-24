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
exports.watchElementHover = watchElementHover;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch element hover
 *
 * The second parameter allows to specify a timeout in milliseconds after which
 * the hover state will be reset to `false`. This is useful for tooltips which
 * should disappear after a certain amount of time, in order to allow the user
 * to move the cursor from the host to the tooltip.
 *
 * @param el - Element
 * @param timeout - Timeout
 *
 * @returns Element hover observable
 */
function watchElementHover(el, timeout) {
    return (0, rxjs_1.defer)(() => (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(el, "mouseenter").pipe((0, rxjs_1.map)(() => true)), (0, rxjs_1.fromEvent)(el, "mouseleave").pipe((0, rxjs_1.map)(() => false)))
        .pipe(timeout ? (0, rxjs_1.debounce)(active => (0, rxjs_1.timer)(+!active * timeout)) : rxjs_1.identity, (0, rxjs_1.startWith)(el.matches(":hover"))));
}
//# sourceMappingURL=index.js.map