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
exports.request = request;
exports.requestJSON = requestJSON;
exports.requestHTML = requestHTML;
exports.requestXML = requestXML;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Fetch the given URL
 *
 * This function returns an observable that emits the response as a blob and
 * completes, or emits an error if the request failed. The caller can cancel
 * the request by unsubscribing at any time, which will automatically abort
 * the inflight request and complete the observable.
 *
 * Note that we use `XMLHTTPRequest` not because we're nostalgic, but because
 * it's the only way to get progress events for downloads and also allow for
 * cancellation of requests, as the official Fetch API does not support this
 * yet, even though we're already in 2024.
 *
 * @param url - Request URL
 * @param options - Options
 *
 * @returns Data observable
 */
function request(url, options) {
    return new rxjs_1.Observable(observer => {
        const req = new XMLHttpRequest();
        req.open("GET", `${url}`);
        req.responseType = "blob";
        // Handle response
        req.addEventListener("load", () => {
            if (req.status >= 200 && req.status < 300) {
                observer.next(req.response);
                observer.complete();
                // Every response that is not in the 2xx range is considered an error
            }
            else {
                observer.error(new Error(req.statusText));
            }
        });
        // Handle network errors
        req.addEventListener("error", () => {
            observer.error(new Error("Network error"));
        });
        // Handle aborted requests
        req.addEventListener("abort", () => {
            observer.complete();
        });
        // Handle download progress
        if (typeof (options === null || options === void 0 ? void 0 : options.progress$) !== "undefined") {
            req.addEventListener("progress", event => {
                var _a;
                if (event.lengthComputable) {
                    options.progress$.next((event.loaded / event.total) * 100);
                    // Hack: Chromium doesn't report the total number of bytes if content
                    // is compressed, so we need this fallback - see https://t.ly/ZXofI
                }
                else {
                    const length = (_a = req.getResponseHeader("Content-Length")) !== null && _a !== void 0 ? _a : 0;
                    options.progress$.next((event.loaded / +length) * 100);
                }
            });
            // Immediately set progress to 5% to indicate that we're loading
            options.progress$.next(5);
        }
        // Send request and automatically abort request upon unsubscription
        req.send();
        return () => req.abort();
    });
}
/* ------------------------------------------------------------------------- */
/**
 * Fetch JSON from the given URL
 *
 * @template T - Data type
 *
 * @param url - Request URL
 * @param options - Options
 *
 * @returns Data observable
 */
function requestJSON(url, options) {
    return request(url, options)
        .pipe((0, rxjs_1.switchMap)(res => res.text()), (0, rxjs_1.map)(body => JSON.parse(body)), (0, rxjs_1.shareReplay)(1));
}
/**
 * Fetch HTML from the given URL
 *
 * @param url - Request URL
 * @param options - Options
 *
 * @returns Data observable
 */
function requestHTML(url, options) {
    const dom = new DOMParser();
    return request(url, options)
        .pipe((0, rxjs_1.switchMap)(res => res.text()), (0, rxjs_1.map)(res => dom.parseFromString(res, "text/html")), (0, rxjs_1.shareReplay)(1));
}
/**
 * Fetch XML from the given URL
 *
 * @param url - Request URL
 * @param options - Options
 *
 * @returns Data observable
 */
function requestXML(url, options) {
    const dom = new DOMParser();
    return request(url, options)
        .pipe((0, rxjs_1.switchMap)(res => res.text()), (0, rxjs_1.map)(res => dom.parseFromString(res, "text/xml")), (0, rxjs_1.shareReplay)(1));
}
//# sourceMappingURL=index.js.map