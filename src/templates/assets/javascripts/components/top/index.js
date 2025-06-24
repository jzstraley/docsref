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
exports.watchBackToTop = watchBackToTop;
exports.mountBackToTop = mountBackToTop;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch back-to-top
 *
 * @param _el - Back-to-top element
 * @param options - Options
 *
 * @returns Back-to-top observable
 */
function watchBackToTop(_el, { viewport$, main$, target$ }) {
    /* Compute direction */
    const direction$ = viewport$
        .pipe((0, rxjs_1.map)(({ offset: { y } }) => y), (0, rxjs_1.bufferCount)(2, 1), (0, rxjs_1.map)(([a, b]) => a > b && b > 0), (0, rxjs_1.distinctUntilChanged)());
    /* Compute whether main area is active */
    const active$ = main$
        .pipe((0, rxjs_1.map)(({ active }) => active));
    /* Compute threshold for hiding */
    return (0, rxjs_1.combineLatest)([active$, direction$])
        .pipe((0, rxjs_1.map)(([active, direction]) => !(active && direction)), (0, rxjs_1.distinctUntilChanged)(), (0, rxjs_1.takeUntil)(target$.pipe((0, rxjs_1.skip)(1))), (0, rxjs_1.endWith)(true), (0, rxjs_1.repeat)({ delay: 250 }), (0, rxjs_1.map)(hidden => ({ hidden })));
}
/* ------------------------------------------------------------------------- */
/**
 * Mount back-to-top
 *
 * @param el - Back-to-top element
 * @param options - Options
 *
 * @returns Back-to-top component observable
 */
function mountBackToTop(el, { viewport$, header$, main$, target$ }) {
    const push$ = new rxjs_1.Subject();
    const done$ = push$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(true));
    push$.subscribe({
        /* Handle emission */
        next({ hidden }) {
            el.hidden = hidden;
            if (hidden) {
                el.setAttribute("tabindex", "-1");
                el.blur();
            }
            else {
                el.removeAttribute("tabindex");
            }
        },
        /* Handle complete */
        complete() {
            el.style.top = "";
            el.hidden = true;
            el.removeAttribute("tabindex");
        }
    });
    /* Watch header height */
    header$
        .pipe((0, rxjs_1.takeUntil)(done$), (0, rxjs_1.distinctUntilKeyChanged)("height"))
        .subscribe(({ height }) => {
        el.style.top = `${height + 16}px`;
    });
    /* Go back to top */
    (0, rxjs_1.fromEvent)(el, "click")
        .subscribe(ev => {
        ev.preventDefault();
        window.scrollTo({ top: 0 });
    });
    /* Create and return component */
    return watchBackToTop(el, { viewport$, main$, target$ })
        .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
}
//# sourceMappingURL=index.js.map