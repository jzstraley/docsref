---
title: Style Cheatsheet
author: J. Austin Straley, DO
date: 2024-04-29
---


## Basic

<!-- md:option https://squidfunk.github.io/mkdocs-material/reference/formatting/ -->

- ==This was marked (highlight)==
- ^^This was inserted (underline)^^
- <ins>This was underlined</ins>
- ~~This was deleted (strikethrough)~~
- H~2~O
- A^T^A
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Indent

- Copyright (©) — &copy;
- Registered trademark (®) — &reg;
- Trademark (™) — &trade;
- Euro (€) — &euro;
- Left arrow (←) — &larr;
- Up arrow (↑) — &uarr;
- Right arrow (→) — &rarr;
- Down arrow (↓) — &darr;
- Degree (°) — &#176;
- Pi (π) — &#960;

## Notes

> :warning: **Warning:** Do not push the big red button.

> :memo: **Note:** Sunrises are beautiful.

> :bulb: **Tip:** Remember to appreciate the little things in life.

<!-- md:option 
https://github.com/squidfunk/mkdocs-material/blob/master/docs/reference/admonitions.md
type:note -->

:   !!! note

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:abstract -->

:   !!! abstract

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:info -->

:   !!! info

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:tip -->

:   !!! tip

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:success -->

:   !!! success

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:question -->

:   !!! question

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:warning -->

:   !!! warning

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:failure -->

:   !!! failure

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:danger -->

:   !!! danger

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:bug -->

:   !!! bug

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:example -->

:   !!! example

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

<!-- md:option type:quote -->

:   !!! quote

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
        euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
        purus auctor massa, nec semper lorem quam in massa.

## Mermaid

<!-- md: Mermaid 
https://squidfunk.github.io/mkdocs-material/reference/diagrams/
-->

``` mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```

## Grids

<div class="result" markdown>
<div class="grid cards" markdown>

- :material-clock-fast:{ .lg .middle } __Set up in 5 minutes__

    ---

    Install [`mkdocs-material`][mkdocs-material] with [`pip`][pip] and get up
    and running in minutes

    [:octicons-arrow-right-24: Getting started][getting started]

- :fontawesome-brands-markdown:{ .lg .middle } __It's just Markdown__

    ---

    Focus on your content and generate a responsive and searchable static site

    [:octicons-arrow-right-24: Reference][reference]

- :material-format-font:{ .lg .middle } __Made to measure__

    ---

    Change the colors, fonts, language, icons, logo and more with a few lines

    [:octicons-arrow-right-24: Customization][customization]

- :material-scale-balance:{ .lg .middle } __Open Source, MIT__

    ---

    Material for MkDocs is licensed under MIT and available on [GitHub]

    [:octicons-arrow-right-24: License][license]

</div>
</div>

  [mkdocs-material]: /about/contact.md
  [pip]: /about/contact.md
  [getting started]: /about/contact.md
  [reference]: /about/contact.md
  [customization]: /about/contact.md
  [license]: /about/contact.md
  [GitHub]: /about/contact.md

## Definition list

`Lorem ipsum dolor sit amet`

:   Sed sagittis eleifend rutrum. Donec vitae suscipit est. Nullam tempus
    tellus non sem sollicitudin, quis rutrum leo facilisis.

## Colored Text

<button data-md-color-primary="red"><code>red</code></button>
<button data-md-color-primary="blue"><code>blue</code></button>
<pre class="highlight"><code class="language-mylanguage">Hi</code></pre>

## Highlight

???+ note "Open styled details"

    ??? danger "Nested details!"
        And more content again.

??? success
   Content.

## Buttons

<div class="result" markdown>

[Subscribe to our newsletter][Demo]{ .md-button .md-button--primary }

</div>

<div class="result" markdown>

[Send :fontawesome-solid-paper-plane:][Demo]{ .md-button }

</div>

``` markdown title="Button"
[Subscribe to our newsletter](#){ .md-button }
```