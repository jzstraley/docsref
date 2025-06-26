"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.mountSponsorship = mountSponsorship;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const templates_1 = require("_/templates");
const _1 = require("../_");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Mount sponsorship
 *
 * @param el - Sponsorship element
 *
 * @returns Sponsorship component observable
 */
function mountSponsorship(el) {
    const sponsorship$ = (0, browser_1.requestJSON)("https://3if8u9o552.execute-api.us-east-1.amazonaws.com/_/");
    /* Retrieve adjacent components */
    const count = (0, _1.getComponentElements)("sponsorship-count");
    const total = (0, _1.getComponentElements)("sponsorship-total");
    /* Render sponsorship count */
    sponsorship$.pipe((0, rxjs_1.switchMap)(sponsorship => (0, rxjs_1.from)(count).pipe((0, rxjs_1.tap)(child => child.innerText = `${sponsorship.sponsors.length}`))))
        .subscribe(() => el.removeAttribute("hidden"));
    /* Render sponsorship total */
    sponsorship$.pipe((0, rxjs_1.switchMap)(sponsorship => (0, rxjs_1.from)(total).pipe((0, rxjs_1.tap)(child => child.innerText = `$ ${sponsorship.total
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} a month`))))
        .subscribe();
    // Render sponsorship list
    const list = (0, browser_1.getOptionalElement)(":scope > .mdx-sponsorship__list", el);
    if (list && count.length) {
        sponsorship$.subscribe(sponsorship => {
            for (const sponsor of sponsorship.sponsors)
                if (sponsor.type === "public")
                    list.appendChild((0, templates_1.renderPublicSponsor)(sponsor.user));
            /* Render combined private sponsors */
            list.appendChild((0, templates_1.renderPrivateSponsor)(sponsorship.sponsors.filter(({ type }) => (type === "private")).length));
        });
    }
    /* Create and return component */
    return sponsorship$
        .pipe((0, rxjs_1.map)(state => ({ ref: el, ...state })));
}
//# sourceMappingURL=index.js.map