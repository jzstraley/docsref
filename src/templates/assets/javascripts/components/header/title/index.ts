

import {
  EMPTY,
  Observable,
  Subject,
  defer,
  distinctUntilKeyChanged,
  finalize,
  map,
  tap
} from "rxjs"

import {
  Viewport,
  getElementSize,
  getOptionalElement,
  watchViewportAt
} from "~/browser"

import { Component } from "../../_"
import { Header } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Header
 */
export interface HeaderTitle {
  active: boolean                      /* Header title is active */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

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
export function watchHeaderTitle(
  el: HTMLElement, { viewport$, header$ }: WatchOptions
): Observable<HeaderTitle> {
  return watchViewportAt(el, { viewport$, header$ })
    .pipe(
      map(({ offset: { y } }) => {
        const { height } = getElementSize(el)
        return {
          active: y >= height
        }
      }),
      distinctUntilKeyChanged("active")
    )
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
export function mountHeaderTitle(
  el: HTMLElement, options: MountOptions
): Observable<Component<HeaderTitle>> {
  return defer(() => {
    const push$ = new Subject<HeaderTitle>()
    push$.subscribe({

      /* Handle emission */
      next({ active }) {
        el.classList.toggle("md-header__title--active", active)
      },

      /* Handle complete */
      complete() {
        el.classList.remove("md-header__title--active")
      }
    })

    /* Obtain headline, if any */
    const heading = getOptionalElement(".md-content h1")
    if (typeof heading === "undefined")
      return EMPTY

    /* Create and return component */
    return watchHeaderTitle(heading, options)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
