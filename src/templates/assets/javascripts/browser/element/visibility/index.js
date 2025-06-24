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
exports.watchElementVisibility = watchElementVisibility;
exports.watchElementBoundary = watchElementBoundary;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Intersection observer entry subject
 */
const entry$ = new rxjs_1.Subject();
/**
 * Intersection observer observable
 *
 * This observable will create an `IntersectionObserver` on first subscription
 * and will automatically terminate it when there are no more subscribers.
 *
 * @see https://bit.ly/3iIYfEm - Google Groups on performance
 */
const observer$ = (0, rxjs_1.defer)(() => (0, rxjs_1.of)(new IntersectionObserver(entries => {
    for (const entry of entries)
        entry$.next(entry);
}, {
    threshold: 0
})))
    .pipe((0, rxjs_1.switchMap)(observer => (0, rxjs_1.merge)(rxjs_1.NEVER, (0, rxjs_1.of)(observer))
    .pipe((0, rxjs_1.finalize)(() => observer.disconnect()))), (0, rxjs_1.shareReplay)(1));
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch element visibility
 *
 * @param el - Element
 *
 * @returns Element visibility observable
 */
function watchElementVisibility(el) {
    return observer$
        .pipe((0, rxjs_1.tap)(observer => observer.observe(el)), (0, rxjs_1.switchMap)(observer => entry$
        .pipe((0, rxjs_1.filter)(({ target }) => target === el), (0, rxjs_1.finalize)(() => observer.unobserve(el)), (0, rxjs_1.map)(({ isIntersecting }) => isIntersecting))));
}
/**
 * Watch element boundary
 *
 * This function returns an observable which emits whether the bottom content
 * boundary (= scroll offset) of an element is within a certain threshold.
 *
 * @param el - Element
 * @param threshold - Threshold
 *
 * @returns Element boundary observable
 */
function watchElementBoundary(el, threshold = 16) {
    return (0, browser_1.watchElementContentOffset)(el)
        .pipe((0, rxjs_1.map)(({ y }) => {
        const visible = (0, browser_1.getElementSize)(el);
        const content = (0, browser_1.getElementContentSize)(el);
        return y >= (content.height - visible.height - threshold);
    }), (0, rxjs_1.distinctUntilChanged)());
}
//# sourceMappingURL=index.js.map