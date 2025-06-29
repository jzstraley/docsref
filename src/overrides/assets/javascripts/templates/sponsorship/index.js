"use strict";
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
        (0, utilities_1.h)("img", { src: user.image, alt: user.name })));
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