import { createHash } from "crypto"
import { build as esbuild } from "esbuild"
import * as fs from "fs/promises"
import * as path from "path"
import postcss from "postcss"
import {
  EMPTY,
  Observable,
  catchError,
  concat,
  defer,
  endWith,
  ignoreElements,
  merge,
  of,
  switchMap
} from "rxjs"
import { compile } from "sass"

import { base, mkdir, write } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Transform options
 */
interface TransformOptions {
  from: string                         /* Source destination */
  to: string                           /* Target destination */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Base directory for source map resolution
 */
const root = new RegExp(`file://${path.resolve(".")}/`, "g")

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Compute a digest for cachebusting a file
 *
 * @param file - File
 * @param data - File data
 *
 * @returns File with digest
 */
function digest(file: string, data: string): string {
  if (process.argv.includes("--optimize")) {
    const hash = createHash("sha256").update(data).digest("hex")
    return file.replace(/\b(?=\.)/, `.${hash.slice(0, 8)}.min`)
  } else {
    return file
  }
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Transform a stylesheet
 *
 * @param options - Options
 *
 * @returns File observable
 */
export function transformStyle(
  options: TransformOptions
): Observable<string> {
  return defer(() => of(compile(options.from, {
    loadPaths: [
      "src/templates/assets/stylesheets",
      "node_modules/modularscale-sass/stylesheets",
      "node_modules/material-design-color",
      "node_modules/material-shadows"
    ],
    sourceMap: true
  })))
    .pipe(
      switchMap(({ css, sourceMap }) => postcss([
        require("autoprefixer"),
        require("postcss-logical"),
        require("postcss-dir-pseudo-class"),
        require("postcss-pseudo-is"),
        require("postcss-inline-svg")({
          paths: [
            `${base}/templates/.icons`
          ],
          encode: false
        }),
        ...(process.argv.includes("--optimize") ? [require("cssnano")] : [])
      ])
        .process(css, {
          from: options.from,
          to: options.to,
          map: {
            prev: sourceMap,
            inline: false
          }
        })
      ),
      catchError(err => {
        console.log(err.formatted || err.message)
        return EMPTY
      }),
      switchMap(({ css, map }) => {
        const file = digest(options.to, css)
        return concat(
          mkdir(path.dirname(file)),
          merge(
            write(`${file}.map`, `${map}`.replace(root, "")),
            write(`${file}`, css.replace(
              options.from,
              path.basename(file)
            )),
          )
        )
          .pipe(
            ignoreElements(),
            endWith(file)
          )
      })
    )
}

/**
 * Transform a script
 *
 * @param options - Options
 *
 * @returns File observable
 */
export function transformScript(
  options: TransformOptions
): Observable<string> {
  return defer(() => esbuild({
    entryPoints: [options.from],
    target: "es2015",
    write: false,
    bundle: true,
    sourcemap: true,
    legalComments: "inline",
    minify: process.argv.includes("--optimize"),
    plugins: [

      /* Plugin to minify inlined CSS (e.g. for Mermaid.js) */
      {
        name: "mkdocs-material/inline",
        setup(build) {
          build.onLoad({ filter: /\.css/ }, async args => {
            const content = await fs.readFile(args.path, "utf8")
            const { css } = await postcss([require("cssnano")])
              .process(content, {
                from: undefined
              })

            /* Return minified CSS */
            return {
              contents: css,
              loader: "text"
            }
          })
        }
      }
    ]
  }))
    .pipe(
      catchError(() => EMPTY),
      switchMap(({ outputFiles: [file] }) => {
        const contents = file.text.split("\n")
        const [, data] = contents[contents.length - 2].split(",")
        return of({
          js:  file.text,
          map: Buffer.from(data, "base64")
        })
      }),
      switchMap(({ js, map }) => {
        const file = digest(options.to, js)
        return concat(
          mkdir(path.dirname(file)),
          merge(
            write(`${file}.map`, `${map}`),
            write(`${file}`, js.replace(
              /(sourceMappingURL=)(.*)/,
              `$1${path.basename(file)}.map\n`
            )),
          )
        )
          .pipe(
            ignoreElements(),
            endWith(file)
          )
      })
    )
}
