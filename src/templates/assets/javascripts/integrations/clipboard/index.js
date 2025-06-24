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