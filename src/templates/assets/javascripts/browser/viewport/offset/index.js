"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewportOffset = getViewportOffset;
exports.watchViewportOffset = watchViewportOffset;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve viewport offset
 *
 * On iOS Safari, viewport offset can be negative due to overflow scrolling.
 * As this may induce strange behaviors downstream, we'll just limit it to 0.
 *
 * @returns Viewport offset
 */
function getViewportOffset() {
    return {
        x: Math.max(0, scrollX),
        y: Math.max(0, scrollY)
    };
}
/* ------------------------------------------------------------------------- */
/**
 * Watch viewport offset
 *
 * @returns Viewport offset observable
 */
function watchViewportOffset() {
    return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(window, "scroll", { passive: true }), (0, rxjs_1.fromEvent)(window, "resize", { passive: true }))
        .pipe((0, rxjs_1.map)(getViewportOffset), (0, rxjs_1.startWith)(getViewportOffset()));
}
//# sourceMappingURL=index.js.map