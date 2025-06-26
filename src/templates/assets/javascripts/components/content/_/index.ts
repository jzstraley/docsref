

import { Observable, merge } from "rxjs"

import { feature } from "~/_"
import { Viewport, getElements } from "~/browser"

import { Component } from "../../_"
import {
  Tooltip,
  mountInlineTooltip2
} from "../../tooltip2"
import {
  Annotation,
  mountAnnotationBlock
} from "../annotation"
import {
  CodeBlock,
  mountCodeBlock
} from "../code"
import {
  Details,
  mountDetails
} from "../details"
import {
  Mermaid,
  mountMermaid
} from "../mermaid"
import {
  DataTable,
  mountDataTable
} from "../table"
import {
  ContentTabs,
  mountContentTabs
} from "../tabs"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Content
 */
export type Content =
  | Annotation
  | CodeBlock
  | ContentTabs
  | DataTable
  | Details
  | Mermaid
  | Tooltip

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  target$: Observable<HTMLElement>     /* Location target observable */
  print$: Observable<boolean>          /* Media print observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount content
 *
 * This function mounts all components that are found in the content of the
 * actual article, including code blocks, data tables and details.
 *
 * @param el - Content element
 * @param options - Options
 *
 * @returns Content component observable
 */
export function mountContent(
  el: HTMLElement, { viewport$, target$, print$ }: MountOptions
): Observable<Component<Content>> {
  return merge(

    /* Annotations */
    ...getElements(".annotate:not(.highlight)", el)
      .map(child => mountAnnotationBlock(child, { target$, print$ })),

    /* Code blocks */
    ...getElements("pre:not(.mermaid) > code", el)
      .map(child => mountCodeBlock(child, { target$, print$ })),

    /* Mermaid diagrams */
    ...getElements("pre.mermaid", el)
      .map(child => mountMermaid(child)),

    /* Data tables */
    ...getElements("table:not([class])", el)
      .map(child => mountDataTable(child)),

    /* Details */
    ...getElements("details", el)
      .map(child => mountDetails(child, { target$, print$ })),

    /* Content tabs */
    ...getElements("[data-tabs]", el)
      .map(child => mountContentTabs(child, { viewport$, target$ })),

    /* Tooltips */
    ...getElements("[title]", el)
      .filter(() => feature("content.tooltips"))
      .map(child => mountInlineTooltip2(child, { viewport$ }))
  )
}
