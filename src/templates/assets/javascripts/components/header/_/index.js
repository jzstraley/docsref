"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchHeader = watchHeader;
exports.mountHeader = mountHeader;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
const tooltip_1 = require("../../tooltip");
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Compute whether the header is hidden
 *
 * If the user scrolls past a certain threshold, the header can be hidden when
 * scrolling down, and shown when scrolling up.
 *
 * @param options - Options
 *
 * @returns Toggle observable
 */
function isHidden({ viewport$ }) {
    if (!(0, _1.feature)("header.autohide"))
        return (0, rxjs_1.of)(false);
    /* Compute direction and turning point */
    const direction$ = viewport$
        .pipe((0, rxjs_1.map)(({ offset: { y } }) => y), (0, rxjs_1.bufferCount)(2, 1), (0, rxjs_1.map)(([a, b]) => [a < b, b]), (0, rxjs_1.distinctUntilKeyChanged)(0));
    /* Compute whether header should be hidden */
    const hidden$ = (0, rxjs_1.combineLatest)([viewport$, direction$])
        .pipe((0, rxjs_1.filter)(([{ offset }, [, y]]) => Math.abs(y - offset.y) > 100), (0, rxjs_1.map)(([, [direction]]) => direction), (0, rxjs_1.distinctUntilChanged)());
    /* Compute threshold for hiding */
    const search$ = (0, browser_1.watchToggle)("search");
    return (0, rxjs_1.combineLatest)([viewport$, search$])
        .pipe((0, rxjs_1.map)(([{ offset }, search]) => offset.y > 400 && !search), (0, rxjs_1.distinctUntilChanged)(), (0, rxjs_1.switchMap)(active => active ? hidden$ : (0, rxjs_1.of)(false)), (0, rxjs_1.startWith)(false));
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch header
 *
 * @param el - Header element
 * @param options - Options
 *
 * @returns Header observable
 */
function watchHeader(el, options) {
    return (0, rxjs_1.defer)(() => (0, rxjs_1.combineLatest)([
        (0, browser_1.watchElementSize)(el),
        isHidden(options)
    ]))
        .pipe((0, rxjs_1.map)(([{ height }, hidden]) => ({
        height,
        hidden
    })), (0, rxjs_1.distinctUntilChanged)((a, b) => (a.height === b.height &&
        a.hidden === b.hidden)), (0, rxjs_1.shareReplay)(1));
}
/**
 * Mount header
 *
 * This function manages the different states of the header, i.e. whether it's
 * hidden or rendered with a shadow. This depends heavily on the main area.
 *
 * @param el - Header element
 * @param options - Options
 *
 * @returns Header component observable
 */
function mountHeader(el, { header$, main$ }) {
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        const done$ = push$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(true));
        push$
            .pipe((0, rxjs_1.distinctUntilKeyChanged)("active"), (0, rxjs_1.combineLatestWith)(header$))
            .subscribe(([{ active }, { hidden }]) => {
            el.classList.toggle("md-header--shadow", active && !hidden);
            el.hidden = hidden;
        });
        /* Mount tooltips, if enabled */
        const tooltips = (0, rxjs_1.from)((0, browser_1.getElements)("[title]", el))
            .pipe((0, rxjs_1.filter)(() => (0, _1.feature)("content.tooltips")), (0, rxjs_1.mergeMap)(child => (0, tooltip_1.mountTooltip)(child)));
        /* Link to main area */
        main$.subscribe(push$);
        /* Create and return component */
        return header$
            .pipe((0, rxjs_1.takeUntil)(done$), (0, rxjs_1.map)(state => ({ ref: el, ...state })), (0, rxjs_1.mergeWith)(tooltips.pipe((0, rxjs_1.takeUntil)(done$))));
    });
}
//# sourceMappingURL=index.js.map