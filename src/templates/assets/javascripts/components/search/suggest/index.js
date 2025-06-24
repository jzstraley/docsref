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
exports.mountSearchSuggest = mountSearchSuggest;
const rxjs_1 = require("rxjs");
const integrations_1 = require("~/integrations");
const _1 = require("../../_");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount search suggestions
 *
 * This function will perform a lazy rendering of the search results, depending
 * on the vertical offset of the search result container.
 *
 * @param el - Search result list element
 * @param options - Options
 *
 * @returns Search result list component observable
 */
function mountSearchSuggest(el, { worker$, keyboard$ }) {
    const push$ = new rxjs_1.Subject();
    /* Retrieve query component and track all changes */
    const query = (0, _1.getComponentElement)("search-query");
    const query$ = (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(query, "keydown"), (0, rxjs_1.fromEvent)(query, "focus"))
        .pipe((0, rxjs_1.observeOn)(rxjs_1.asyncScheduler), (0, rxjs_1.map)(() => query.value), (0, rxjs_1.distinctUntilChanged)());
    /* Update search suggestions */
    push$
        .pipe((0, rxjs_1.combineLatestWith)(query$), (0, rxjs_1.map)(([{ suggest }, value]) => {
        const words = value.split(/([\s-]+)/);
        if ((suggest === null || suggest === void 0 ? void 0 : suggest.length) && words[words.length - 1]) {
            const last = suggest[suggest.length - 1];
            if (last.startsWith(words[words.length - 1]))
                words[words.length - 1] = last;
        }
        else {
            words.length = 0;
        }
        return words;
    }))
        .subscribe(words => el.innerHTML = words
        .join("")
        .replace(/\s/g, "&nbsp;"));
    /* Set up search keyboard handlers */
    keyboard$
        .pipe((0, rxjs_1.filter)(({ mode }) => mode === "search"))
        .subscribe(key => {
        switch (key.type) {
            /* Right arrow: accept current suggestion */
            case "ArrowRight":
                if (el.innerText.length &&
                    query.selectionStart === query.value.length)
                    query.value = el.innerText;
                break;
        }
    });
    /* Filter search result message */
    const result$ = worker$
        .pipe((0, rxjs_1.filter)(integrations_1.isSearchResultMessage), (0, rxjs_1.map)(({ data }) => data));
    /* Create and return component */
    return result$
        .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(() => ({ ref: el })));
}
//# sourceMappingURL=index.js.map