"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchMain = watchMain;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch main area
 *
 * This function returns an observable that computes the visual parameters of
 * the main area which depends on the viewport vertical offset and height, as
 * well as the height of the header element, if the header is fixed.
 *
 * @param el - Main area element
 * @param options - Options
 *
 * @returns Main area observable
 */
function watchMain(el, { viewport$, header$ }) {
    /* Compute necessary adjustment for header */
    const adjust$ = header$
        .pipe((0, rxjs_1.map)(({ height }) => height), (0, rxjs_1.distinctUntilChanged)());
    /* Compute the main area's top and bottom borders */
    const border$ = adjust$
        .pipe((0, rxjs_1.switchMap)(() => (0, browser_1.watchElementSize)(el)
        .pipe((0, rxjs_1.map)(({ height }) => ({
        top: el.offsetTop,
        bottom: el.offsetTop + height
    })), (0, rxjs_1.distinctUntilKeyChanged)("bottom"))));
    /* Compute the main area's offset, visible height and if we scrolled past */
    return (0, rxjs_1.combineLatest)([adjust$, border$, viewport$])
        .pipe((0, rxjs_1.map)(([header, { top, bottom }, { offset: { y }, size: { height } }]) => {
        height = Math.max(0, height
            - Math.max(0, top - y, header)
            - Math.max(0, height + y - bottom));
        return {
            offset: top - header,
            height,
            active: top - header <= y
        };
    }), (0, rxjs_1.distinctUntilChanged)((a, b) => (a.offset === b.offset &&
        a.height === b.height &&
        a.active === b.active)));
}
//# sourceMappingURL=index.js.map