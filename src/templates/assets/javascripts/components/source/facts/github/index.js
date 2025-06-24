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