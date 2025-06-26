"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementOffset = getElementOffset;
exports.getElementOffsetAbsolute = getElementOffsetAbsolute;
exports.watchElementOffset = watchElementOffset;
exports.watchElementOffsetAbsolute = watchElementOffsetAbsolute;
const rxjs_1 = require("rxjs");
const size_1 = require("../../size");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve element offset
 *
 * @param el - Element
 *
 * @returns Element offset
 */
function getElementOffset(el) {
    return {
        x: el.offsetLeft,
        y: el.offsetTop
    };
}
/**
 * Retrieve absolute element offset
 *
 * @param el - Element
 *
 * @returns Element offset
 */
function getElementOffsetAbsolute(el) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.x + window.scrollX,
        y: rect.y + window.scrollY
    };
}
/* ------------------------------------------------------------------------- */
/**
 * Watch element offset
 *
 * @param el - Element
 *
 * @returns Element offset observable
 */
function watchElementOffset(el) {
    return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(window, "load"), (0, rxjs_1.fromEvent)(window, "resize"))
        .pipe((0, rxjs_1.auditTime)(0, rxjs_1.animationFrameScheduler), (0, rxjs_1.map)(() => getElementOffset(el)), (0, rxjs_1.startWith)(getElementOffset(el)));
}
/**
 * Watch absolute element offset
 *
 * @param el - Element
 *
 * @returns Element offset observable
 */
function watchElementOffsetAbsolute(el) {
    return (0, rxjs_1.merge)(watchElementOffset(el), (0, size_1.watchElementSize)(document.body) // @todo find a better way for this
    )
        .pipe((0, rxjs_1.map)(() => getElementOffsetAbsolute(el)), (0, rxjs_1.startWith)(getElementOffsetAbsolute(el)));
}
//# sourceMappingURL=index.js.map