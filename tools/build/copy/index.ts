import * as fs from "fs/promises"
import * as path from "path"
import {
  Observable,
  from,
  map,
  mergeMap,
  switchMap
} from "rxjs"

import { mkdir, read, resolve, write } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

type CopyTransformFn = (data: string, name: string) => Promise<string>

interface CopyOptions {
  from: string
  to: string
  transform?: CopyTransformFn
  watch?: boolean
}

/* ----------------------------------------------------------------------------
 * Copy a single file
 * ------------------------------------------------------------------------- */

export function copy(
  { transform, ...options }: CopyOptions
): Observable<string> {
  return mkdir(path.dirname(options.to)).pipe(
    switchMap(() =>
      typeof transform === "undefined"
        ? from(fs.copyFile(options.from, options.to))
        : read(options.from).pipe(
            switchMap(data => transform(data, options.from)),
            switchMap(data => write(options.to, data))
          )
    ),
    map(() => options.to)
  )
}

/* ----------------------------------------------------------------------------
 * Copy all files matching a pattern
 * ------------------------------------------------------------------------- */

export function copyAll(
  pattern: string,
  options: CopyOptions
): Observable<string> {
  return resolve(pattern, { ...options, cwd: options.from }).pipe(
    mergeMap((file: string): Observable<string> =>
      copy({
        ...options,
        from: `${options.from}/${file}`,
        to: `${options.to}/${file.replace(/(\.{2}\/)+/, "")}`
      }),
      16 // max concurrency
    )
  )
}