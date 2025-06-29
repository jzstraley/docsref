"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTooltip = renderTooltip;
exports.renderInlineTooltip2 = renderInlineTooltip2;
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render a tooltip
 *
 * @param id - Tooltip identifier
 * @param style - Tooltip style
 *
 * @returns Element
 */
function renderTooltip(id, style) {
    if (style === "inline") { // @todo refactor control flow
        return ((0, utilities_1.h)("div", { class: "md-tooltip md-tooltip--inline", id: id, role: "tooltip" },
            (0, utilities_1.h)("div", { class: "md-tooltip__inner md-typeset" })));
    }
    else {
        return ((0, utilities_1.h)("div", { class: "md-tooltip", id: id, role: "tooltip" },
            (0, utilities_1.h)("div", { class: "md-tooltip__inner md-typeset" })));
    }
}
// @todo: rename
function renderInlineTooltip2(...children) {
    return ((0, utilities_1.h)("div", { class: "md-tooltip2", role: "tooltip" },
        (0, utilities_1.h)("div", { class: "md-tooltip2__inner md-typeset" }, children)));
}
//# sourceMappingURL=index.js.map