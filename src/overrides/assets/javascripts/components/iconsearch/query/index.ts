

import {
  Observable,
  combineLatest,
  delay,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  startWith,
  withLatestFrom
} from "rxjs"

import { watchElementFocus } from "~/browser"

import { Component } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Icon search query
 */
export interface IconSearchQuery {
  value: string                        /* Query value */
  focus: boolean                       /* Query focus */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount icon search query
 *
 * @param el - Icon search query element
 *
 * @returns Icon search query component observable
 */
export function mountIconSearchQuery(
  el: HTMLInputElement
): Observable<Component<IconSearchQuery, HTMLInputElement>> {

  /* Intercept focus and input events */
  const focus$ = watchElementFocus(el)
  const value$ = merge(
    fromEvent(el, "keyup"),
    fromEvent(el, "focus").pipe(delay(1))
  )
    .pipe(
      map(() => el.value),
      startWith(el.value),
      distinctUntilChanged(),
    )

  /* Log search on blur */
  focus$
    .pipe(
      filter(active => !active),
      withLatestFrom(value$)
    )
      .subscribe(([, value]) => {
        const path = document.location.pathname
        if (typeof ga === "function" && value.length)
          ga("send", "pageview", `${path}?q=[icon]+${value}`)
      })

  /* Combine into single observable */
  return combineLatest([value$, focus$])
    .pipe(
      map(([value, focus]) => ({ ref: el, value, focus })),
    )
}
