

import { getElement, getLocation } from "~/browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Feature flag
 */
export type Flag =
  | "announce.dismiss"                 /* Dismissable announcement bar */
  | "content.code.annotate"            /* Code annotations */
  | "content.code.copy"                /* Code copy button */
  | "content.lazy"                     /* Lazy content elements */
  | "content.tabs.link"                /* Link content tabs */
  | "content.tooltips"                 /* Tooltips */
  | "header.autohide"                  /* Hide header */
  | "navigation.expand"                /* Automatic expansion */
  | "navigation.indexes"               /* Section pages */
  | "navigation.instant"               /* Instant navigation */
  | "navigation.instant.progress"      /* Instant navigation progress */
  | "navigation.sections"              /* Section navigation */
  | "navigation.tabs"                  /* Tabs navigation */
  | "navigation.tabs.sticky"           /* Tabs navigation (sticky) */
  | "navigation.top"                   /* Back-to-top button */
  | "navigation.tracking"              /* Anchor tracking */
  | "search.highlight"                 /* Search highlighting */
  | "search.share"                     /* Search sharing */
  | "search.suggest"                   /* Search suggestions */
  | "toc.follow"                       /* Following table of contents */
  | "toc.integrate"                    /* Integrated table of contents */

/* ------------------------------------------------------------------------- */

/**
 * Translation
 */
export type Translation =
  | "clipboard.copy"                   /* Copy to clipboard */
  | "clipboard.copied"                 /* Copied to clipboard */
  | "search.result.placeholder"        /* Type to start searching */
  | "search.result.none"               /* No matching documents */
  | "search.result.one"                /* 1 matching document */
  | "search.result.other"              /* # matching documents */
  | "search.result.more.one"           /* 1 more on this page */
  | "search.result.more.other"         /* # more on this page */
  | "search.result.term.missing"       /* Missing */
  | "select.version"                   /* Version selector */

/**
 * Translations
 */
export type Translations =
  Record<Translation, string>

/* ------------------------------------------------------------------------- */

/**
 * Versioning
 */
export interface Versioning {
  provider: "mike"                     /* Version provider */
  default?: string | string[]          /* Default version */
  alias?: boolean                      /* Show alias */
}

/**
 * Configuration
 */
export interface Config {
  base: string                         /* Base URL */
  features: Flag[]                     /* Feature flags */
  translations: Translations           /* Translations */
  search: string                       /* Search worker URL */
  tags?: Record<string, string>        /* Tags mapping */
  version?: Versioning                 /* Versioning */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Retrieve global configuration and make base URL absolute
 */
const script = getElement("#__config")
const config: Config = JSON.parse(script.textContent!)
config.base = `${new URL(config.base, getLocation())}`

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve global configuration
 *
 * @returns Global configuration
 */
export function configuration(): Config {
  return config
}

/**
 * Check whether a feature flag is enabled
 *
 * @param flag - Feature flag
 *
 * @returns Test result
 */
export function feature(flag: Flag): boolean {
  return config.features.includes(flag)
}

/**
 * Retrieve the translation for the given key
 *
 * @param key - Key to be translated
 * @param value - Positional value, if any
 *
 * @returns Translation
 */
export function translation(
  key: Translation, value?: string | number
): string {
  return typeof value !== "undefined"
    ? config.translations[key].replace("#", value.toString())
    : config.translations[key]
}
