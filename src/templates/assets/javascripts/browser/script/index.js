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
exports.watchScript = watchScript;
const rxjs_1 = require("rxjs");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Create and load a `script` element
 *
 * This function returns an observable that will emit when the script was
 * successfully loaded, or throw an error if it wasn't.
 *
 * @param src - Script URL
 *
 * @returns Script observable
 */
function watchScript(src) {
    const script = (0, utilities_1.h)("script", { src });
    return (0, rxjs_1.defer)(() => {
        document.head.appendChild(script);
        return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(script, "load"), (0, rxjs_1.fromEvent)(script, "error")
            .pipe((0, rxjs_1.switchMap)(() => ((0, rxjs_1.throwError)(() => new ReferenceError(`Invalid script: ${src}`))))))
            .pipe((0, rxjs_1.map)(() => undefined), (0, rxjs_1.finalize)(() => document.head.removeChild(script)), (0, rxjs_1.take)(1));
    });
}
//# sourceMappingURL=index.js.map