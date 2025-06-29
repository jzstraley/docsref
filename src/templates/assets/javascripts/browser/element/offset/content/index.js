"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementContentOffset = getElementContentOffset;
exports.watchElementContentOffset = watchElementContentOffset;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve element content offset (= scroll offset)
 *
 * @param el - Element
 *
 * @returns Element content offset
 */
function getElementContentOffset(el) {
    return {
        x: el.scrollLeft,
        y: el.scrollTop
    };
}
/* ------------------------------------------------------------------------- */
/**
 * Watch element content offset
 *
 * @param el - Element
 *
 * @returns Element content offset observable
 */
function watchElementContentOffset(el) {
    return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(el, "scroll"), (0, rxjs_1.fromEvent)(window, "scroll"), (0, rxjs_1.fromEvent)(window, "resize"))
        .pipe((0, rxjs_1.auditTime)(0, rxjs_1.animationFrameScheduler), (0, rxjs_1.map)(() => getElementContentOffset(el)), (0, rxjs_1.startWith)(getElementContentOffset(el)));
}
//# sourceMappingURL=index.js.map