"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewportSize = getViewportSize;
exports.watchViewportSize = watchViewportSize;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve viewport size
 *
 * @returns Viewport size
 */
function getViewportSize() {
    return {
        width: innerWidth,
        height: innerHeight
    };
}
/* ------------------------------------------------------------------------- */
/**
 * Watch viewport size
 *
 * @returns Viewport size observable
 */
function watchViewportSize() {
    return (0, rxjs_1.fromEvent)(window, "resize", { passive: true })
        .pipe((0, rxjs_1.map)(getViewportSize), (0, rxjs_1.startWith)(getViewportSize()));
}
//# sourceMappingURL=index.js.map