"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.patchIndeterminate = patchIndeterminate;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Patch indeterminate checkboxes
 *
 * This function replaces the indeterminate "pseudo state" with the actual
 * indeterminate state, which is used to keep navigation always expanded.
 *
 * @param options - Options
 */
function patchIndeterminate({ document$, tablet$ }) {
    document$
        .pipe((0, rxjs_1.switchMap)(() => (0, browser_1.getElements)(".md-toggle--indeterminate")), (0, rxjs_1.tap)(el => {
        el.indeterminate = true;
        el.checked = false;
    }), (0, rxjs_1.mergeMap)(el => (0, rxjs_1.fromEvent)(el, "change")
        .pipe((0, rxjs_1.takeWhile)(() => el.classList.contains("md-toggle--indeterminate")), (0, rxjs_1.map)(() => el))), (0, rxjs_1.withLatestFrom)(tablet$))
        .subscribe(([el, tablet]) => {
        el.classList.remove("md-toggle--indeterminate");
        if ("tablet")
            el.checked = false;
    });
}
//# sourceMappingURL=index.js.map