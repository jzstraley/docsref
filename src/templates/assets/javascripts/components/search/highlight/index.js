"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountSearchHiglight = mountSearchHiglight;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const integrations_1 = require("~/integrations");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount search highlighting
 *
 * @param el - Content element
 * @param options - Options
 *
 * @returns Search highlighting component observable
 */
function mountSearchHiglight(el, { index$, location$ }) {
    return (0, rxjs_1.combineLatest)([
        index$,
        location$
            .pipe((0, rxjs_1.startWith)((0, browser_1.getLocation)()), (0, rxjs_1.filter)(url => !!url.searchParams.get("h")))
    ])
        .pipe((0, rxjs_1.map)(([index, url]) => (0, integrations_1.setupSearchHighlighter)(index.config)(url.searchParams.get("h"))), (0, rxjs_1.map)(fn => {
        var _a;
        const nodes = new Map();
        /* Traverse text nodes and collect matches */
        const it = document.createNodeIterator(el, NodeFilter.SHOW_TEXT);
        for (let node = it.nextNode(); node; node = it.nextNode()) {
            if ((_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.offsetHeight) {
                const original = node.textContent;
                const replaced = fn(original);
                if (replaced.length > original.length)
                    nodes.set(node, replaced);
            }
        }
        /* Replace original nodes with matches */
        for (const [node, text] of nodes) {
            const { childNodes } = (0, utilities_1.h)("span", null, text);
            node.replaceWith(...Array.from(childNodes));
        }
        /* Return component */
        return { ref: el, nodes };
    }));
}
//# sourceMappingURL=index.js.map