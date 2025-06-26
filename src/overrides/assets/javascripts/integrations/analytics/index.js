"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAnalytics = setupAnalytics;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Set up extra analytics events
 */
function setupAnalytics() {
    const { origin } = new URL(location.href);
    (0, rxjs_1.fromEvent)(document.body, "click")
        .subscribe(ev => {
        if (ev.target instanceof HTMLElement) {
            const el = ev.target.closest("a");
            if (el && el.origin !== origin)
                ga("send", "event", "outbound", "click", el.href);
        }
    });
}
//# sourceMappingURL=index.js.map