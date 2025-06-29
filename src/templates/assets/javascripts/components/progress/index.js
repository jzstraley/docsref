"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountProgress = mountProgress;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount progress indicator
 *
 * @param el - Progress indicator element
 * @param options - Options
 *
 * @returns Progress indicator component observable
 */
function mountProgress(el, { progress$ }) {
    // Mount component on subscription
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        push$.subscribe(({ value }) => {
            el.style.setProperty("--md-progress-value", `${value}`);
        });
        // Create and return component
        return progress$
            .pipe((0, rxjs_1.tap)(value => push$.next({ value })), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(value => ({ ref: el, value })));
    });
}
//# sourceMappingURL=index.js.map