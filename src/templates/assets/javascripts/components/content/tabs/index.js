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
exports.watchContentTabs = watchContentTabs;
exports.mountContentTabs = mountContentTabs;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
const templates_1 = require("~/templates");
const utilities_1 = require("~/utilities");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch content tabs
 *
 * @param inputs - Content tabs input elements
 *
 * @returns Content tabs observable
 */
function watchContentTabs(inputs) {
    const initial = inputs.find(input => input.checked) || inputs[0];
    return (0, rxjs_1.merge)(...inputs.map(input => (0, rxjs_1.fromEvent)(input, "change")
        .pipe((0, rxjs_1.map)(() => (0, browser_1.getElement)(`label[for="${input.id}"]`)))))
        .pipe((0, rxjs_1.startWith)((0, browser_1.getElement)(`label[for="${initial.id}"]`)), (0, rxjs_1.map)(active => ({ active })));
}
/**
 * Mount content tabs
 *
 * @param el - Content tabs element
 * @param options - Options
 *
 * @returns Content tabs component observable
 */
function mountContentTabs(el, { viewport$, target$ }) {
    const container = (0, browser_1.getElement)(".tabbed-labels", el);
    const inputs = (0, browser_1.getElements)(":scope > input", el);
    /* Render content tab previous button for pagination */
    const prev = (0, templates_1.renderTabbedControl)("prev");
    el.append(prev);
    /* Render content tab next button for pagination */
    const next = (0, templates_1.renderTabbedControl)("next");
    el.append(next);
    /* Mount component on subscription */
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        const done$ = push$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(true));
        (0, rxjs_1.combineLatest)([push$, (0, browser_1.watchElementSize)(el), (0, browser_1.watchElementVisibility)(el)])
            .pipe((0, rxjs_1.takeUntil)(done$), (0, rxjs_1.auditTime)(1, rxjs_1.animationFrameScheduler))
            .subscribe({
            /* Handle emission */
            next([{ active }, size]) {
                const offset = (0, browser_1.getElementOffset)(active);
                const { width } = (0, browser_1.getElementSize)(active);
                /* Set tab indicator offset and width */
                el.style.setProperty("--md-indicator-x", `${offset.x}px`);
                el.style.setProperty("--md-indicator-width", `${width}px`);
                /* Scroll container to active content tab */
                const content = (0, browser_1.getElementContentOffset)(container);
                if (offset.x < content.x ||
                    offset.x + width > content.x + size.width)
                    container.scrollTo({
                        left: Math.max(0, offset.x - 16),
                        behavior: "smooth"
                    });
            },
            /* Handle complete */
            complete() {
                el.style.removeProperty("--md-indicator-x");
                el.style.removeProperty("--md-indicator-width");
            }
        });
        /* Hide content tab buttons on borders */
        (0, rxjs_1.combineLatest)([
            (0, browser_1.watchElementContentOffset)(container),
            (0, browser_1.watchElementSize)(container)
        ])
            .pipe((0, rxjs_1.takeUntil)(done$))
            .subscribe(([offset, size]) => {
            const content = (0, browser_1.getElementContentSize)(container);
            prev.hidden = offset.x < 16;
            next.hidden = offset.x > content.width - size.width - 16;
        });
        /* Paginate content tab container on click */
        (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(prev, "click").pipe((0, rxjs_1.map)(() => -1)), (0, rxjs_1.fromEvent)(next, "click").pipe((0, rxjs_1.map)(() => +1)))
            .pipe((0, rxjs_1.takeUntil)(done$))
            .subscribe(direction => {
            const { width } = (0, browser_1.getElementSize)(container);
            container.scrollBy({
                left: width * direction,
                behavior: "smooth"
            });
        });
        /* Switch to content tab target */
        target$
            .pipe((0, rxjs_1.takeUntil)(done$), (0, rxjs_1.filter)(input => inputs.includes(input)))
            .subscribe(input => input.click());
        /* Add link to each content tab label */
        container.classList.add("tabbed-labels--linked");
        for (const input of inputs) {
            const label = (0, browser_1.getElement)(`label[for="${input.id}"]`);
            label.replaceChildren((0, utilities_1.h)("a", {
                href: `#${label.htmlFor}`,
                tabIndex: -1
            }, ...Array.from(label.childNodes)));
            /* Allow to copy link without scrolling to anchor */
            (0, rxjs_1.fromEvent)(label.firstElementChild, "click")
                .pipe((0, rxjs_1.takeUntil)(done$), (0, rxjs_1.filter)(ev => !(ev.metaKey || ev.ctrlKey)), (0, rxjs_1.tap)(ev => {
                ev.preventDefault();
                ev.stopPropagation();
            }))
                // @todo we might need to remove the anchor link on complete
                .subscribe(() => {
                history.replaceState({}, "", `#${label.htmlFor}`);
                label.click();
            });
        }
        /* Set up linking of content tabs, if enabled */
        if ((0, _1.feature)("content.tabs.link"))
            push$.pipe((0, rxjs_1.skip)(1), (0, rxjs_1.withLatestFrom)(viewport$))
                .subscribe(([{ active }, { offset }]) => {
                const tab = active.innerText.trim();
                if (active.hasAttribute("data-md-switching")) {
                    active.removeAttribute("data-md-switching");
                    /* Determine viewport offset of active tab */
                }
                else {
                    const y = el.offsetTop - offset.y;
                    /* Passively activate other tabs */
                    for (const set of (0, browser_1.getElements)("[data-tabs]"))
                        for (const input of (0, browser_1.getElements)(":scope > input", set)) {
                            const label = (0, browser_1.getElement)(`label[for="${input.id}"]`);
                            if (label !== active &&
                                label.innerText.trim() === tab) {
                                label.setAttribute("data-md-switching", "");
                                input.click();
                                break;
                            }
                        }
                    /* Bring active tab into view */
                    window.scrollTo({
                        top: el.offsetTop - y
                    });
                    /* Persist active tabs in local storage */
                    const tabs = __md_get("__tabs") || [];
                    __md_set("__tabs", [...new Set([tab, ...tabs])]);
                }
            });
        /* Pause media (audio, video) on switch - see https://bit.ly/3Bk6cel */
        push$.pipe((0, rxjs_1.takeUntil)(done$))
            .subscribe(() => {
            for (const media of (0, browser_1.getElements)("audio, video", el))
                media.pause();
        });
        /* Create and return component */
        return watchContentTabs(inputs)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    })
        .pipe((0, rxjs_1.subscribeOn)(rxjs_1.asyncScheduler));
}
//# sourceMappingURL=index.js.map