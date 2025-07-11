

import {
  EMPTY,
  Observable,
  Subject,
  defer,
  endWith,
  finalize,
  ignoreElements,
  merge,
  share,
  takeUntil
} from "rxjs"

import {
  getElement,
  getElements,
  getOptionalElement
} from "~/browser"
import { renderAnnotation } from "~/templates"

import { Component } from "../../../_"
import {
  Annotation,
  mountAnnotation
} from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  target$: Observable<HTMLElement>     /* Location target observable */
  print$: Observable<boolean>          /* Media print observable */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Find all annotation hosts in the containing element
 *
 * @param container - Containing element
 *
 * @returns Annotation hosts
 */
function findHosts(container: HTMLElement): HTMLElement[] {
  return container.tagName === "CODE"
    ? getElements(".c, .c1, .cm", container)
    : [container]
}

/**
 * Find all annotation markers in the containing element
 *
 * @param container - Containing element
 *
 * @returns Annotation markers
 */
function findMarkers(container: HTMLElement): Text[] {
  const markers: Text[] = []
  for (const el of findHosts(container)) {
    const nodes: Text[] = []

    /* Find all text nodes in current element */
    const it = document.createNodeIterator(el, NodeFilter.SHOW_TEXT)
    for (let node = it.nextNode(); node; node = it.nextNode())
      nodes.push(node as Text)

    /* Find all markers in each text node */
    for (let text of nodes) {
      let match: RegExpExecArray | null

      /* Split text at marker and add to list */
      while ((match = /(\(\d+\))(!)?/.exec(text.textContent!))) {
        const [, id, force] = match
        if (typeof force === "undefined") {
          const marker = text.splitText(match.index)
          text = marker.splitText(id.length)
          markers.push(marker)

        /* Replace entire text with marker */
        } else {
          text.textContent = id
          markers.push(text)
          break
        }
      }
    }
  }
  return markers
}

/**
 * Swap the child nodes of two elements
 *
 * @param source - Source element
 * @param target - Target element
 */
function swap(source: HTMLElement, target: HTMLElement): void {
  target.append(...Array.from(source.childNodes))
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount annotation list
 *
 * This function analyzes the containing code block and checks for markers
 * referring to elements in the given annotation list. If no markers are found,
 * the list is left untouched. Otherwise, list elements are rendered as
 * annotations inside the code block.
 *
 * @param el - Annotation list element
 * @param container - Containing element
 * @param options - Options
 *
 * @returns Annotation component observable
 */
export function mountAnnotationList(
  el: HTMLElement, container: HTMLElement, { target$, print$ }: MountOptions
): Observable<Component<Annotation>> {

  /* Compute prefix for tooltip anchors */
  const parent = container.closest("[id]")
  const prefix = parent?.id

  /* Find and replace all markers with empty annotations */
  const annotations = new Map<string, HTMLElement>()
  for (const marker of findMarkers(container)) {
    const [, id] = marker.textContent!.match(/\((\d+)\)/)!
    if (getOptionalElement(`:scope > li:nth-child(${id})`, el)) {
      annotations.set(id, renderAnnotation(id, prefix))
      marker.replaceWith(annotations.get(id)!)
    }
  }

  /* Keep list if there are no annotations to render */
  if (annotations.size === 0)
    return EMPTY

  /* Mount component on subscription */
  return defer(() => {
    const push$ = new Subject()
    const done$ = push$.pipe(ignoreElements(), endWith(true))

    /* Retrieve container pairs for swapping */
    const pairs: [HTMLElement, HTMLElement][] = []
    for (const [id, annotation] of annotations)
      pairs.push([
        getElement(".md-typeset", annotation),
        getElement(`:scope > li:nth-child(${id})`, el)
      ])

    /* Handle print mode - see https://bit.ly/3rgPdpt */
    print$.pipe(takeUntil(done$))
      .subscribe(active => {
        el.hidden = !active

        /* Add class to discern list element */
        el.classList.toggle("md-annotation-list", active)

        /* Show annotations in code block or list (print) */
        for (const [inner, child] of pairs)
          if (!active)
            swap(child, inner)
          else
            swap(inner, child)
      })

    /* Create and return component */
    return merge(...[...annotations]
      .map(([, annotation]) => (
        mountAnnotation(annotation, container, { target$ })
      ))
    )
      .pipe(
        finalize(() => push$.complete()),
        share()
      )
  })
}
