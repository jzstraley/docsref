"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchViewportAt = watchViewportAt;
const rxjs_1 = require("rxjs");
const element_1 = require("../../element");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch viewport relative to element
 *
 * @param el - Element
 * @param options - Options
 *
 * @returns Viewport observable
 */
function watchViewportAt(el, { viewport$, header$ }) {
    const size$ = viewport$
        .pipe((0, rxjs_1.distinctUntilKeyChanged)("size"));
    /* Compute element offset */
    const offset$ = (0, rxjs_1.combineLatest)([size$, header$])
        .pipe((0, rxjs_1.map)(() => (0, element_1.getElementOffset)(el)));
    /* Compute relative viewport, return hot observable */
    return (0, rxjs_1.combineLatest)([header$, viewport$, offset$])
        .pipe((0, rxjs_1.map)(([{ height }, { offset, size }, { x, y }]) => ({
        offset: {
            x: offset.x - x,
            y: offset.y - y + height
        },
        size
    })));
}
//# sourceMappingURL=index.js.map