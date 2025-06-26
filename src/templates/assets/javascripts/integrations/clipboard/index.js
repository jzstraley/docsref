"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupClipboardJS = setupClipboardJS;
const clipboard_1 = __importDefault(require("clipboard"));
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Extract text to copy
 *
 * @param el - HTML element
 *
 * @returns Extracted text
 */
function extract(el) {
    el.setAttribute("data-md-copying", "");
    const copy = el.closest("[data-copy]");
    const text = copy
        ? copy.getAttribute("data-copy")
        : el.innerText;
    el.removeAttribute("data-md-copying");
    return text.trimEnd();
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Set up Clipboard.js integration
 *
 * @param options - Options
 */
function setupClipboardJS({ alert$ }) {
    if (clipboard_1.default.isSupported()) {
        new rxjs_1.Observable(subscriber => {
            new clipboard_1.default("[data-clipboard-target], [data-clipboard-text]", {
                text: el => (el.getAttribute("data-clipboard-text") ||
                    extract((0, browser_1.getElement)(el.getAttribute("data-clipboard-target"))))
            })
                .on("success", ev => subscriber.next(ev));
        })
            .pipe((0, rxjs_1.tap)(ev => {
            const trigger = ev.trigger;
            trigger.focus();
        }), (0, rxjs_1.map)(() => (0, _1.translation)("clipboard.copied")))
            .subscribe(alert$);
    }
}
//# sourceMappingURL=index.js.map