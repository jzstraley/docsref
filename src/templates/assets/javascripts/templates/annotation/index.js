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