"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementSize = getElementSize;
exports.watchElementSize = watchElementSize;
const rxjs_1 = require("rxjs");
const script_1 = require("../../../script");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Resize observer entry subject
 */
const entry$ = new rxjs_1.Subject();
/**
 * Resize observer observable
 *
 * This observable will create a `ResizeObserver` on the first subscription
 * and will automatically terminate it when there are no more subscribers.
 * It's quite important to centralize observation in a single `ResizeObserver`,
 * as the performance difference can be quite dramatic, as the link shows.
 *
 * If the browser doesn't have a `ResizeObserver` implementation available, a
 * polyfill is automatically downloaded from unpkg.com. This is also compatible
 * with the built-in privacy plugin, which will download the polyfill and put
 * it alongside the built site for self-hosting.
 *
 * @see https://bit.ly/3iIYfEm - Google Groups on performance
 */
const observer$ = (0, rxjs_1.defer)(() => (typeof ResizeObserver === "undefined"
    ? (0, script_1.watchScript)("https://unpkg.com/resize-observer-polyfill")
    : (0, rxjs_1.of)(undefined)))
    .pipe((0, rxjs_1.map)(() => new ResizeObserver(entries => (entries.forEach(entry => entry$.next(entry))))), (0, rxjs_1.switchMap)(observer => (0, rxjs_1.merge)(rxjs_1.NEVER, (0, rxjs_1.of)(observer)).pipe((0, rxjs_1.finalize)(() => observer.disconnect()))), (0, rxjs_1.shareReplay)(1));
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve element size
 *
 * @param el - Element
 *
 * @returns Element size
 */
function getElementSize(el) {
    return {
        width: el.offsetWidth,
        height: el.offsetHeight
    };
}
/* ------------------------------------------------------------------------- */
/**
 * Watch element size
 *
 * This function returns an observable that subscribes to a single internal
 * instance of `ResizeObserver` upon subscription, and emit resize events until
 * termination. Note that this function should not be called with the same
 * element twice, as the first unsubscription will terminate observation.
 *
 * Sadly, we can't use the `DOMRect` objects returned by the observer, because
 * we need the emitted values to be consistent with `getElementSize`, which will
 * return the used values (rounded) and not actual values (unrounded). Thus, we
 * use the `offset*` properties. See the linked GitHub issue.
 *
 * @see https://bit.ly/3m0k3he - GitHub issue
 *
 * @param el - Element
 *
 * @returns Element size observable
 */
function watchElementSize(el) {
    // Compute target element - since inline elements cannot be observed by the
    // current `ResizeObserver` implementation as provided by browsers, we need
    // to determine the first containing parent element and use that one as a
    // target, while we always compute the actual size from the element.
    let target = el;
    while (target.clientWidth === 0)
        if (target.parentElement)
            target = target.parentElement;
        else
            break;
    // Observe target element and recompute element size on resize - as described
    // above, the target element is not necessarily the element of interest
    return observer$.pipe((0, rxjs_1.tap)(observer => observer.observe(target)), (0, rxjs_1.switchMap)(observer => entry$.pipe((0, rxjs_1.filter)(entry => entry.target === target), (0, rxjs_1.finalize)(() => observer.unobserve(target)))), (0, rxjs_1.map)(() => getElementSize(el)), (0, rxjs_1.startWith)(getElementSize(el)));
}
//# sourceMappingURL=index.js.map