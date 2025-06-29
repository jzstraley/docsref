"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountIconSearch = mountIconSearch;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
const _2 = require("../../_");
const query_1 = require("../query");
const result_1 = require("../result");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount icon search
 *
 * @param el - Icon search element
 *
 * @returns Icon search component observable
 */
function mountIconSearch(el) {
    const config = (0, _1.configuration)();
    const index$ = (0, browser_1.requestJSON)(new URL("assets/javascripts/iconsearch_index.json", config.base));
    /* Retrieve query and result components */
    const query = (0, _2.getComponentElement)("iconsearch-query", el);
    const result = (0, _2.getComponentElement)("iconsearch-result", el);
    /* Retrieve select component */
    const mode$ = new rxjs_1.BehaviorSubject("all");
    const selects = (0, _2.getComponentElements)("iconsearch-select", el);
    for (const select of selects) {
        (0, rxjs_1.fromEvent)(select, "change").pipe((0, rxjs_1.map)(ev => ev.target.value))
            .subscribe(mode$);
    }
    /* Create and return component */
    const query$ = (0, query_1.mountIconSearchQuery)(query);
    const result$ = (0, result_1.mountIconSearchResult)(result, { index$, query$, mode$ });
    return (0, rxjs_1.merge)(query$, result$);
}
//# sourceMappingURL=index.js.map