

import {
  Observable,
  combineLatest,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  switchMap
} from "rxjs"

import {
  Viewport,
  watchElementSize
} from "~/browser"

import { Header } from "../header"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Main area
 */
export interface Main {
  offset: number                       /* Main area top offset */
  height: number                       /* Main area visible height */
  active: boolean                      /* Main area is active */
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

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch main area
 *
 * This function returns an observable that computes the visual parameters of
 * the main area which depends on the viewport vertical offset and height, as
 * well as the height of the header element, if the header is fixed.
 *
 * @param el - Main area element
 * @param options - Options
 *
 * @returns Main area observable
 */
export function watchMain(
  el: HTMLElement, { viewport$, header$ }: WatchOptions
): Observable<Main> {

  /* Compute necessary adjustment for header */
  const adjust$ = header$
    .pipe(
      map(({ height }) => height),
      distinctUntilChanged()
    )

  /* Compute the main area's top and bottom borders */
  const border$ = adjust$
    .pipe(
      switchMap(() => watchElementSize(el)
        .pipe(
          map(({ height }) => ({
            top:    el.offsetTop,
            bottom: el.offsetTop + height
          })),
          distinctUntilKeyChanged("bottom")
        )
      )
    )

  /* Compute the main area's offset, visible height and if we scrolled past */
  return combineLatest([adjust$, border$, viewport$])
    .pipe(
      map(([header, { top, bottom }, { offset: { y }, size: { height } }]) => {
        height = Math.max(0, height
          - Math.max(0, top    - y,  header)
          - Math.max(0, height + y - bottom)
        )
        return {
          offset: top - header,
          height,
          active: top - header <= y
        }
      }),
      distinctUntilChanged((a, b) => (
        a.offset === b.offset &&
        a.height === b.height &&
        a.active === b.active
      ))
    )
}
