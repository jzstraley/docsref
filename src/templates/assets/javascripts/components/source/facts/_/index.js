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