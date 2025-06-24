"use strict";
/*
 * Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
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