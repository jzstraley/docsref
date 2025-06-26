"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.split = split;
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Split a string using the given separator
 *
 * @param input - Input value
 * @param separator - Separator
 * @param fn - Visitor function
 */
function split(input, separator, fn) {
    var _a;
    separator = new RegExp(separator, "g");
    /* Split string using separator */
    let match;
    let index = 0;
    do {
        match = separator.exec(input);
        /* Emit non-empty range */
        const until = (_a = match === null || match === void 0 ? void 0 : match.index) !== null && _a !== void 0 ? _a : input.length;
        if (index < until)
            fn(index, until);
        /* Update last index */
        if (match) {
            const [term] = match;
            index = match.index + term.length;
            /* Support zero-length lookaheads */
            if (term.length === 0)
                separator.lastIndex = match.index + 1;
        }
    } while (match);
}
//# sourceMappingURL=index.js.map