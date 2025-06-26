"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchDocument = watchDocument;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch document
 *
 * Documents are implemented as subjects, so all downstream observables are
 * automatically updated when a new document is emitted.
 *
 * @returns Document subject
 */
function watchDocument() {
    const document$ = new rxjs_1.ReplaySubject(1);
    (0, rxjs_1.fromEvent)(document, "DOMContentLoaded", { once: true })
        .subscribe(() => document$.next(document));
    /* Return document */
    return document$;
}
//# sourceMappingURL=index.js.map