"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentElement = getComponentElement;
exports.getComponentElements = getComponentElements;
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve the element for a given component or throw a reference error
 *
 * @template T - Component type
 *
 * @param type - Component type
 * @param node - Node of reference
 *
 * @returns Element
 */
function getComponentElement(type, node = document) {
    return (0, browser_1.getElement)(`[data-mdx-component=${type}]`, node);
}
/**
 * Retrieve all elements for a given component
 *
 * @template T - Component type
 *
 * @param type - Component type
 * @param node - Node of reference
 *
 * @returns Elements
 */
function getComponentElements(type, node = document) {
    return (0, browser_1.getElements)(`[data-mdx-component=${type}]`, node);
}
//# sourceMappingURL=index.js.map