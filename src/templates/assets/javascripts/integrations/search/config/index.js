"use strict";
/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSearchDocumentMap = setupSearchDocumentMap;
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Create a search document map
 *
 * This function creates a mapping of URLs (including anchors) to the actual
 * articles and sections. It relies on the invariant that the search index is
 * ordered with the main article appearing before all sections with anchors.
 * If this is not the case, the logic music be changed.
 *
 * @param docs - Search documents
 *
 * @returns Search document map
 */
function setupSearchDocumentMap(docs) {
    const map = new Map();
    for (const doc of docs) {
        const [path] = doc.location.split("#");
        /* Add document article */
        const article = map.get(path);
        if (typeof article === "undefined") {
            map.set(path, doc);
            /* Add document section */
        }
        else {
            map.set(doc.location, doc);
            doc.parent = article;
        }
    }
    /* Return search document map */
    return map;
}
//# sourceMappingURL=index.js.map