

import { h } from "~/utilities"

import { SponsorUser } from "_/components"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render public sponsor
 *
 * @param user - Sponsor user
 *
 * @returns Element
 */
export function renderPublicSponsor(
  user: SponsorUser
): HTMLElement {
  const title = `@${user.name}`
  return (
    <a href={user.url} title={title} class="mdx-sponsorship__item">
      <img src={user.image} alt={user.name}/>
    </a>
  )
}

/**
 * Render private sponsor
 *
 * @param count - Number of private sponsors
 *
 * @returns Element
 */
export function renderPrivateSponsor(
  count: number
): HTMLElement {
  return (
    <a
      href="https://github.com/sponsors/squidfunk?metadata_origin=docs"
      class="mdx-sponsorship__item mdx-sponsorship__item--private"
    >
      +{count}
    </a>
  )
}
