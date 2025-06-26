"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationHash = getLocationHash;
exports.setLocationHash = setLocationHash;
exports.watchLocationHash = watchLocationHash;
exports.watchLocationTarget = watchLocationTarget;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve location hash
 *
 * @returns Location hash
 */
function getLocationHash() {
    return location.hash.slice(1);
}
/**
 * Set location hash
 *
 * Setting a new fragment identifier via `location.hash` will have no effect
 * if the value doesn't change. When a new fragment identifier is set, we want
 * the browser to target the respective element at all times, which is why we
 * use this dirty little trick.
 *
 * @param hash - Location hash
 */
function setLocationHash(hash) {
    const el = (0, utilities_1.h)("a", { href: hash });
    el.addEventListener("click", ev => ev.stopPropagation());
    el.click();
}
/* ------------------------------------------------------------------------- */
/**
 * Watch location hash
 *
 * @param location$ - Location observable
 *
 * @returns Location hash observable
 */
function watchLocationHash(location$) {
    return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(window, "hashchange"), location$)
        .pipe((0, rxjs_1.map)(getLocationHash), (0, rxjs_1.startWith)(getLocationHash()), (0, rxjs_1.filter)(hash => hash.length > 0), (0, rxjs_1.shareReplay)(1));
}
/**
 * Watch location target
 *
 * @param location$ - Location observable
 *
 * @returns Location target observable
 */
function watchLocationTarget(location$) {
    return watchLocationHash(location$)
        .pipe((0, rxjs_1.map)(id => (0, browser_1.getOptionalElement)(`[id="${id}"]`)), (0, rxjs_1.filter)(el => typeof el !== "undefined"));
}
//# sourceMappingURL=index.js.map