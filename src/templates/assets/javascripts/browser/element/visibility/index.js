"use strict";
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