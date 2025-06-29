"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchMedia = watchMedia;
exports.watchPrint = watchPrint;
exports.at = at;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch media query
 *
 * Note that although `MediaQueryList.addListener` is deprecated we have to
 * use it, because it's the only way to ensure proper downward compatibility.
 *
 * @see https://bit.ly/3dUBH2m - GitHub issue
 *
 * @param query - Media query
 *
 * @returns Media observable
 */
function watchMedia(query) {
    const media = matchMedia(query);
    return (0, rxjs_1.fromEventPattern)(next => (media.addListener(() => next(media.matches))))
        .pipe((0, rxjs_1.startWith)(media.matches));
}
/**
 * Watch print mode
 *
 * @returns Print observable
 */
function watchPrint() {
    const media = matchMedia("print");
    return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(window, "beforeprint").pipe((0, rxjs_1.map)(() => true)), (0, rxjs_1.fromEvent)(window, "afterprint").pipe((0, rxjs_1.map)(() => false)))
        .pipe((0, rxjs_1.startWith)(media.matches));
}
/* ------------------------------------------------------------------------- */
/**
 * Toggle an observable with a media observable
 *
 * @template T - Data type
 *
 * @param query$ - Media observable
 * @param factory - Observable factory
 *
 * @returns Toggled observable
 */
function at(query$, factory) {
    return query$
        .pipe((0, rxjs_1.switchMap)(active => active ? factory() : rxjs_1.EMPTY));
}
//# sourceMappingURL=index.js.map