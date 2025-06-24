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
exports.renderPublicSponsor = renderPublicSponsor;
exports.renderPrivateSponsor = renderPrivateSponsor;
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render public sponsor
 *
 * @param user - Sponsor user
 *
 * @returns Element
 */
function renderPublicSponsor(user) {
    const title = `@${user.name}`;
    return ((0, utilities_1.h)("a", { href: user.url, title: title, class: "mdx-sponsorship__item" },
        (0, utilities_1.h)("img", { src: user.image })));
}
/**
 * Render private sponsor
 *
 * @param count - Number of private sponsors
 *
 * @returns Element
 */
function renderPrivateSponsor(count) {
    return ((0, utilities_1.h)("a", { href: "https://github.com/sponsors/squidfunk?metadata_origin=docs", class: "mdx-sponsorship__item mdx-sponsorship__item--private" },
        "+",
        count));
}
//# sourceMappingURL=index.js.map