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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = handler;
const lunr_1 = __importDefault(require("lunr"));
const _1 = require("~/browser/element/_");
require("~/polyfills");
const _2 = require("../../_");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Search index
 */
let index;
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Fetch (= import) multi-language support through `lunr-languages`
 *
 * This function automatically imports the stemmers necessary to process the
 * languages which are defined as part of the search configuration.
 *
 * If the worker runs inside of an `iframe` (when using `iframe-worker` as
 * a shim), the base URL for the stemmers to be loaded must be determined by
 * searching for the first `script` element with a `src` attribute, which will
 * contain the contents of this script.
 *
 * @param config - Search configuration
 *
 * @returns Promise resolving with no result
 */
async function setupSearchLanguages(config) {
    let base = "../lunr";
    /* Detect `iframe-worker` and fix base URL */
    if (typeof parent !== "undefined" && "IFrameWorker" in parent) {
        const worker = (0, _1.getElement)("script[src]");
        const [path] = worker.src.split("/worker");
        /* Prefix base with path */
        base = base.replace("..", path);
    }
    /* Add scripts for languages */
    const scripts = [];
    for (const lang of config.lang) {
        switch (lang) {
            /* Add segmenter for Japanese */
            case "ja":
                scripts.push(`${base}/tinyseg.js`);
                break;
            /* Add segmenter for Hindi and Thai */
            case "hi":
            case "th":
                scripts.push(`${base}/wordcut.js`);
                break;
        }
        /* Add language support */
        if (lang !== "en")
            scripts.push(`${base}/min/lunr.${lang}.min.js`);
    }
    /* Add multi-language support */
    if (config.lang.length > 1)
        scripts.push(`${base}/min/lunr.multi.min.js`);
    /* Load scripts synchronously */
    if (scripts.length)
        await importScripts(`${base}/min/lunr.stemmer.support.min.js`, ...scripts);
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Message handler
 *
 * @param message - Source message
 *
 * @returns Target message
 */
async function handler(message) {
    switch (message.type) {
        /* Search setup message */
        case 0 /* SearchMessageType.SETUP */:
            await setupSearchLanguages(message.data.config);
            index = new _2.Search(message.data);
            return {
                type: 1 /* SearchMessageType.READY */
            };
        /* Search query message */
        case 2 /* SearchMessageType.QUERY */:
            const query = message.data;
            try {
                return {
                    type: 3 /* SearchMessageType.RESULT */,
                    data: index.search(query)
                };
                /* Return empty result in case of error */
            }
            catch (err) {
                console.warn(`Invalid query: ${query} – see https://bit.ly/2s3ChXG`);
                console.warn(err);
                return {
                    type: 3 /* SearchMessageType.RESULT */,
                    data: { items: [] }
                };
            }
        /* All other messages */
        default:
            throw new TypeError("Invalid message type");
    }
}
/* ----------------------------------------------------------------------------
 * Worker
 * ------------------------------------------------------------------------- */
/* Expose Lunr.js in global scope, or stemmers won't work */
self.lunr = lunr_1.default;
/* Monkey-patch Lunr.js to mitigate https://t.ly/68TLq */
lunr_1.default.utils.warn = console.warn;
/* Handle messages */
addEventListener("message", async (ev) => {
    postMessage(await handler(ev.data));
});
//# sourceMappingURL=index.js.map