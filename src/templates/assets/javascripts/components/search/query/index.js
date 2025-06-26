"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchSearchQuery = watchSearchQuery;
exports.mountSearchQuery = mountSearchQuery;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const integrations_1 = require("~/integrations");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch search query
 *
 * Note that the focus event which triggers re-reading the current query value
 * is delayed by `1ms` so the input's empty state is allowed to propagate.
 *
 * @param el - Search query element
 * @param options - Options
 *
 * @returns Search query observable
 */
function watchSearchQuery(el, { worker$ }) {
    /* Support search deep linking */
    const { searchParams } = (0, browser_1.getLocation)();
    if (searchParams.has("q")) {
        (0, browser_1.setToggle)("search", true);
        /* Set query from parameter */
        el.value = searchParams.get("q");
        el.focus();
        /* Remove query parameter on close */
        (0, browser_1.watchToggle)("search")
            .pipe((0, rxjs_1.first)(active => !active))
            .subscribe(() => {
            const url = (0, browser_1.getLocation)();
            url.searchParams.delete("q");
            history.replaceState({}, "", `${url}`);
        });
    }
    /* Intercept focus and input events */
    const focus$ = (0, browser_1.watchElementFocus)(el);
    const value$ = (0, rxjs_1.merge)(worker$.pipe((0, rxjs_1.first)(integrations_1.isSearchReadyMessage)), (0, rxjs_1.fromEvent)(el, "keyup"), focus$)
        .pipe((0, rxjs_1.map)(() => el.value), (0, rxjs_1.distinctUntilChanged)());
    /* Combine into single observable */
    return (0, rxjs_1.combineLatest)([value$, focus$])
        .pipe((0, rxjs_1.map)(([value, focus]) => ({ value, focus })), (0, rxjs_1.shareReplay)(1));
}
/**
 * Mount search query
 *
 * @param el - Search query element
 * @param options - Options
 *
 * @returns Search query component observable
 */
function mountSearchQuery(el, { worker$ }) {
    const push$ = new rxjs_1.Subject();
    const done$ = push$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(true));
    /* Handle value change */
    (0, rxjs_1.combineLatest)([
        worker$.pipe((0, rxjs_1.first)(integrations_1.isSearchReadyMessage)),
        push$
    ], (_, query) => query)
        .pipe((0, rxjs_1.distinctUntilKeyChanged)("value"))
        .subscribe(({ value }) => worker$.next({
        type: 2 /* SearchMessageType.QUERY */,
        data: value
    }));
    /* Handle focus change */
    push$
        .pipe((0, rxjs_1.distinctUntilKeyChanged)("focus"))
        .subscribe(({ focus }) => {
        if (focus)
            (0, browser_1.setToggle)("search", focus);
    });
    /* Handle reset */
    (0, rxjs_1.fromEvent)(el.form, "reset")
        .pipe((0, rxjs_1.takeUntil)(done$))
        .subscribe(() => el.focus());
    // Focus search query on label click - note that this is necessary to bring
    // up the keyboard on iOS and other mobile platforms, as the search dialog is
    // not visible at first, and programatically focusing an input element must
    // be triggered by a user interaction - see https://t.ly/Cb30n
    const label = (0, browser_1.getElement)("header [for=__search]");
    (0, rxjs_1.fromEvent)(label, "click")
        .subscribe(() => el.focus());
    /* Create and return component */
    return watchSearchQuery(el, { worker$ })
        .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })), (0, rxjs_1.shareReplay)(1));
}
//# sourceMappingURL=index.js.map