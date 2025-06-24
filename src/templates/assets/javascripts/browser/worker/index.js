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
exports.watchWorker = watchWorker;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Create an observable for receiving from a web worker
 *
 * @template T - Data type
 *
 * @param worker - Web worker
 *
 * @returns Message observable
 */
function recv(worker) {
    return (0, rxjs_1.fromEvent)(worker, "message", ev => ev.data);
}
/**
 * Create a subject for sending to a web worker
 *
 * @template T - Data type
 *
 * @param worker - Web worker
 *
 * @returns Message subject
 */
function send(worker) {
    const send$ = new rxjs_1.Subject();
    send$.subscribe(data => worker.postMessage(data));
    /* Return message subject */
    return send$;
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Create a bidirectional communication channel to a web worker
 *
 * @template T - Data type
 *
 * @param url - Worker URL
 * @param worker - Worker
 *
 * @returns Worker subject
 */
function watchWorker(url, worker = new Worker(url)) {
    const recv$ = recv(worker);
    const send$ = send(worker);
    /* Create worker subject and forward messages */
    const worker$ = new rxjs_1.Subject();
    worker$.subscribe(send$);
    /* Return worker subject */
    const done$ = send$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(true));
    return worker$
        .pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.mergeWith)(recv$.pipe((0, rxjs_1.takeUntil)(done$))), (0, rxjs_1.share)());
}
//# sourceMappingURL=index.js.map