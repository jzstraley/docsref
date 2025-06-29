"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchSearchShare = watchSearchShare;
exports.mountSearchShare = mountSearchShare;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount search sharing
 *
 * @param _el - Search sharing element
 * @param options - Options
 *
 * @returns Search sharing observable
 */
function watchSearchShare(_el, { query$ }) {
    return query$
        .pipe((0, rxjs_1.map)(({ value }) => {
        const url = (0, browser_1.getLocation)();
        url.hash = "";
        /* Compute readable query strings */
        value = value
            .replace(/\s+/g, "+") /* Collapse whitespace */
            .replace(/&/g, "%26") /* Escape '&' character */
            .replace(/=/g, "%3D"); /* Escape '=' character */
        /* Replace query string */
        url.search = `q=${value}`;
        return { url };
    }));
}
/**
 * Mount search sharing
 *
 * @param el - Search sharing element
 * @param options - Options
 *
 * @returns Search sharing component observable
 */
function mountSearchShare(el, options) {
    const push$ = new rxjs_1.Subject();
    const done$ = push$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(true));
    push$.subscribe(({ url }) => {
        el.setAttribute("data-clipboard-text", el.href);
        el.href = `${url}`;
    });
    /* Prevent following of link */
    (0, rxjs_1.fromEvent)(el, "click")
        .pipe((0, rxjs_1.takeUntil)(done$))
        .subscribe(ev => ev.preventDefault());
    /* Create and return component */
    return watchSearchShare(el, options)
        .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
}
//# sourceMappingURL=index.js.map