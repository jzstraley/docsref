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
exports.mountAnnotationList = mountAnnotationList;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const templates_1 = require("~/templates");
const _1 = require("../_");
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Find all annotation hosts in the containing element
 *
 * @param container - Containing element
 *
 * @returns Annotation hosts
 */
function findHosts(container) {
    return container.tagName === "CODE"
        ? (0, browser_1.getElements)(".c, .c1, .cm", container)
        : [container];
}
/**
 * Find all annotation markers in the containing element
 *
 * @param container - Containing element
 *
 * @returns Annotation markers
 */
function findMarkers(container) {
    const markers = [];
    for (const el of findHosts(container)) {
        const nodes = [];
        /* Find all text nodes in current element */
        const it = document.createNodeIterator(el, NodeFilter.SHOW_TEXT);
        for (let node = it.nextNode(); node; node = it.nextNode())
            nodes.push(node);
        /* Find all markers in each text node */
        for (let text of nodes) {
            let match;
            /* Split text at marker and add to list */
            while ((match = /(\(\d+\))(!)?/.exec(text.textContent))) {
                const [, id, force] = match;
                if (typeof force === "undefined") {
                    const marker = text.splitText(match.index);
                    text = marker.splitText(id.length);
                    markers.push(marker);
                    /* Replace entire text with marker */
                }
                else {
                    text.textContent = id;
                    markers.push(text);
                    break;
                }
            }
        }
    }
    return markers;
}
/**
 * Swap the child nodes of two elements
 *
 * @param source - Source element
 * @param target - Target element
 */
function swap(source, target) {
    target.append(...Array.from(source.childNodes));
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount annotation list
 *
 * This function analyzes the containing code block and checks for markers
 * referring to elements in the given annotation list. If no markers are found,
 * the list is left untouched. Otherwise, list elements are rendered as
 * annotations inside the code block.
 *
 * @param el - Annotation list element
 * @param container - Containing element
 * @param options - Options
 *
 * @returns Annotation component observable
 */
function mountAnnotationList(el, container, { target$, print$ }) {
    /* Compute prefix for tooltip anchors */
    const parent = container.closest("[id]");
    const prefix = parent === null || parent === void 0 ? void 0 : parent.id;
    /* Find and replace all markers with empty annotations */
    const annotations = new Map();
    for (const marker of findMarkers(container)) {
        const [, id] = marker.textContent.match(/\((\d+)\)/);
        if ((0, browser_1.getOptionalElement)(`:scope > li:nth-child(${id})`, el)) {
            annotations.set(id, (0, templates_1.renderAnnotation)(id, prefix));
            marker.replaceWith(annotations.get(id));
        }
    }
    /* Keep list if there are no annotations to render */
    if (annotations.size === 0)
        return rxjs_1.EMPTY;
    /* Mount component on subscription */
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        const done$ = push$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(true));
        /* Retrieve container pairs for swapping */
        const pairs = [];
        for (const [id, annotation] of annotations)
            pairs.push([
                (0, browser_1.getElement)(".md-typeset", annotation),
                (0, browser_1.getElement)(`:scope > li:nth-child(${id})`, el)
            ]);
        /* Handle print mode - see https://bit.ly/3rgPdpt */
        print$.pipe((0, rxjs_1.takeUntil)(done$))
            .subscribe(active => {
            el.hidden = !active;
            /* Add class to discern list element */
            el.classList.toggle("md-annotation-list", active);
            /* Show annotations in code block or list (print) */
            for (const [inner, child] of pairs)
                if (!active)
                    swap(child, inner);
                else
                    swap(inner, child);
        });
        /* Create and return component */
        return (0, rxjs_1.merge)(...[...annotations]
            .map(([, annotation]) => ((0, _1.mountAnnotation)(annotation, container, { target$ }))))
            .pipe((0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.share)());
    });
}
//# sourceMappingURL=index.js.map