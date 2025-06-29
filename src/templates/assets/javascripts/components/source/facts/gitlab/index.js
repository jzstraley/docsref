"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSourceFactsFromGitLab = fetchSourceFactsFromGitLab;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Fetch GitLab repository facts
 *
 * @param base - GitLab base
 * @param project - GitLab project
 *
 * @returns Repository facts observable
 */
function fetchSourceFactsFromGitLab(base, project) {
    const url = `https://${base}/api/v4/projects/${encodeURIComponent(project)}`;
    return (0, rxjs_1.zip)(
    /* Fetch version */
    (0, browser_1.requestJSON)(`${url}/releases/permalink/latest`)
        .pipe((0, rxjs_1.catchError)(() => rxjs_1.EMPTY), // @todo refactor instant loading
    (0, rxjs_1.map)(({ tag_name }) => ({
        version: tag_name
    })), (0, rxjs_1.defaultIfEmpty)({})), 
    /* Fetch stars and forks */
    (0, browser_1.requestJSON)(url)
        .pipe((0, rxjs_1.catchError)(() => rxjs_1.EMPTY), // @todo refactor instant loading
    (0, rxjs_1.map)(({ star_count, forks_count }) => ({
        stars: star_count,
        forks: forks_count
    })), (0, rxjs_1.defaultIfEmpty)({})))
        .pipe((0, rxjs_1.map)(([release, info]) => ({ ...release, ...info })));
}
//# sourceMappingURL=index.js.map