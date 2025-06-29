"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountAnnotationBlock = mountAnnotationBlock;
const rxjs_1 = require("rxjs");
const list_1 = require("../list");
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Find list element directly following a block
 *
 * @param el - Annotation block element
 *
 * @returns List element or nothing
 */
function findList(el) {
    if (el.nextElementSibling) {
        const sibling = el.nextElementSibling;
        if (sibling.tagName === "OL")
            return sibling;
        /* Skip empty paragraphs - see https://bit.ly/3r4ZJ2O */
        else if (sibling.tagName === "P" && !sibling.children.length)
            return findList(sibling);
    }
    /* Everything else */
    return undefined;
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount annotation block
 *
 * @param el - Annotation block element
 * @param options - Options
 *
 * @returns Annotation component observable
 */
function mountAnnotationBlock(el, options) {
    return (0, rxjs_1.defer)(() => {
        const list = findList(el);
        return typeof list !== "undefined"
            ? (0, list_1.mountAnnotationList)(list, el, options)
            : rxjs_1.EMPTY;
    });
}
//# sourceMappingURL=index.js.map