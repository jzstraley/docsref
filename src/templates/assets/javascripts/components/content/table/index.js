"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountDataTable = mountDataTable;
const rxjs_1 = require("rxjs");
const templates_1 = require("~/templates");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Sentinel for replacement
 */
const sentinel = (0, utilities_1.h)("table");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount data table
 *
 * This function wraps a data table in another scrollable container, so it can
 * be smoothly scrolled on smaller screen sizes and won't break the layout.
 *
 * @param el - Data table element
 *
 * @returns Data table component observable
 */
function mountDataTable(el) {
    el.replaceWith(sentinel);
    sentinel.replaceWith((0, templates_1.renderTable)(el));
    /* Create and return component */
    return (0, rxjs_1.of)({ ref: el });
}
//# sourceMappingURL=index.js.map