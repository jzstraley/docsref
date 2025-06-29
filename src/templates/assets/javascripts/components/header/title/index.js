"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchHeaderTitle = watchHeaderTitle;
exports.mountHeaderTitle = mountHeaderTitle;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch header title
 *
 * @param el - Heading element
 * @param options - Options
 *
 * @returns Header title observable
 */
function watchHeaderTitle(el, { viewport$, header$ }) {
    return (0, browser_1.watchViewportAt)(el, { viewport$, header$ })
        .pipe((0, rxjs_1.map)(({ offset: { y } }) => {
        const { height } = (0, browser_1.getElementSize)(el);
        return {
            active: y >= height
        };
    }), (0, rxjs_1.distinctUntilKeyChanged)("active"));
}
/**
 * Mount header title
 *
 * This function swaps the header title from the site title to the title of the
 * current page when the user scrolls past the first headline.
 *
 * @param el - Header title element
 * @param options - Options
 *
 * @returns Header title component observable
 */
function mountHeaderTitle(el, options) {
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        push$.subscribe({
            /* Handle emission */
            next({ active }) {
                el.classList.toggle("md-header__title--active", active);
            },
            /* Handle complete */
            complete() {
                el.classList.remove("md-header__title--active");
            }
        });
        /* Obtain headline, if any */
        const heading = (0, browser_1.getOptionalElement)(".md-content h1");
        if (typeof heading === "undefined")
            return rxjs_1.EMPTY;
        /* Create and return component */
        return watchHeaderTitle(heading, options)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map