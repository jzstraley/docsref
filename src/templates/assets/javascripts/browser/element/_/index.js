"use strict";
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElements = getElements;
exports.getElement = getElement;
exports.getOptionalElement = getOptionalElement;
exports.getActiveElement = getActiveElement;
function getElements(selector, node = document) {
    return Array.from(node.querySelectorAll(selector));
}
function getElement(selector, node = document) {
    const el = getOptionalElement(selector, node);
    if (typeof el === "undefined")
        throw new ReferenceError(`Missing element: expected "${selector}" to be present`);
    /* Return element */
    return el;
}
function getOptionalElement(selector, node = document) {
    return node.querySelector(selector) || undefined;
}
/**
 * Retrieve the currently active element
 *
 * @returns Element or nothing
 */
function getActiveElement() {
    var _a, _b, _c, _d;
    return ((_d = (_c = (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.activeElement) !== null && _c !== void 0 ? _c : document.activeElement) !== null && _d !== void 0 ? _d : undefined);
}
//# sourceMappingURL=index.js.map