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
exports.watchPalette = watchPalette;
exports.mountPalette = mountPalette;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const utilities_1 = require("~/utilities");
const _1 = require("../_");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch color palette
 *
 * @param inputs - Color palette element
 *
 * @returns Color palette observable
 */
function watchPalette(inputs) {
    const current = __md_get("__palette") || {
        index: inputs.findIndex(input => matchMedia(input.getAttribute("data-md-color-media")).matches)
    };
    /* Emit changes in color palette */
    const index = Math.max(0, Math.min(current.index, inputs.length - 1));
    return (0, rxjs_1.of)(...inputs)
        .pipe((0, rxjs_1.mergeMap)(input => (0, rxjs_1.fromEvent)(input, "change").pipe((0, rxjs_1.map)(() => input))), (0, rxjs_1.startWith)(inputs[index]), (0, rxjs_1.map)(input => ({
        index: inputs.indexOf(input),
        color: {
            media: input.getAttribute("data-md-color-media"),
            scheme: input.getAttribute("data-md-color-scheme"),
            primary: input.getAttribute("data-md-color-primary"),
            accent: input.getAttribute("data-md-color-accent")
        }
    })), (0, rxjs_1.shareReplay)(1));
}
/**
 * Mount color palette
 *
 * @param el - Color palette element
 *
 * @returns Color palette component observable
 */
function mountPalette(el) {
    const inputs = (0, browser_1.getElements)("input", el);
    const meta = (0, utilities_1.h)("meta", { name: "theme-color" });
    document.head.appendChild(meta);
    // Add color scheme meta tag
    const scheme = (0, utilities_1.h)("meta", { name: "color-scheme" });
    document.head.appendChild(scheme);
    /* Mount component on subscription */
    const media$ = (0, browser_1.watchMedia)("(prefers-color-scheme: light)");
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        push$.subscribe(palette => {
            document.body.setAttribute("data-md-color-switching", "");
            /* Retrieve color palette for system preference */
            if (palette.color.media === "(prefers-color-scheme)") {
                const media = matchMedia("(prefers-color-scheme: light)");
                const input = document.querySelector(media.matches
                    ? "[data-md-color-media='(prefers-color-scheme: light)']"
                    : "[data-md-color-media='(prefers-color-scheme: dark)']");
                /* Retrieve colors for system preference */
                palette.color.scheme = input.getAttribute("data-md-color-scheme");
                palette.color.primary = input.getAttribute("data-md-color-primary");
                palette.color.accent = input.getAttribute("data-md-color-accent");
            }
            /* Set color palette */
            for (const [key, value] of Object.entries(palette.color))
                document.body.setAttribute(`data-md-color-${key}`, value);
            /* Set toggle visibility */
            for (let index = 0; index < inputs.length; index++) {
                const label = inputs[index].nextElementSibling;
                if (label instanceof HTMLElement)
                    label.hidden = palette.index !== index;
            }
            /* Persist preference in local storage */
            __md_set("__palette", palette);
        });
        // Handle color switch on Enter or Space - see https://t.ly/YIhVj
        (0, rxjs_1.fromEvent)(el, "keydown").pipe((0, rxjs_1.filter)(ev => ev.key === "Enter"), (0, rxjs_1.withLatestFrom)(push$, (_, palette) => palette))
            .subscribe(({ index }) => {
            index = (index + 1) % inputs.length;
            inputs[index].click();
            inputs[index].focus();
        });
        /* Update theme-color meta tag */
        push$
            .pipe((0, rxjs_1.map)(() => {
            const header = (0, _1.getComponentElement)("header");
            const style = window.getComputedStyle(header);
            // Set color scheme
            scheme.content = style.colorScheme;
            /* Return color in hexadecimal format */
            return style.backgroundColor.match(/\d+/g)
                .map(value => (+value).toString(16).padStart(2, "0"))
                .join("");
        }))
            .subscribe(color => meta.content = `#${color}`);
        /* Revert transition durations after color switch */
        push$.pipe((0, rxjs_1.observeOn)(rxjs_1.asyncScheduler))
            .subscribe(() => {
            document.body.removeAttribute("data-md-color-switching");
        });
        /* Create and return component */
        return watchPalette(inputs)
            .pipe((0, rxjs_1.takeUntil)(media$.pipe((0, rxjs_1.skip)(1))), (0, rxjs_1.repeat)(), (0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map