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