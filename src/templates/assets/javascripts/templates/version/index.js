"use strict";
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