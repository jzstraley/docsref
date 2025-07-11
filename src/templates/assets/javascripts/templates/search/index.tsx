

import escapeHTML from "escape-html"
import { ComponentChild } from "preact"

import { configuration, feature, translation } from "~/_"
import { SearchItem } from "~/integrations/search"
import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Render flag
 */
const enum Flag {
  TEASER = 1,                          /* Render teaser */
  PARENT = 2                           /* Render as parent */
}

/* ----------------------------------------------------------------------------
 * Helper function
 * ------------------------------------------------------------------------- */

/**
 * Render a search document
 *
 * @param document - Search document
 * @param flag - Render flags
 *
 * @returns Element
 */
function renderSearchDocument(
  document: SearchItem, flag: Flag
): HTMLElement {
  const parent = flag & Flag.PARENT
  const teaser = flag & Flag.TEASER

  /* Render missing query terms */
  const missing = Object.keys(document.terms)
    .filter(key => !document.terms[key])
    .reduce<ComponentChild[]>((list, key) => [
      ...list, <del>{escapeHTML(key)}</del>, " "
    ], [])
    .slice(0, -1)

  /* Assemble query string for highlighting */
  const config = configuration()
  const url = new URL(document.location, config.base)
  if (feature("search.highlight"))
    url.searchParams.set("h", Object.entries(document.terms)
      .filter(([, match]) => match)
      .reduce((highlight, [value]) => `${highlight} ${value}`.trim(), "")
    )

  /* Render article or section, depending on flags */
  const { tags } = configuration()
  return (
    <a href={`${url}`} class="md-search-result__link" tabIndex={-1}>
      <article
        class="md-search-result__article md-typeset"
        data-md-score={document.score.toFixed(2)}
      >
        {parent > 0 && <div class="md-search-result__icon md-icon"></div>}
        {parent > 0 && <h1>{document.title}</h1>}
        {parent <= 0 && <h2>{document.title}</h2>}
        {teaser > 0 && document.text.length > 0 &&
          document.text
        }
        {document.tags && (
          <nav class="md-tags">
            {document.tags.map(tag => {
              const type = tags
                ? tag in tags
                  ? `md-tag-icon md-tag--${tags[tag]}`
                  : "md-tag-icon"
                : ""
              return (
                <span class={`md-tag ${type}`}>{tag}</span>
              )
            })}
          </nav>
        )}
        {teaser > 0 && missing.length > 0 &&
          <p class="md-search-result__terms">
            {translation("search.result.term.missing")}: {...missing}
          </p>
        }
      </article>
    </a>
  )
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render a search result
 *
 * @param result - Search result
 *
 * @returns Element
 */
export function renderSearchResultItem(
  result: SearchItem[]
): HTMLElement {
  const threshold = result[0].score
  const docs = [...result]

  const config = configuration()

  /* Find and extract parent article */
  const parent = docs.findIndex(doc => {
    const l = `${new URL(doc.location, config.base)}` // @todo hacky
    return !l.includes("#")
  })
  const [article] = docs.splice(parent, 1)

  /* Determine last index above threshold */
  let index = docs.findIndex(doc => doc.score < threshold)
  if (index === -1)
    index = docs.length

  /* Partition sections */
  const best = docs.slice(0, index)
  const more = docs.slice(index)

  /* Render children */
  const children = [
    renderSearchDocument(article, Flag.PARENT | +(!parent && index === 0)),
    ...best.map(section => renderSearchDocument(section, Flag.TEASER)),
    ...more.length ? [
      <details class="md-search-result__more">
        <summary tabIndex={-1}>
          <div>
            {more.length > 0 && more.length === 1
              ? translation("search.result.more.one")
              : translation("search.result.more.other", more.length)
            }
          </div>
        </summary>
        {...more.map(section => renderSearchDocument(section, Flag.TEASER))}
      </details>
    ] : []
  ]

  /* Render search result */
  return (
    <li class="md-search-result__item">
      {children}
    </li>
  )
}
