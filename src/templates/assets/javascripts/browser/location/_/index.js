"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocation = getLocation;
exports.setLocation = setLocation;
exports.watchLocation = watchLocation;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve location
 *
 * This function returns a `URL` object (and not `Location`) to normalize the
 * typings across the application. Furthermore, locations need to be tracked
 * without setting them and `Location` is a singleton which represents the
 * current location.
 *
 * @returns URL
 */
function getLocation() {
    return new URL(location.href);
}
/**
 * Set location
 *
 * If instant navigation is enabled, this function creates a temporary anchor
 * element, sets the `href` attribute, appends it to the body, clicks it, and
 * then removes it again. The event will bubble up the DOM and trigger be
 * intercepted by the instant loading business logic.
 *
 * Note that we must append and remove the anchor element, or the event will
 * not bubble up the DOM, making it impossible to intercept it.
 *
 * @param url - URL to navigate to
 * @param navigate - Force navigation
 */
function setLocation(url, navigate = false) {
    if ((0, _1.feature)("navigation.instant") && !navigate) {
        const el = (0, utilities_1.h)("a", { href: url.href });
        document.body.appendChild(el);
        el.click();
        el.remove();
        // If we're not using instant navigation, and the page should not be reloaded
        // just instruct the browser to navigate to the given URL
    }
    else {
        location.href = url.href;
    }
}
/* ------------------------------------------------------------------------- */
/**
 * Watch location
 *
 * @returns Location subject
 */
function watchLocation() {
    return new rxjs_1.Subject();
}
//# sourceMappingURL=index.js.map