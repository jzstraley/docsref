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
exports.renderIconSearchResult = renderIconSearchResult;
const fuzzaldrin_plus_1 = require("fuzzaldrin-plus");
const _1 = require("~/_");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Highlight an icon search result
 *
 * @param icon - Icon
 * @param query - Search query
 *
 * @returns Highlighted result
 */
function highlight(icon, query) {
    return (0, fuzzaldrin_plus_1.wrap)(icon.shortcode, query, {
        wrap: {
            tagOpen: "<b>",
            tagClose: "</b>"
        }
    });
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render an icon search result
 *
 * @param icon - Icon
 * @param query - Search query
 * @param file - Render as file
 *
 * @returns Element
 */
function renderIconSearchResult(icon, query, file) {
    return ((0, utilities_1.h)("li", { class: "mdx-iconsearch-result__item" },
        (0, utilities_1.h)("span", { class: "twemoji" },
            (0, utilities_1.h)("img", { src: icon.url })),
        (0, utilities_1.h)("button", { class: "md-clipboard--inline", title: (0, _1.translation)("clipboard.copy"), "data-clipboard-text": file ? icon.shortcode : `:${icon.shortcode}:` },
            (0, utilities_1.h)("code", null, file
                ? highlight(icon, query)
                : `:${highlight(icon, query)}:`))));
}
//# sourceMappingURL=index.js.map