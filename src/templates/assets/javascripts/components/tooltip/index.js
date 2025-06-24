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
exports.watchTooltip = watchTooltip;
exports.mountTooltip = mountTooltip;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const templates_1 = require("~/templates");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Global sequence number for tooltips
 */
let sequence = 0;
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch tooltip
 *
 * This function will append the tooltip temporarily to compute its width,
 * which is necessary for correct centering, and then removing it again.
 *
 * @param el - Tooltip element
 * @param host - Host element
 *
 * @returns Tooltip observable
 */
function watchTooltip(el, host) {
    document.body.append(el);
    /* Compute width and remove tooltip immediately */
    const { width } = (0, browser_1.getElementSize)(el);
    el.style.setProperty("--md-tooltip-width", `${width}px`);
    el.remove();
    /* Retrieve and watch containing element */
    const container = (0, browser_1.getElementContainer)(host);
    const scroll$ = typeof container !== "undefined"
        ? (0, browser_1.watchElementContentOffset)(container)
        : (0, rxjs_1.of)({ x: 0, y: 0 });
    /* Compute tooltip visibility */
    const active$ = (0, rxjs_1.merge)((0, browser_1.watchElementFocus)(host), (0, browser_1.watchElementHover)(host))
        .pipe((0, rxjs_1.distinctUntilChanged)());
    /* Compute tooltip offset */
    return (0, rxjs_1.combineLatest)([active$, scroll$])
        .pipe((0, rxjs_1.map)(([active, scroll]) => {
        let { x, y } = (0, browser_1.getElementOffset)(host);
        const size = (0, browser_1.getElementSize)(host);
        /**
         * Experimental: fix handling of tables - see https://bit.ly/3TQEj5O
         *
         * If this proves to be a viable fix, we should refactor tooltip
         * positioning and somehow streamline the current process. This might
         * also fix positioning for annotations inside tables, which is another
         * limitation.
         */
        const table = host.closest("table");
        if (table && host.parentElement) {
            x += table.offsetLeft + host.parentElement.offsetLeft;
            y += table.offsetTop + host.parentElement.offsetTop;
        }
        return {
            active,
            offset: {
                x: x - scroll.x + size.width / 2 - width / 2,
                y: y - scroll.y + size.height + 8
            }
        };
    }));
}
/**
 * Mount tooltip
 *
 * @param el - Host element
 *
 * @returns Tooltip component observable
 */
function mountTooltip(el) {
    const title = el.title;
    if (!title.length)
        return rxjs_1.EMPTY;
    /* Render tooltip and set title from host element */
    const id = `__tooltip_${sequence++}`;
    const tooltip = (0, templates_1.renderTooltip)(id, "inline");
    const typeset = (0, browser_1.getElement)(".md-typeset", tooltip);
    typeset.innerHTML = title;
    /* Mount component on subscription */
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        push$.subscribe({
            /* Handle emission */
            next({ offset }) {
                tooltip.style.setProperty("--md-tooltip-x", `${offset.x}px`);
                tooltip.style.setProperty("--md-tooltip-y", `${offset.y}px`);
            },
            /* Handle complete */
            complete() {
                tooltip.style.removeProperty("--md-tooltip-x");
                tooltip.style.removeProperty("--md-tooltip-y");
            }
        });
        /* Toggle tooltip presence to mitigate empty lines when copying */
        (0, rxjs_1.merge)(push$.pipe((0, rxjs_1.filter)(({ active }) => active)), push$.pipe((0, rxjs_1.debounceTime)(250), (0, rxjs_1.filter)(({ active }) => !active)))
            .subscribe({
            /* Handle emission */
            next({ active }) {
                if (active) {
                    el.insertAdjacentElement("afterend", tooltip);
                    el.setAttribute("aria-describedby", id);
                    el.removeAttribute("title");
                }
                else {
                    tooltip.remove();
                    el.removeAttribute("aria-describedby");
                    el.setAttribute("title", title);
                }
            },
            /* Handle complete */
            complete() {
                tooltip.remove();
                el.removeAttribute("aria-describedby");
                el.setAttribute("title", title);
            }
        });
        /* Toggle tooltip visibility */
        push$
            .pipe((0, rxjs_1.auditTime)(16, rxjs_1.animationFrameScheduler))
            .subscribe(({ active }) => {
            tooltip.classList.toggle("md-tooltip--active", active);
        });
        // @todo - refactor positioning together with annotations – there are
        // several things that overlap and are identical in handling
        /* Track relative origin of tooltip */
        push$
            .pipe((0, rxjs_1.throttleTime)(125, rxjs_1.animationFrameScheduler), (0, rxjs_1.filter)(() => !!el.offsetParent), (0, rxjs_1.map)(() => el.offsetParent.getBoundingClientRect()), (0, rxjs_1.map)(({ x }) => x))
            .subscribe({
            /* Handle emission */
            next(origin) {
                if (origin)
                    tooltip.style.setProperty("--md-tooltip-0", `${-origin}px`);
                else
                    tooltip.style.removeProperty("--md-tooltip-0");
            },
            /* Handle complete */
            complete() {
                tooltip.style.removeProperty("--md-tooltip-0");
            }
        });
        /* Create and return component */
        return watchTooltip(tooltip, el)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    })
        .pipe((0, rxjs_1.subscribeOn)(rxjs_1.asyncScheduler));
}
//# sourceMappingURL=index.js.map