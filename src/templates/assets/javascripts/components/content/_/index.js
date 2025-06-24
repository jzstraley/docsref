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
exports.mountContent = mountContent;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
const tooltip2_1 = require("../../tooltip2");
const annotation_1 = require("../annotation");
const code_1 = require("../code");
const details_1 = require("../details");
const mermaid_1 = require("../mermaid");
const table_1 = require("../table");
const tabs_1 = require("../tabs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount content
 *
 * This function mounts all components that are found in the content of the
 * actual article, including code blocks, data tables and details.
 *
 * @param el - Content element
 * @param options - Options
 *
 * @returns Content component observable
 */
function mountContent(el, { viewport$, target$, print$ }) {
    return (0, rxjs_1.merge)(
    /* Annotations */
    ...(0, browser_1.getElements)(".annotate:not(.highlight)", el)
        .map(child => (0, annotation_1.mountAnnotationBlock)(child, { target$, print$ })), 
    /* Code blocks */
    ...(0, browser_1.getElements)("pre:not(.mermaid) > code", el)
        .map(child => (0, code_1.mountCodeBlock)(child, { target$, print$ })), 
    /* Mermaid diagrams */
    ...(0, browser_1.getElements)("pre.mermaid", el)
        .map(child => (0, mermaid_1.mountMermaid)(child)), 
    /* Data tables */
    ...(0, browser_1.getElements)("table:not([class])", el)
        .map(child => (0, table_1.mountDataTable)(child)), 
    /* Details */
    ...(0, browser_1.getElements)("details", el)
        .map(child => (0, details_1.mountDetails)(child, { target$, print$ })), 
    /* Content tabs */
    ...(0, browser_1.getElements)("[data-tabs]", el)
        .map(child => (0, tabs_1.mountContentTabs)(child, { viewport$, target$ })), 
    /* Tooltips */
    ...(0, browser_1.getElements)("[title]", el)
        .filter(() => (0, _1.feature)("content.tooltips"))
        .map(child => (0, tooltip2_1.mountInlineTooltip2)(child, { viewport$ })));
}
//# sourceMappingURL=index.js.map