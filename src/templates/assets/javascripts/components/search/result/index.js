"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.mountSearchResult = mountSearchResult;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
const integrations_1 = require("~/integrations");
const templates_1 = require("~/templates");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount search result list
 *
 * This function performs a lazy rendering of the search results, depending on
 * the vertical offset of the search result container.
 *
 * @param el - Search result list element
 * @param options - Options
 *
 * @returns Search result list component observable
 */
function mountSearchResult(el, { worker$, query$ }) {
    const push$ = new rxjs_1.Subject();
    const boundary$ = (0, browser_1.watchElementBoundary)(el.parentElement)
        .pipe((0, rxjs_1.filter)(Boolean));
    /* Retrieve container */
    const container = el.parentElement;
    /* Retrieve nested components */
    const meta = (0, browser_1.getElement)(":scope > :first-child", el);
    const list = (0, browser_1.getElement)(":scope > :last-child", el);
    /* Reveal to accessibility tree – see https://bit.ly/3iAA7t8 */
    (0, browser_1.watchToggle)("search")
        .subscribe(active => list.setAttribute("role", active ? "list" : "presentation"));
    /* Update search result metadata */
    push$
        .pipe((0, rxjs_1.withLatestFrom)(query$), (0, rxjs_1.skipUntil)(worker$.pipe((0, rxjs_1.first)(integrations_1.isSearchReadyMessage))))
        .subscribe(([{ items }, { value }]) => {
        switch (items.length) {
            /* No results */
            case 0:
                meta.textContent = value.length
                    ? (0, _1.translation)("search.result.none")
                    : (0, _1.translation)("search.result.placeholder");
                break;
            /* One result */
            case 1:
                meta.textContent = (0, _1.translation)("search.result.one");
                break;
            /* Multiple result */
            default:
                const count = (0, utilities_1.round)(items.length);
                meta.textContent = (0, _1.translation)("search.result.other", count);
        }
    });
    /* Render search result item */
    const render$ = push$
        .pipe((0, rxjs_1.tap)(() => list.innerHTML = ""), (0, rxjs_1.switchMap)(({ items }) => (0, rxjs_1.merge)((0, rxjs_1.of)(...items.slice(0, 10)), (0, rxjs_1.of)(...items.slice(10))
        .pipe((0, rxjs_1.bufferCount)(4), (0, rxjs_1.zipWith)(boundary$), (0, rxjs_1.switchMap)(([chunk]) => chunk)))), (0, rxjs_1.map)(templates_1.renderSearchResultItem), (0, rxjs_1.share)());
    /* Update search result list */
    render$.subscribe(item => list.appendChild(item));
    render$
        .pipe((0, rxjs_1.mergeMap)(item => {
        const details = (0, browser_1.getOptionalElement)("details", item);
        if (typeof details === "undefined")
            return rxjs_1.EMPTY;
        /* Keep position of details element stable */
        return (0, rxjs_1.fromEvent)(details, "toggle")
            .pipe((0, rxjs_1.takeUntil)(push$), (0, rxjs_1.map)(() => details));
    }))
        .subscribe(details => {
        if (details.open === false &&
            details.offsetTop <= container.scrollTop)
            container.scrollTo({ top: details.offsetTop });
    });
    /* Filter search result message */
    const result$ = worker$
        .pipe((0, rxjs_1.filter)(integrations_1.isSearchResultMessage), (0, rxjs_1.map)(({ data }) => data));
    /* Create and return component */
    return result$
        .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
}
//# sourceMappingURL=index.js.map