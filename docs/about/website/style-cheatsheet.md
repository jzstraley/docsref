---
title: Style Cheatsheet
author: J. Austin Straley, DO
date: 2024-04-29
---


## Basic

<!-- https://squidfunk.github.io/mkdocs-material/reference/formatting/ -->

- ==This was marked (highlight)==
- ^^This was inserted (underline) with caret^^
- <ins>This was also underlined, using < ins > </ins>
- ~~This was deleted (strikethrough)~~
- Examples of super/subscripting
    - H~2~O using tilde
    - A^T^A using caret
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Example of Indent using & nbsp;

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

<!-- md:option 
https://github.com/squidfunk/mkdocs-material/blob/master/docs/reference/admonitions.md
type:note -->

<!-- md:option type:note -->
:   !!! note

        This is a quote.

<!-- md:option type:abstract -->
:   !!! abstract

        This is a quote.

:   !!! info

        This is a quote.

:   !!! tip

        This is a quote.

:   !!! success

        This is a quote. 

:   !!! question

        This is a quote.

:   !!! warning

        This is a quote.

:   !!! failure

        This is a quote.

:   !!! danger

        This is a quote. 

:   !!! bug

        This is a quote.

:   !!! example

        This is a quote.

:   !!! quote

        This is a quote.

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

## Grids (Not working)

<div class="result" markdown>
<div class="grid cards" markdown>

- :material-clock-fast __Set up in 5 minutes__

    ---
    Install [`mkdocs-material`][mkdocs-material] with [`pip`][pip] and get up and running in minutes
    [:octicons-arrow-right-24][getting started]

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

## Creating Definitions

`Example`

:   This is a definition of the example.

## Colored Text

<button class="color:red"><code>Red Not working</code></button>

## Coded Text

<pre><code>Hi</code></pre>

## Coded/Styled Text

``` markdown title="Subscribe"

[Subscribe](#)

```

## Nested Notes

???+ note "Open styled details"

    ??? danger "Closed nested details!"
        And more content again.

??? success "Success"
   And more content again.
