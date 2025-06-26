"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTable = renderTable;
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render a table inside a wrapper to improve scrolling on mobile
 *
 * @param table - Table element
 *
 * @returns Element
 */
function renderTable(table) {
    return ((0, utilities_1.h)("div", { class: "md-typeset__scrollwrap" },
        (0, utilities_1.h)("div", { class: "md-typeset__table" }, table)));
}
//# sourceMappingURL=index.js.map