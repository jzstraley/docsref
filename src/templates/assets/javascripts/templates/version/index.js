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
exports.renderVersionSelector = renderVersionSelector;
const _1 = require("~/_");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Render a version
 *
 * @param version - Version
 *
 * @returns Element
 */
function renderVersion(version) {
    var _a;
    const config = (0, _1.configuration)();
    /* Ensure trailing slash - see https://bit.ly/3rL5u3f */
    const url = new URL(`../${version.version}/`, config.base);
    return ((0, utilities_1.h)("li", { class: "md-version__item" },
        (0, utilities_1.h)("a", { href: `${url}`, class: "md-version__link" },
            version.title,
            ((_a = config.version) === null || _a === void 0 ? void 0 : _a.alias) && version.aliases.length > 0 && ((0, utilities_1.h)("span", { class: "md-version__alias" }, version.aliases[0])))));
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render a version selector
 *
 * @param versions - Versions
 * @param active - Active version
 *
 * @returns Element
 */
function renderVersionSelector(versions, active) {
    var _a;
    const config = (0, _1.configuration)();
    versions = versions.filter(version => { var _a; return !((_a = version.properties) === null || _a === void 0 ? void 0 : _a.hidden); });
    return ((0, utilities_1.h)("div", { class: "md-version" },
        (0, utilities_1.h)("button", { class: "md-version__current", "aria-label": (0, _1.translation)("select.version") },
            active.title,
            ((_a = config.version) === null || _a === void 0 ? void 0 : _a.alias) && active.aliases.length > 0 && ((0, utilities_1.h)("span", { class: "md-version__alias" }, active.aliases[0]))),
        (0, utilities_1.h)("ul", { class: "md-version__list" }, versions.map(renderVersion))));
}
//# sourceMappingURL=index.js.map