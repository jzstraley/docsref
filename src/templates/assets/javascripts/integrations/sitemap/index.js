"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSitemap = fetchSitemap;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Resolve URL to the given base URL
 *
 * When serving the site with instant navigation, MkDocs will set the hostname
 * to the value as specified in `dev_addr`, but the browser allows for several
 * hostnames to be used: `localhost`, `127.0.0.1` or even `0.0.0.0`, depending
 * on configuration. This function resolves the URL to the given hostname.
 *
 * @param url - URL
 * @param base - Base URL
 *
 * @returns Resolved URL
 */
function resolve(url, base) {
    url.protocol = base.protocol;
    url.hostname = base.hostname;
    return url;
}
/**
 * Extract sitemap from document
 *
 * This function extracts the URLs and alternate links from the document, and
 * associates alternate links to the original URL as found in `loc`, allowing
 * the browser to navigate to the correct page when switching languages. The
 * format of the sitemap is expected to adhere to:
 *
 * ``` xml
 * <urlset>
 *   <url>
 *     <loc>...</loc>
 *     <xhtml:link rel="alternate" hreflang="en" href="..."/>
 *     <xhtml:link rel="alternate" hreflang="de" href="..."/>
 *     ...
 *   </url>
 *   ...
 * </urlset>
 * ```
 *
 * @param document - Document
 * @param base - Base URL
 *
 * @returns Sitemap
 */
function extract(document, base) {
    const sitemap = new Map();
    for (const el of (0, browser_1.getElements)("url", document)) {
        const url = (0, browser_1.getElement)("loc", el);
        // Create entry for location and add it to the list of links
        const links = [resolve(new URL(url.textContent), base)];
        sitemap.set(`${links[0]}`, links);
        // Attach alternate links to current entry
        for (const link of (0, browser_1.getElements)("[rel=alternate]", el)) {
            const href = link.getAttribute("href");
            if (href != null)
                links.push(resolve(new URL(href), base));
        }
    }
    // Return sitemap
    return sitemap;
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Fetch the sitemap for the given base URL
 *
 * If a network or parsing error occurs, we just default to an empty sitemap,
 * which means the caller should fall back to regular navigation.
 *
 * @param base - Base URL
 *
 * @returns Sitemap observable
 */
function fetchSitemap(base) {
    return (0, browser_1.requestXML)(new URL("sitemap.xml", base))
        .pipe((0, rxjs_1.map)(document => extract(document, new URL(base))), (0, rxjs_1.catchError)(() => (0, rxjs_1.of)(new Map())));
}
//# sourceMappingURL=index.js.map