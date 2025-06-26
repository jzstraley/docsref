"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAnnotation = renderAnnotation;
const utilities_1 = require("~/utilities");
const tooltip_1 = require("../tooltip");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render an annotation
 *
 * @param id - Annotation identifier
 * @param prefix - Tooltip identifier prefix
 *
 * @returns Element
 */
function renderAnnotation(id, prefix) {
    prefix = prefix ? `${prefix}_annotation_${id}` : undefined;
    /* Render tooltip with anchor, if given */
    if (prefix) {
        const anchor = prefix ? `#${prefix}` : undefined;
        return ((0, utilities_1.h)("aside", { class: "md-annotation", tabIndex: 0 },
            (0, tooltip_1.renderTooltip)(prefix),
            (0, utilities_1.h)("a", { href: anchor, class: "md-annotation__index", tabIndex: -1 },
                (0, utilities_1.h)("span", { "data-md-annotation-id": id }))));
    }
    else {
        return ((0, utilities_1.h)("aside", { class: "md-annotation", tabIndex: 0 },
            (0, tooltip_1.renderTooltip)(prefix),
            (0, utilities_1.h)("span", { class: "md-annotation__index", tabIndex: -1 },
                (0, utilities_1.h)("span", { "data-md-annotation-id": id }))));
    }
}
//# sourceMappingURL=index.js.map