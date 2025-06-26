

import lunr from "lunr"

/* ----------------------------------------------------------------------------
 * Global types
 * ------------------------------------------------------------------------- */

declare global {
  namespace lunr {

    /**
     * Indexed fields
     */
    type Fields = "text" | "title" | "tags"

    /**
     * Index - expose inverted index
     */
    interface Index {
      invertedIndex: Record<string, unknown>
      fields: Fields[]
    }

    /**
     * Improve typings of query builder
     */
    interface Builder {
      field(
        fieldName: string,
        attributes?: {
          boost?: number | undefined,
          extractor?: Function
        }): void;
    }

    /**
     * Query parser
     */
    class QueryParser {
      constructor(value: string, query: Query)
      public parse(): void
    }

    /**
     * Query clause - add missing field definitions
     */
    namespace Query {
      interface Clause {
        presence: Query.presence
      }
    }

    /**
     * Tokenizer
     */
    namespace tokenizer {
      let table: number[][]
    }

    /**
     * Segmenter
     */
    let segmenter: TinySegmenter | undefined

    /**
     * Lexeme type
     */
    const enum LexemeType {
      FIELD = "FIELD",
      TERM = "TERM",
      PRESENCE = "PRESENCE"
    }

    /**
     * Lexeme
     */
    interface Lexeme {
      type: LexemeType
      str: string
      start: number
      end: number
    }

    /**
     * Query lexer - add missing class definitions
     */
    class QueryLexer {

      /**
       * Create query lexer
       *
       * @param query - Query
       */
      constructor(query: string)

      /**
       * Query lexemes
       */
      public lexemes: Lexeme[]

      /**
       * Lex query
       */
      public run(): void
    }

    /**
     * Enable multi-language support
     *
     * @param lang - Languages
     *
     * @returns Plugin
     */
    function multiLanguage(...lang: string[]): Builder.Plugin

    /**
     * Stopword filter
     *
     * @template T - Token type
     *
     * @param token - Token or string
     *
     * @returns Token or nothing
     */
    function stopWordFilter<T>(token: T): T | undefined;

    /**
     * Segmenter for Japanese
     */
    class TinySegmenter {
      public ctype_(value: string): string
      public segment(value: string): string[]
    }
  }
}
