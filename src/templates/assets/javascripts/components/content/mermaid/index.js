"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountMermaid = mountMermaid;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const utilities_1 = require("~/utilities");
const index_css_1 = __importDefault(require("./index.css"));
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Mermaid instance observable
 */
let mermaid$;
/**
 * Global sequence number for diagrams
 */
let sequence = 0;
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Fetch Mermaid script
 *
 * @returns Mermaid scripts observable
 */
function fetchScripts() {
    return typeof mermaid === "undefined" || mermaid instanceof Element
        ? (0, browser_1.watchScript)("https://unpkg.com/mermaid@11/dist/mermaid.min.js")
        : (0, rxjs_1.of)(undefined);
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount Mermaid diagram
 *
 * @param el - Code block element
 *
 * @returns Mermaid diagram component observable
 */
function mountMermaid(el) {
    el.classList.remove("mermaid"); // Hack: mitigate https://bit.ly/3CiN6Du
    mermaid$ || (mermaid$ = fetchScripts()
        .pipe((0, rxjs_1.tap)(() => mermaid.initialize({
        startOnLoad: false,
        themeCSS: index_css_1.default,
        sequence: {
            actorFontSize: "16px", // Hack: mitigate https://bit.ly/3y0NEi3
            messageFontSize: "16px",
            noteFontSize: "16px"
        }
    })), (0, rxjs_1.map)(() => undefined), (0, rxjs_1.shareReplay)(1)));
    /* Render diagram */
    mermaid$.subscribe(async () => {
        el.classList.add("mermaid"); // Hack: mitigate https://bit.ly/3CiN6Du
        const id = `__mermaid_${sequence++}`;
        /* Create host element to replace code block */
        const host = (0, utilities_1.h)("div", { class: "mermaid" });
        const text = el.textContent;
        /* Render and inject diagram */
        const { svg, fn } = await mermaid.render(id, text);
        /* Create a shadow root and inject diagram */
        const shadow = host.attachShadow({ mode: "closed" });
        shadow.innerHTML = svg;
        /* Replace code block with diagram and bind functions */
        el.replaceWith(host);
        fn === null || fn === void 0 ? void 0 : fn(shadow);
    });
    /* Create and return component */
    return mermaid$
        .pipe((0, rxjs_1.map)(() => ({ ref: el })));
}
//# sourceMappingURL=index.js.map