"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSourceFactsFromGitHub = fetchSourceFactsFromGitHub;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Fetch GitHub repository facts
 *
 * @param user - GitHub user or organization
 * @param repo - GitHub repository
 *
 * @returns Repository facts observable
 */
function fetchSourceFactsFromGitHub(user, repo) {
    if (typeof repo !== "undefined") {
        const url = `https://api.github.com/repos/${user}/${repo}`;
        return (0, rxjs_1.zip)(
        /* Fetch version */
        (0, browser_1.requestJSON)(`${url}/releases/latest`)
            .pipe((0, rxjs_1.catchError)(() => rxjs_1.EMPTY), // @todo refactor instant loading
        (0, rxjs_1.map)(release => ({
            version: release.tag_name
        })), (0, rxjs_1.defaultIfEmpty)({})), 
        /* Fetch stars and forks */
        (0, browser_1.requestJSON)(url)
            .pipe((0, rxjs_1.catchError)(() => rxjs_1.EMPTY), // @todo refactor instant loading
        (0, rxjs_1.map)(info => ({
            stars: info.stargazers_count,
            forks: info.forks_count
        })), (0, rxjs_1.defaultIfEmpty)({})))
            .pipe((0, rxjs_1.map)(([release, info]) => ({ ...release, ...info })));
        /* User or organization */
    }
    else {
        const url = `https://api.github.com/users/${user}`;
        return (0, browser_1.requestJSON)(url)
            .pipe((0, rxjs_1.map)(info => ({
            repositories: info.public_repos
        })), (0, rxjs_1.defaultIfEmpty)({}));
    }
}
//# sourceMappingURL=index.js.map