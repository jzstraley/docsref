"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSearchHighlighter = setupSearchHighlighter;
const escape_html_1 = __importDefault(require("escape-html"));
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Create a search highlighter
 *
 * @param config - Search configuration
 *
 * @returns Search highlight factory function
 */
function setupSearchHighlighter(config) {
    // Hack: temporarily remove pure lookaheads and lookbehinds
    const regex = config.separator.split("|").map(term => {
        const temp = term.replace(/(\(\?[!=<][^)]+\))/g, "");
        return temp.length === 0 ? "�" : term;
    })
        .join("|");
    const separator = new RegExp(regex, "img");
    const highlight = (_, data, term) => {
        return `${data}<mark data-md-highlight>${term}</mark>`;
    };
    /* Return factory function */
    return (query) => {
        query = query
            .replace(/[\s*+\-:~^]+/g, " ")
            .trim();
        /* Create search term match expression */
        const match = new RegExp(`(^|${config.separator}|)(${query
            .replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&")
            .replace(separator, "|")})`, "img");
        /* Highlight string value */
        return value => (0, escape_html_1.default)(value)
            .replace(match, highlight)
            .replace(/<\/mark>(\s+)<mark[^>]*>/img, "$1");
    };
}
//# sourceMappingURL=index.js.map