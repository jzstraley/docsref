"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchDetails = watchDetails;
exports.mountDetails = mountDetails;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch details
 *
 * @param el - Details element
 * @param options - Options
 *
 * @returns Details observable
 */
function watchDetails(el, { target$, print$ }) {
    let open = true;
    return (0, rxjs_1.merge)(
    /* Open and focus details on location target */
    target$
        .pipe((0, rxjs_1.map)(target => target.closest("details:not([open])")), (0, rxjs_1.filter)(details => el === details), (0, rxjs_1.map)(() => ({
        action: "open", reveal: true
    }))), 
    /* Open details on print and close afterwards */
    print$
        .pipe((0, rxjs_1.filter)(active => active || !open), (0, rxjs_1.tap)(() => open = el.open), (0, rxjs_1.map)(active => ({
        action: active ? "open" : "close"
    }))));
}
/**
 * Mount details
 *
 * This function ensures that `details` tags are opened on anchor jumps and
 * prior to printing, so the whole content of the page is visible.
 *
 * @param el - Details element
 * @param options - Options
 *
 * @returns Details component observable
 */
function mountDetails(el, options) {
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        push$.subscribe(({ action, reveal }) => {
            el.toggleAttribute("open", action === "open");
            if (reveal)
                el.scrollIntoView();
        });
        /* Create and return component */
        return watchDetails(el, options)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map