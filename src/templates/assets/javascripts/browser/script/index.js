"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchScript = watchScript;
const rxjs_1 = require("rxjs");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Create and load a `script` element
 *
 * This function returns an observable that will emit when the script was
 * successfully loaded, or throw an error if it wasn't.
 *
 * @param src - Script URL
 *
 * @returns Script observable
 */
function watchScript(src) {
    const script = (0, utilities_1.h)("script", { src });
    return (0, rxjs_1.defer)(() => {
        document.head.appendChild(script);
        return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(script, "load"), (0, rxjs_1.fromEvent)(script, "error")
            .pipe((0, rxjs_1.switchMap)(() => ((0, rxjs_1.throwError)(() => new ReferenceError(`Invalid script: ${src}`))))))
            .pipe((0, rxjs_1.map)(() => undefined), (0, rxjs_1.finalize)(() => document.head.removeChild(script)), (0, rxjs_1.take)(1));
    });
}
//# sourceMappingURL=index.js.map