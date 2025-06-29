"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSearchQuery = transformSearchQuery;
exports.parseSearchQuery = parseSearchQuery;
exports.getSearchQueryTerms = getSearchQueryTerms;
const internal_1 = require("../../internal");
const transform_1 = require("../transform");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Transform search query
 *
 * This function lexes the given search query and applies the transformation
 * function to each term, preserving markup like `+` and `-` modifiers.
 *
 * @param query - Search query
 *
 * @returns Search query
 */
function transformSearchQuery(query) {
    /* Split query terms with tokenizer */
    return (0, transform_1.transform)(query, part => {
        const terms = [];
        /* Initialize lexer and analyze part */
        const lexer = new lunr.QueryLexer(part);
        lexer.run();
        /* Extract and tokenize term from lexeme */
        for (const { type, str: term, start, end } of lexer.lexemes)
            switch (type) {
                /* Hack: remove colon - see https://bit.ly/3wD3T3I */
                case "FIELD":
                    if (!["title", "text", "tags"].includes(term))
                        part = [
                            part.slice(0, end),
                            " ",
                            part.slice(end + 1)
                        ].join("");
                    break;
                /* Tokenize term */
                case "TERM":
                    (0, internal_1.split)(term, lunr.tokenizer.separator, (...range) => {
                        terms.push([
                            part.slice(0, start),
                            term.slice(...range),
                            part.slice(end)
                        ].join(""));
                    });
            }
        /* Return terms */
        return terms;
    });
}
/* ------------------------------------------------------------------------- */
/**
 * Parse a search query for analysis
 *
 * Lunr.js itself has a bug where it doesn't detect or remove wildcards for
 * query clauses, so we must do this here.
 *
 * @see https://bit.ly/3DpTGtz - GitHub issue
 *
 * @param value - Query value
 *
 * @returns Search query clauses
 */
function parseSearchQuery(value) {
    const query = new lunr.Query(["title", "text", "tags"]);
    const parser = new lunr.QueryParser(value, query);
    /* Parse Search query */
    parser.parse();
    for (const clause of query.clauses) {
        clause.usePipeline = true;
        /* Handle leading wildcard */
        if (clause.term.startsWith("*")) {
            clause.wildcard = lunr.Query.wildcard.LEADING;
            clause.term = clause.term.slice(1);
        }
        /* Handle trailing wildcard */
        if (clause.term.endsWith("*")) {
            clause.wildcard = lunr.Query.wildcard.TRAILING;
            clause.term = clause.term.slice(0, -1);
        }
    }
    /* Return query clauses */
    return query.clauses;
}
/**
 * Analyze the search query clauses in regard to the search terms found
 *
 * @param query - Search query clauses
 * @param terms - Search terms
 *
 * @returns Search query terms
 */
function getSearchQueryTerms(query, terms) {
    var _a;
    const clauses = new Set(query);
    /* Match query clauses against terms */
    const result = {};
    for (let t = 0; t < terms.length; t++)
        for (const clause of clauses)
            if (terms[t].startsWith(clause.term)) {
                result[clause.term] = true;
                clauses.delete(clause);
            }
    /* Annotate unmatched non-stopword query clauses */
    for (const clause of clauses)
        if ((_a = lunr.stopWordFilter) === null || _a === void 0 ? void 0 : _a.call(lunr, clause.term))
            result[clause.term] = false;
    /* Return query terms */
    return result;
}
//# sourceMappingURL=index.js.map