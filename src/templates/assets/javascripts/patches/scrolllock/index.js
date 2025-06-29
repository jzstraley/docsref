"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchScrolllock = patchScrolllock;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Patch the document body to lock when search is open
 *
 * For mobile and tablet viewports, the search is rendered full screen, which
 * leads to scroll leaking when at the top or bottom of the search result. This
 * function locks the body when the search is in full screen mode, and restores
 * the scroll position when leaving.
 *
 * @param options - Options
 */
function patchScrolllock({ viewport$, tablet$ }) {
    (0, rxjs_1.combineLatest)([(0, browser_1.watchToggle)("search"), tablet$])
        .pipe((0, rxjs_1.map)(([active, tablet]) => active && !tablet), (0, rxjs_1.switchMap)(active => (0, rxjs_1.of)(active)
        .pipe((0, rxjs_1.delay)(active ? 400 : 100))), (0, rxjs_1.withLatestFrom)(viewport$))
        .subscribe(([active, { offset: { y } }]) => {
        if (active) {
            document.body.setAttribute("data-md-scrolllock", "");
            document.body.style.top = `-${y}px`;
        }
        else {
            const value = -1 * parseInt(document.body.style.top, 10);
            document.body.removeAttribute("data-md-scrolllock");
            document.body.style.top = "";
            if (value)
                window.scrollTo(0, value);
        }
    });
}
//# sourceMappingURL=index.js.map