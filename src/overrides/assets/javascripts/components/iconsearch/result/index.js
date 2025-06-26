"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchIconSearchResult = watchIconSearchResult;
exports.mountIconSearchResult = mountIconSearchResult;
const fuzzaldrin_plus_1 = require("fuzzaldrin-plus");
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const utilities_1 = require("~/utilities");
const templates_1 = require("_/templates");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch icon search result
 *
 * @param el - Icon search result element
 * @param options - Options
 *
 * @returns Icon search result observable
 */
function watchIconSearchResult(el, { index$, query$, mode$ }) {
    switch (el.getAttribute("data-mdx-mode")) {
        case "file":
            return (0, rxjs_1.combineLatest)([
                query$.pipe((0, rxjs_1.distinctUntilKeyChanged)("value")),
                index$
                    .pipe((0, rxjs_1.map)(({ icons }) => Object.values(icons.data)
                    .map(icon => icon.replace(/\.svg$/, ""))))
            ])
                .pipe((0, rxjs_1.map)(([{ value }, data]) => (0, fuzzaldrin_plus_1.filter)(data, value)), (0, rxjs_1.switchMap)(files => index$.pipe((0, rxjs_1.map)(({ icons }) => ({
                data: files.map(shortcode => {
                    return {
                        shortcode,
                        url: [
                            icons.base,
                            shortcode,
                            ".svg"
                        ].join("")
                    };
                })
            })))));
        default:
            return (0, rxjs_1.combineLatest)([
                query$.pipe((0, rxjs_1.distinctUntilKeyChanged)("value")),
                index$
                    .pipe((0, rxjs_1.combineLatestWith)(mode$), (0, rxjs_1.map)(([{ icons, emojis }, mode]) => [
                    ...["all", "icons"].includes(mode)
                        ? Object.keys(icons.data)
                        : [],
                    ...["all", "emojis"].includes(mode)
                        ? Object.keys(emojis.data)
                        : []
                ]))
            ])
                .pipe((0, rxjs_1.map)(([{ value }, data]) => (0, fuzzaldrin_plus_1.filter)(data, value)), (0, rxjs_1.switchMap)(shortcodes => index$.pipe((0, rxjs_1.map)(({ icons, emojis }) => ({
                data: shortcodes.map(shortcode => {
                    const category = shortcode in icons.data
                        ? icons
                        : emojis;
                    return {
                        shortcode,
                        url: [
                            category.base,
                            category.data[shortcode]
                        ].join("")
                    };
                })
            })))));
    }
}
/**
 * Mount icon search result
 *
 * @param el - Icon search result element
 * @param options - Options
 *
 * @returns Icon search result component observable
 */
function mountIconSearchResult(el, { index$, query$, mode$ }) {
    const push$ = new rxjs_1.Subject();
    const boundary$ = (0, browser_1.watchElementBoundary)(el)
        .pipe((0, rxjs_1.filter)(Boolean));
    /* Update search result metadata */
    const meta = (0, browser_1.getElement)(".mdx-iconsearch-result__meta", el);
    push$
        .pipe((0, rxjs_1.withLatestFrom)(query$))
        .subscribe(([{ data }, { value }]) => {
        if (value) {
            switch (data.length) {
                /* No results */
                case 0:
                    meta.textContent = "No matches";
                    break;
                /* One result */
                case 1:
                    meta.textContent = "1 match";
                    break;
                /* Multiple result */
                default:
                    meta.textContent = `${(0, utilities_1.round)(data.length)} matches`;
            }
        }
        else {
            meta.textContent = "Type to start searching";
        }
    });
    /* Update icon search result list */
    const file = el.getAttribute("data-mdx-mode") === "file";
    const list = (0, browser_1.getElement)(":scope > :last-child", el);
    push$
        .pipe((0, rxjs_1.tap)(() => list.innerHTML = ""), (0, rxjs_1.switchMap)(({ data }) => (0, rxjs_1.merge)((0, rxjs_1.of)(...data.slice(0, 10)), (0, rxjs_1.of)(...data.slice(10))
        .pipe((0, rxjs_1.bufferCount)(10), (0, rxjs_1.zipWith)(boundary$), (0, rxjs_1.switchMap)(([chunk]) => chunk)))), (0, rxjs_1.withLatestFrom)(query$))
        .subscribe(([result, { value }]) => list.appendChild((0, templates_1.renderIconSearchResult)(result, value, file)));
    /* Create and return component */
    return watchIconSearchResult(el, { query$, index$, mode$ })
        .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
}
//# sourceMappingURL=index.js.map