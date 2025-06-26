"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTabbedControl = renderTabbedControl;
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render control for content tabs
 *
 * @param type - Control type
 *
 * @returns Element
 */
function renderTabbedControl(type) {
    const classes = `tabbed-control tabbed-control--${type}`;
    return ((0, utilities_1.h)("div", { class: classes, hidden: true },
        (0, utilities_1.h)("button", { class: "tabbed-button", tabIndex: -1, "aria-hidden": "true" })));
}
//# sourceMappingURL=index.js.map