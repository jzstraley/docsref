"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.patchEllipsis = patchEllipsis;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
const tooltip2_1 = require("~/components/tooltip2");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Patch ellipsis
 *
 * This function will fetch all elements that are shortened with ellipsis, and
 * filter those which are visible. Once they become visible, they stay in that
 * state, even though they may be hidden again. This optimization is necessary
 * to reduce pressure on the browser, with elements fading in and out of view.
 *
 * @param options - Options
 */
function patchEllipsis({ document$, viewport$ }) {
    document$
        .pipe((0, rxjs_1.switchMap)(() => (0, browser_1.getElements)(".md-ellipsis")), (0, rxjs_1.mergeMap)(el => (0, browser_1.watchElementVisibility)(el)
        .pipe((0, rxjs_1.takeUntil)(document$.pipe((0, rxjs_1.skip)(1))), (0, rxjs_1.filter)(visible => visible), (0, rxjs_1.map)(() => el), (0, rxjs_1.take)(1))), (0, rxjs_1.filter)(el => el.offsetWidth < el.scrollWidth), (0, rxjs_1.mergeMap)(el => {
        const text = el.innerText;
        const host = el.closest("a") || el;
        host.title = text;
        // Do not mount improved tooltip if feature is disabled
        if (!(0, _1.feature)("content.tooltips"))
            return rxjs_1.EMPTY;
        /* Mount tooltip */
        return (0, tooltip2_1.mountInlineTooltip2)(host, { viewport$ })
            .pipe((0, rxjs_1.takeUntil)(document$.pipe((0, rxjs_1.skip)(1))), (0, rxjs_1.finalize)(() => host.removeAttribute("title")));
    }))
        .subscribe();
    // @todo move this outside of here and fix memleaks
    if ((0, _1.feature)("content.tooltips"))
        document$
            .pipe((0, rxjs_1.switchMap)(() => (0, browser_1.getElements)(".md-status")), (0, rxjs_1.mergeMap)(el => (0, tooltip2_1.mountInlineTooltip2)(el, { viewport$ })))
            .subscribe();
}
//# sourceMappingURL=index.js.map