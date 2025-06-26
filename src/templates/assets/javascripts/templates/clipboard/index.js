"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.renderClipboardButton = renderClipboardButton;
const _1 = require("~/_");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render a 'copy-to-clipboard' button
 *
 * @param id - Unique identifier
 *
 * @returns Element
 */
function renderClipboardButton(id) {
    return ((0, utilities_1.h)("button", { class: "md-clipboard md-icon", title: (0, _1.translation)("clipboard.copy"), "data-clipboard-target": `#${id} > code` }));
}
//# sourceMappingURL=index.js.map