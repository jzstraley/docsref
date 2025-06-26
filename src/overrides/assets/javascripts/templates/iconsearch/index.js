"use strict";

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