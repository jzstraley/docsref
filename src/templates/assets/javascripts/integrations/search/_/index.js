"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const config_1 = require("../config");
const internal_1 = require("../internal");
const query_1 = require("../query");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Create field extractor factory
 *
 * @param table - Position table map
 *
 * @returns Extractor factory
 */
function extractor(table) {
    return (name) => {
        return (doc) => {
            if (typeof doc[name] === "undefined")
                return undefined;
            /* Compute identifier and initialize table */
            const id = [doc.location, name].join(":");
            table.set(id, lunr.tokenizer.table = []);
            /* Return field value */
            return doc[name];
        };
    };
}
/**
 * Compute the difference of two lists of strings
 *
 * @param a - 1st list of strings
 * @param b - 2nd list of strings
 *
 * @returns Difference
 */
function difference(a, b) {
    const [x, y] = [new Set(a), new Set(b)];
    return [
        ...new Set([...x].filter(value => !y.has(value)))
    ];
}
/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */
/**
 * Search index
 */
class Search {
    /**
     * Create the search integration
     *
     * @param data - Search index
     */
    constructor({ config, docs, options }) {
        const field = extractor(this.table = new Map());
        /* Set up document map and options */
        this.map = (0, config_1.setupSearchDocumentMap)(docs);
        this.options = options;
        /* Set up document index */
        this.index = lunr(function () {
            this.metadataWhitelist = ["position"];
            this.b(0);
            /* Set up (multi-)language support */
            if (config.lang.length === 1 && config.lang[0] !== "en") {
                // @ts-expect-error - namespace indexing not supported
                this.use(lunr[config.lang[0]]);
            }
            else if (config.lang.length > 1) {
                this.use(lunr.multiLanguage(...config.lang));
            }
            /* Set up custom tokenizer (must be after language setup) */
            this.tokenizer = internal_1.tokenize;
            lunr.tokenizer.separator = new RegExp(config.separator);
            /* Set up custom segmenter, if loaded */
            lunr.segmenter = "TinySegmenter" in lunr
                ? new lunr.TinySegmenter()
                : undefined;
            /* Compute functions to be removed from the pipeline */
            const fns = difference([
                "trimmer", "stopWordFilter", "stemmer"
            ], config.pipeline);
            /* Remove functions from the pipeline for registered languages */
            for (const lang of config.lang.map(language => (
            // @ts-expect-error - namespace indexing not supported
            language === "en" ? lunr : lunr[language])))
                for (const fn of fns) {
                    this.pipeline.remove(lang[fn]);
                    this.searchPipeline.remove(lang[fn]);
                }
            /* Set up index reference */
            this.ref("location");
            /* Set up index fields */
            this.field("title", { boost: 1e3, extractor: field("title") });
            this.field("text", { boost: 1e0, extractor: field("text") });
            this.field("tags", { boost: 1e6, extractor: field("tags") });
            /* Add documents to index */
            for (const doc of docs)
                this.add(doc, { boost: doc.boost });
        });
    }
    /**
     * Search for matching documents
     *
     * @param query - Search query
     *
     * @returns Search result
     */
    search(query) {
        // Experimental Chinese segmentation
        query = query.replace(/\p{sc=Han}+/gu, value => {
            return [...(0, query_1.segment)(value, this.index.invertedIndex)]
                .join("* ");
        });
        // @todo: move segmenter (above) into transformSearchQuery
        query = (0, query_1.transformSearchQuery)(query);
        if (!query)
            return { items: [] };
        /* Parse query to extract clauses for analysis */
        const clauses = (0, query_1.parseSearchQuery)(query)
            .filter(clause => (clause.presence !== lunr.Query.presence.PROHIBITED));
        /* Perform search and post-process results */
        const groups = this.index.search(query)
            /* Apply post-query boosts based on title and search query terms */
            .reduce((item, { ref, score, matchData }) => {
            let doc = this.map.get(ref);
            if (typeof doc !== "undefined") {
                /* Shallow copy document */
                doc = { ...doc };
                if (doc.tags)
                    doc.tags = [...doc.tags];
                /* Compute and analyze search query terms */
                const terms = (0, query_1.getSearchQueryTerms)(clauses, Object.keys(matchData.metadata));
                /* Highlight matches in fields */
                for (const field of this.index.fields) {
                    if (typeof doc[field] === "undefined")
                        continue;
                    /* Collect positions from matches */
                    const positions = [];
                    for (const match of Object.values(matchData.metadata))
                        if (typeof match[field] !== "undefined")
                            positions.push(...match[field].position);
                    /* Skip highlighting, if no positions were collected */
                    if (!positions.length)
                        continue;
                    /* Load table and determine highlighting method */
                    const table = this.table.get([doc.location, field].join(":"));
                    const fn = Array.isArray(doc[field])
                        ? internal_1.highlightAll
                        : internal_1.highlight;
                    // @ts-expect-error - stop moaning, TypeScript!
                    doc[field] = fn(doc[field], table, positions, field !== "text");
                }
                /* Highlight title and text and apply post-query boosts */
                const boost = +!doc.parent +
                    Object.values(terms)
                        .filter(t => t).length /
                        Object.keys(terms).length;
                /* Append item */
                item.push({
                    ...doc,
                    score: score * (1 + boost ** 2),
                    terms
                });
            }
            return item;
        }, [])
            /* Sort search results again after applying boosts */
            .sort((a, b) => b.score - a.score)
            /* Group search results by article */
            .reduce((items, result) => {
            const doc = this.map.get(result.location);
            if (typeof doc !== "undefined") {
                const ref = doc.parent
                    ? doc.parent.location
                    : doc.location;
                items.set(ref, [...items.get(ref) || [], result]);
            }
            return items;
        }, new Map());
        /* Ensure that every item set has an article */
        for (const [ref, items] of groups)
            if (!items.find(item => item.location === ref)) {
                const doc = this.map.get(ref);
                items.push({ ...doc, score: 0, terms: {} });
            }
        /* Generate search suggestions, if desired */
        let suggest;
        if (this.options.suggest) {
            const titles = this.index.query(builder => {
                for (const clause of clauses)
                    builder.term(clause.term, {
                        fields: ["title"],
                        presence: lunr.Query.presence.REQUIRED,
                        wildcard: lunr.Query.wildcard.TRAILING
                    });
            });
            /* Retrieve suggestions for best match */
            suggest = titles.length
                ? Object.keys(titles[0].matchData.metadata)
                : [];
        }
        /* Return search result */
        return {
            items: [...groups.values()],
            ...typeof suggest !== "undefined" && { suggest }
        };
    }
}
exports.Search = Search;
//# sourceMappingURL=index.js.map