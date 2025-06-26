"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSourceFacts = fetchSourceFacts;
const rxjs_1 = require("rxjs");
const github_1 = require("../github");
const gitlab_1 = require("../gitlab");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Fetch repository facts
 *
 * @param url - Repository URL
 *
 * @returns Repository facts observable
 */
function fetchSourceFacts(url) {
    /* Try to match GitHub repository */
    let match = url.match(/^.+github\.com\/([^/]+)\/?([^/]+)?/i);
    if (match) {
        const [, user, repo] = match;
        return (0, github_1.fetchSourceFactsFromGitHub)(user, repo);
    }
    /* Try to match GitLab repository */
    match = url.match(/^.+?([^/]*gitlab[^/]+)\/(.+?)\/?$/i);
    if (match) {
        const [, base, slug] = match;
        return (0, gitlab_1.fetchSourceFactsFromGitLab)(base, slug);
    }
    /* Fallback */
    return rxjs_1.EMPTY;
}
//# sourceMappingURL=index.js.map