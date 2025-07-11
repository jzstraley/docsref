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
 * FITNESS FOR A RTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSearchWorker = setupSearchWorker;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Set up search worker
 *
 * This function creates and initializes a web worker that is used for search,
 * so that the user interface doesn't freeze. In general, the application does
 * not care how search is implemented, as long as the web worker conforms to
 * the format expected by the application as defined in `SearchMessage`. This
 * allows the author to implement custom search functionality, by providing a
 * custom web worker via configuration.
 *
 * Material for MkDocs' built-in search implementation makes use of Lunr.js, an
 * efficient and fast implementation for client-side search. Leveraging a tiny
 * iframe-based web worker shim, search is even supported for the `file://`
 * protocol, enabling search for local non-hosted builds.
 *
 * If the protocol is `file://`, search initialization is deferred to mitigate
 * freezing, as it's now synchronous by design - see https://bit.ly/3C521EO
 *
 * @see https://bit.ly/3igvtQv - How to implement custom search
 *
 * @param url - Worker URL
 * @param index$ - Search index observable input
 *
 * @returns Search worker
 */
function setupSearchWorker(url, index$) {
    const worker$ = (0, browser_1.watchWorker)(url);
    (0, rxjs_1.merge)((0, rxjs_1.of)(location.protocol !== "file:"), (0, browser_1.watchToggle)("search"))
        .pipe((0, rxjs_1.first)(active => active), (0, rxjs_1.switchMap)(() => index$))
        .subscribe(({ config, docs }) => worker$.next({
        type: 0 /* SearchMessageType.SETUP */,
        data: {
            config,
            docs,
            options: {
                suggest: (0, _1.feature)("search.suggest")
            }
        }
    }));
    /* Return search worker */
    return worker$;
}
//# sourceMappingURL=index.js.map