"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchScrollfix = patchScrollfix;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Check whether the given device is an Apple device
 *
 * @returns Test result
 */
function isAppleDevice() {
    return /(iPad|iPhone|iPod)/.test(navigator.userAgent);
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Patch all elements with `data-md-scrollfix` attributes
 *
 * This is a year-old patch which ensures that overflow scrolling works at the
 * top and bottom of containers on iOS by ensuring a `1px` scroll offset upon
 * the start of a touch event.
 *
 * @see https://bit.ly/2SCtAOO - Original source
 *
 * @param options - Options
 */
function patchScrollfix({ document$ }) {
    document$
        .pipe((0, rxjs_1.switchMap)(() => (0, browser_1.getElements)("[data-md-scrollfix]")), (0, rxjs_1.tap)(el => el.removeAttribute("data-md-scrollfix")), (0, rxjs_1.filter)(isAppleDevice), (0, rxjs_1.mergeMap)(el => (0, rxjs_1.fromEvent)(el, "touchstart")
        .pipe((0, rxjs_1.map)(() => el))))
        .subscribe(el => {
        const top = el.scrollTop;
        /* We're at the top of the container */
        if (top === 0) {
            el.scrollTop = 1;
            /* We're at the bottom of the container */
        }
        else if (top + el.offsetHeight === el.scrollHeight) {
            el.scrollTop = top - 1;
        }
    });
}
//# sourceMappingURL=index.js.map