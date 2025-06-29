"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSourceFacts = renderSourceFacts;
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render repository facts
 *
 * @param facts - Repository facts
 *
 * @returns Element
 */
function renderSourceFacts(facts) {
    return ((0, utilities_1.h)("ul", { class: "md-source__facts" }, Object.entries(facts).map(([key, value]) => ((0, utilities_1.h)("li", { class: `md-source__fact md-source__fact--${key}` }, typeof value === "number" ? (0, utilities_1.round)(value) : value)))));
}
//# sourceMappingURL=index.js.map