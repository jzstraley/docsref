"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.mountIconSearchQuery = mountIconSearchQuery;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount icon search query
 *
 * @param el - Icon search query element
 *
 * @returns Icon search query component observable
 */
function mountIconSearchQuery(el) {
    /* Intercept focus and input events */
    const focus$ = (0, browser_1.watchElementFocus)(el);
    const value$ = (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(el, "keyup"), (0, rxjs_1.fromEvent)(el, "focus").pipe((0, rxjs_1.delay)(1)))
        .pipe((0, rxjs_1.map)(() => el.value), (0, rxjs_1.startWith)(el.value), (0, rxjs_1.distinctUntilChanged)());
    /* Log search on blur */
    focus$
        .pipe((0, rxjs_1.filter)(active => !active), (0, rxjs_1.withLatestFrom)(value$))
        .subscribe(([, value]) => {
        const path = document.location.pathname;
        if (typeof ga === "function" && value.length)
            ga("send", "pageview", `${path}?q=[icon]+${value}`);
    });
    /* Combine into single observable */
    return (0, rxjs_1.combineLatest)([value$, focus$])
        .pipe((0, rxjs_1.map)(([value, focus]) => ({ ref: el, value, focus })));
}
//# sourceMappingURL=index.js.map