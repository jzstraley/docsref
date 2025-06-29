"use strict";
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