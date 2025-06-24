"use strict";
/*
 * Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
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