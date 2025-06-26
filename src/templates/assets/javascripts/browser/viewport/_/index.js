"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchViewport = watchViewport;
const rxjs_1 = require("rxjs");
const offset_1 = require("../offset");
const size_1 = require("../size");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch viewport
 *
 * @returns Viewport observable
 */
function watchViewport() {
    return (0, rxjs_1.combineLatest)([
        (0, offset_1.watchViewportOffset)(),
        (0, size_1.watchViewportSize)()
    ])
        .pipe((0, rxjs_1.map)(([offset, size]) => ({ offset, size })), (0, rxjs_1.shareReplay)(1));
}
//# sourceMappingURL=index.js.map