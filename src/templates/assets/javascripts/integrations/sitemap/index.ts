

import {
  Observable,
  catchError,
  map,
  of
} from "rxjs"

import {
  getElement,
  getElements,
  requestXML
} from "~/browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Sitemap, i.e. a list of URLs
 */
export type Sitemap = Map<string, URL[]>

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
function resolve(url: URL, base: URL) {
  url.protocol = base.protocol
  url.hostname = base.hostname
  return url
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
function extract(document: Document, base: URL): Sitemap {
  const sitemap: Sitemap = new Map()
  for (const el of getElements("url", document)) {
    const url = getElement("loc", el)

    // Create entry for location and add it to the list of links
    const links = [resolve(new URL(url.textContent!), base)]
    sitemap.set(`${links[0]}`, links)

    // Attach alternate links to current entry
    for (const link of getElements("[rel=alternate]", el)) {
      const href = link.getAttribute("href")
      if (href != null)
        links.push(resolve(new URL(href), base))
    }
  }

  // Return sitemap
  return sitemap
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
export function fetchSitemap(base: URL | string): Observable<Sitemap> {
  return requestXML(new URL("sitemap.xml", base))
    .pipe(
      map(document => extract(document, new URL(base))),
      catchError(() => of(new Map())),
    )
}
