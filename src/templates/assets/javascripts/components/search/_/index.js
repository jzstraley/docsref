"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountSearch = mountSearch;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
const integrations_1 = require("~/integrations");
const _2 = require("../../_");
const query_1 = require("../query");
const result_1 = require("../result");
const share_1 = require("../share");
const suggest_1 = require("../suggest");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount search
 *
 * This function sets up the search functionality, including the underlying
 * web worker and all keyboard bindings.
 *
 * @param el - Search element
 * @param options - Options
 *
 * @returns Search component observable
 */
function mountSearch(el, { index$, keyboard$ }) {
    const config = (0, _1.configuration)();
    try {
        const worker$ = (0, integrations_1.setupSearchWorker)(config.search, index$);
        /* Retrieve query and result components */
        const query = (0, _2.getComponentElement)("search-query", el);
        const result = (0, _2.getComponentElement)("search-result", el);
        /* Always close search on result selection */
        (0, rxjs_1.fromEvent)(el, "click")
            .pipe((0, rxjs_1.filter)(({ target }) => (target instanceof Element && !!target.closest("a"))))
            .subscribe(() => (0, browser_1.setToggle)("search", false));
        /* Set up search keyboard handlers */
        keyboard$
            .pipe((0, rxjs_1.filter)(({ mode }) => mode === "search"))
            .subscribe(key => {
            const active = (0, browser_1.getActiveElement)();
            switch (key.type) {
                /* Enter: go to first (best) result */
                case "Enter":
                    if (active === query) {
                        const anchors = new Map();
                        for (const anchor of (0, browser_1.getElements)(":first-child [href]", result)) {
                            const article = anchor.firstElementChild;
                            anchors.set(anchor, parseFloat(article.getAttribute("data-md-score")));
                        }
                        /* Go to result with highest score, if any */
                        if (anchors.size) {
                            const [[best]] = [...anchors].sort(([, a], [, b]) => b - a);
                            best.click();
                        }
                        /* Otherwise omit form submission */
                        key.claim();
                    }
                    break;
                /* Escape or Tab: close search */
                case "Escape":
                case "Tab":
                    (0, browser_1.setToggle)("search", false);
                    query.blur();
                    break;
                /* Vertical arrows: select previous or next search result */
                case "ArrowUp":
                case "ArrowDown":
                    if (typeof active === "undefined") {
                        query.focus();
                    }
                    else {
                        const els = [query, ...(0, browser_1.getElements)(":not(details) > [href], summary, details[open] [href]", result)];
                        const i = Math.max(0, (Math.max(0, els.indexOf(active)) + els.length + (key.type === "ArrowUp" ? -1 : +1)) % els.length);
                        els[i].focus();
                    }
                    /* Prevent scrolling of page */
                    key.claim();
                    break;
                /* All other keys: hand to search query */
                default:
                    if (query !== (0, browser_1.getActiveElement)())
                        query.focus();
            }
        });
        /* Set up global keyboard handlers */
        keyboard$
            .pipe((0, rxjs_1.filter)(({ mode }) => mode === "global"))
            .subscribe(key => {
            switch (key.type) {
                /* Open search and select query */
                case "f":
                case "s":
                case "/":
                    query.focus();
                    query.select();
                    /* Prevent scrolling of page */
                    key.claim();
                    break;
            }
        });
        /* Create and return component */
        const query$ = (0, query_1.mountSearchQuery)(query, { worker$ });
        return (0, rxjs_1.merge)(query$, (0, result_1.mountSearchResult)(result, { worker$, query$ }))
            .pipe((0, rxjs_1.mergeWith)(
        /* Search sharing */
        ...(0, _2.getComponentElements)("search-share", el)
            .map(child => (0, share_1.mountSearchShare)(child, { query$ })), 
        /* Search suggestions */
        ...(0, _2.getComponentElements)("search-suggest", el)
            .map(child => (0, suggest_1.mountSearchSuggest)(child, { worker$, keyboard$ }))));
        /* Gracefully handle broken search */
    }
    catch (err) {
        el.hidden = true;
        return rxjs_1.NEVER;
    }
}
//# sourceMappingURL=index.js.map