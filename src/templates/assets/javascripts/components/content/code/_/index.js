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
exports.watchCodeBlock = watchCodeBlock;
exports.mountCodeBlock = mountCodeBlock;
const clipboard_1 = __importDefault(require("clipboard"));
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
const tooltip2_1 = require("~/components/tooltip2");
const templates_1 = require("~/templates");
const annotation_1 = require("../../annotation");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Global sequence number for code blocks
 */
let sequence = 0;
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Find candidate list element directly following a code block
 *
 * @param el - Code block element
 *
 * @returns List element or nothing
 */
function findCandidateList(el) {
    if (el.nextElementSibling) {
        const sibling = el.nextElementSibling;
        if (sibling.tagName === "OL")
            return sibling;
        /* Skip empty paragraphs - see https://bit.ly/3r4ZJ2O */
        else if (sibling.tagName === "P" && !sibling.children.length)
            return findCandidateList(sibling);
    }
    /* Everything else */
    return undefined;
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch code block
 *
 * This function monitors size changes of the viewport, as well as switches of
 * content tabs with embedded code blocks, as both may trigger overflow.
 *
 * @param el - Code block element
 *
 * @returns Code block observable
 */
function watchCodeBlock(el) {
    return (0, browser_1.watchElementSize)(el)
        .pipe((0, rxjs_1.map)(({ width }) => {
        const content = (0, browser_1.getElementContentSize)(el);
        return {
            scrollable: content.width > width
        };
    }), (0, rxjs_1.distinctUntilKeyChanged)("scrollable"));
}
/**
 * Mount code block
 *
 * This function ensures that an overflowing code block is focusable through
 * keyboard, so it can be scrolled without a mouse to improve on accessibility.
 * Furthermore, if code annotations are enabled, they are mounted if and only
 * if the code block is currently visible, e.g., not in a hidden content tab.
 *
 * Note that code blocks may be mounted eagerly or lazily. If they're mounted
 * lazily (on first visibility), code annotation anchor links will not work,
 * as they are evaluated on initial page load, and code annotations in general
 * might feel a little bumpier.
 *
 * @param el - Code block element
 * @param options - Options
 *
 * @returns Code block and annotation component observable
 */
function mountCodeBlock(el, options) {
    const { matches: hover } = matchMedia("(hover)");
    /* Defer mounting of code block - see https://bit.ly/3vHVoVD */
    const factory$ = (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        const done$ = push$.pipe((0, rxjs_1.takeLast)(1));
        push$.subscribe(({ scrollable }) => {
            if (scrollable && hover)
                el.setAttribute("tabindex", "0");
            else
                el.removeAttribute("tabindex");
        });
        /* Render button for Clipboard.js integration */
        const content$ = [];
        if (clipboard_1.default.isSupported()) {
            if (el.closest(".copy") || ((0, _1.feature)("content.code.copy") && !el.closest(".no-copy"))) {
                const parent = el.closest("pre");
                parent.id = `__code_${sequence++}`;
                /* Mount tooltip, if enabled */
                const button = (0, templates_1.renderClipboardButton)(parent.id);
                parent.insertBefore(button, el);
                if ((0, _1.feature)("content.tooltips"))
                    content$.push((0, tooltip2_1.mountInlineTooltip2)(button, { viewport$ }));
            }
        }
        /* Handle code annotations */
        const container = el.closest(".highlight");
        if (container instanceof HTMLElement) {
            const list = findCandidateList(container);
            /* Mount code annotations, if enabled */
            if (typeof list !== "undefined" && (container.classList.contains("annotate") ||
                (0, _1.feature)("content.code.annotate"))) {
                const annotations$ = (0, annotation_1.mountAnnotationList)(list, el, options);
                content$.push((0, browser_1.watchElementSize)(container)
                    .pipe((0, rxjs_1.takeUntil)(done$), (0, rxjs_1.map)(({ width, height }) => width && height), (0, rxjs_1.distinctUntilChanged)(), (0, rxjs_1.switchMap)(active => active ? annotations$ : rxjs_1.EMPTY)));
            }
        }
        // If the code block has line spans, we can add this additional class to
        // the code block element, which fixes the problem for highlighted code
        // lines not stretching to the entirety of the screen when the code block
        // overflows, e.g., on mobile - see
        const spans = (0, browser_1.getElements)(":scope > span[id]", el);
        if (spans.length)
            el.classList.add("md-code__content");
        /* Create and return component */
        return watchCodeBlock(el)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })), (0, rxjs_1.mergeWith)(...content$));
    });
    /* Mount code block lazily */
    if ((0, _1.feature)("content.lazy"))
        return (0, browser_1.watchElementVisibility)(el)
            .pipe((0, rxjs_1.filter)(visible => visible), (0, rxjs_1.take)(1), (0, rxjs_1.switchMap)(() => factory$));
    /* Mount code block */
    return factory$;
}
//# sourceMappingURL=index.js.map