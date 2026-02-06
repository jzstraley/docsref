import { BehaviorSubject, Observable, fromEvent, map, merge } from "rxjs"

import { configuration } from "~/_"
import { requestJSON } from "~/browser"

import {
  Component,
  getComponentElement,
  getComponentElements
} from "../../_"
import {
  IconSearchQuery,
  mountIconSearchQuery
} from "../query"
import {
  IconSearchResult,
  mountIconSearchResult
} from "../result"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Icon category
 */
export interface IconCategory {
  base: string                         /* Category base URL */
  data: Record<string, string>         /* Category data */
}

/**
 * Icon search index
 */
export interface IconSearchIndex {
  icons: IconCategory                  /* Icons */
  emojis: IconCategory                 /* Emojis */
}

/* ------------------------------------------------------------------------- */

/**
 * Icon search
 */
export type IconSearch =
  | IconSearchQuery
  | IconSearchResult

/**
 * Icon search mode
 */
export type IconSearchMode =
  | "all"
  | "icons"
  | "emojis"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount icon search
 *
 * @param el - Icon search element
 *
 * @returns Icon search component observable
 */
export function mountIconSearch(
  el: HTMLElement
): Observable<Component<IconSearch>> {
  const config = configuration()
  const index$ = requestJSON<IconSearchIndex>(
    new URL("assets/javascripts/iconsearch_index.json", config.base)
  )

  /* Retrieve query and result components */
  const query  = getComponentElement("iconsearch-query", el)
  const result = getComponentElement("iconsearch-result", el)

  /* Retrieve select component */
  const mode$ = new BehaviorSubject<IconSearchMode>("all")
  const selects = getComponentElements("iconsearch-select", el)
  for (const select of selects) {
    fromEvent(select, "change").pipe(
      map(ev => (ev.target as HTMLSelectElement).value as IconSearchMode)
    )
      .subscribe(mode$)
  }

  /* Create and return component */
  const query$  = mountIconSearchQuery(query)
  const result$ = mountIconSearchResult(result, { index$, query$, mode$ })
  return merge(query$, result$)
}
