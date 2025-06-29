"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSearchResultItem = renderSearchResultItem;
const escape_html_1 = __importDefault(require("escape-html"));
const _1 = require("~/_");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Helper function
 * ------------------------------------------------------------------------- */
/**
 * Render a search document
 *
 * @param document - Search document
 * @param flag - Render flags
 *
 * @returns Element
 */
function renderSearchDocument(document, flag) {
    const parent = flag & 2 /* Flag.PARENT */;
    const teaser = flag & 1 /* Flag.TEASER */;
    /* Render missing query terms */
    const missing = Object.keys(document.terms)
        .filter(key => !document.terms[key])
        .reduce((list, key) => [
        ...list,
        (0, utilities_1.h)("del", null, (0, escape_html_1.default)(key)),
        " "
    ], [])
        .slice(0, -1);
    /* Assemble query string for highlighting */
    const config = (0, _1.configuration)();
    const url = new URL(document.location, config.base);
    if ((0, _1.feature)("search.highlight"))
        url.searchParams.set("h", Object.entries(document.terms)
            .filter(([, match]) => match)
            .reduce((highlight, [value]) => `${highlight} ${value}`.trim(), ""));
    /* Render article or section, depending on flags */
    const { tags } = (0, _1.configuration)();
    return ((0, utilities_1.h)("a", { href: `${url}`, class: "md-search-result__link", tabIndex: -1 },
        (0, utilities_1.h)("article", { class: "md-search-result__article md-typeset", "data-md-score": document.score.toFixed(2) },
            parent > 0 && (0, utilities_1.h)("div", { class: "md-search-result__icon md-icon" }),
            parent > 0 && (0, utilities_1.h)("h1", null, document.title),
            parent <= 0 && (0, utilities_1.h)("h2", null, document.title),
            teaser > 0 && document.text.length > 0 &&
                document.text,
            document.tags && ((0, utilities_1.h)("nav", { class: "md-tags" }, document.tags.map(tag => {
                const type = tags
                    ? tag in tags
                        ? `md-tag-icon md-tag--${tags[tag]}`
                        : "md-tag-icon"
                    : "";
                return ((0, utilities_1.h)("span", { class: `md-tag ${type}` }, tag));
            }))),
            teaser > 0 && missing.length > 0 &&
                (0, utilities_1.h)("p", { class: "md-search-result__terms" },
                    (0, _1.translation)("search.result.term.missing"),
                    ": ",
                    ...missing))));
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render a search result
 *
 * @param result - Search result
 *
 * @returns Element
 */
function renderSearchResultItem(result) {
    const threshold = result[0].score;
    const docs = [...result];
    const config = (0, _1.configuration)();
    /* Find and extract parent article */
    const parent = docs.findIndex(doc => {
        const l = `${new URL(doc.location, config.base)}`; // @todo hacky
        return !l.includes("#");
    });
    const [article] = docs.splice(parent, 1);
    /* Determine last index above threshold */
    let index = docs.findIndex(doc => doc.score < threshold);
    if (index === -1)
        index = docs.length;
    /* Partition sections */
    const best = docs.slice(0, index);
    const more = docs.slice(index);
    /* Render children */
    const children = [
        renderSearchDocument(article, 2 /* Flag.PARENT */ | +(!parent && index === 0)),
        ...best.map(section => renderSearchDocument(section, 1 /* Flag.TEASER */)),
        ...more.length ? [
            (0, utilities_1.h)("details", { class: "md-search-result__more" },
                (0, utilities_1.h)("summary", { tabIndex: -1 },
                    (0, utilities_1.h)("div", null, more.length > 0 && more.length === 1
                        ? (0, _1.translation)("search.result.more.one")
                        : (0, _1.translation)("search.result.more.other", more.length))),
                ...more.map(section => renderSearchDocument(section, 1 /* Flag.TEASER */)))
        ] : []
    ];
    /* Render search result */
    return ((0, utilities_1.h)("li", { class: "md-search-result__item" }, children));
}
//# sourceMappingURL=index.js.map