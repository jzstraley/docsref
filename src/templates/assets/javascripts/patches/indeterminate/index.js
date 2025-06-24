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
exports.patchIndeterminate = patchIndeterminate;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Patch indeterminate checkboxes
 *
 * This function replaces the indeterminate "pseudo state" with the actual
 * indeterminate state, which is used to keep navigation always expanded.
 *
 * @param options - Options
 */
function patchIndeterminate({ document$, tablet$ }) {
    document$
        .pipe((0, rxjs_1.switchMap)(() => (0, browser_1.getElements)(".md-toggle--indeterminate")), (0, rxjs_1.tap)(el => {
        el.indeterminate = true;
        el.checked = false;
    }), (0, rxjs_1.mergeMap)(el => (0, rxjs_1.fromEvent)(el, "change")
        .pipe((0, rxjs_1.takeWhile)(() => el.classList.contains("md-toggle--indeterminate")), (0, rxjs_1.map)(() => el))), (0, rxjs_1.withLatestFrom)(tablet$))
        .subscribe(([el, tablet]) => {
        el.classList.remove("md-toggle--indeterminate");
        if (tablet)
            el.checked = false;
    });
}
//# sourceMappingURL=index.js.map