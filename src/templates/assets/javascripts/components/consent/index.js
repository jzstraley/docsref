"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchConsent = watchConsent;
exports.mountConsent = mountConsent;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch consent
 *
 * @param el - Consent element
 * @param options - Options
 *
 * @returns Consent observable
 */
function watchConsent(el, { target$ }) {
    return target$
        .pipe((0, rxjs_1.map)(target => ({ hidden: target !== el })));
}
/* ------------------------------------------------------------------------- */
/**
 * Mount consent
 *
 * @param el - Consent element
 * @param options - Options
 *
 * @returns Consent component observable
 */
function mountConsent(el, options) {
    const internal$ = new rxjs_1.Subject();
    internal$.subscribe(({ hidden }) => {
        el.hidden = hidden;
    });
    /* Create and return component */
    return watchConsent(el, options)
        .pipe((0, rxjs_1.tap)(state => internal$.next(state)), (0, rxjs_1.finalize)(() => internal$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
}
//# sourceMappingURL=index.js.map