"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = tokenize;
const _1 = require("../_");
const extract_1 = require("../extract");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Split a string or set of strings into tokens
 *
 * This tokenizer supersedes the default tokenizer that is provided by Lunr.js,
 * as it is aware of HTML tags and allows for multi-character splitting.
 *
 * It takes the given inputs, splits each of them into markup and text sections,
 * tokenizes and segments (if necessary) each of them, and then indexes them in
 * a table by using a compact bit representation. Bitwise techniques are used
 * to write and read from the table during indexing and querying.
 *
 * @see https://bit.ly/3W3Xw4J - Search: better, faster, smaller
 *
 * @param input - Input value(s)
 *
 * @returns Tokens
 */
function tokenize(input) {
    const tokens = [];
    if (typeof input === "undefined")
        return tokens;
    /* Tokenize strings one after another */
    const inputs = Array.isArray(input) ? input : [input];
    for (let i = 0; i < inputs.length; i++) {
        const table = lunr.tokenizer.table;
        const total = table.length;
        /* Split string into sections and tokenize content blocks */
        (0, extract_1.extract)(inputs[i], (block, type, start, end) => {
            var _a;
            table[_a = block += total] || (table[_a] = []);
            switch (type) {
                /* Handle markup */
                case 0 /* Extract.TAG_OPEN */:
                case 2 /* Extract.TAG_CLOSE */:
                    table[block].push(start << 12 |
                        end - start << 2 |
                        type);
                    break;
                /* Handle text content */
                case 1 /* Extract.TEXT */:
                    const section = inputs[i].slice(start, end);
                    (0, _1.split)(section, lunr.tokenizer.separator, (index, until) => {
                        /**
                         * Apply segmenter after tokenization. Note that the segmenter will
                         * also split words at word boundaries, which is not what we want,
                         * so we need to check if we can somehow mitigate this behavior.
                         */
                        if (typeof lunr.segmenter !== "undefined") {
                            const subsection = section.slice(index, until);
                            if (/^[MHIK]$/.test(lunr.segmenter.ctype_(subsection))) {
                                const segments = lunr.segmenter.segment(subsection);
                                for (let s = 0, l = 0; s < segments.length; s++) {
                                    /* Add block to section */
                                    table[block] || (table[block] = []);
                                    table[block].push(start + index + l << 12 |
                                        segments[s].length << 2 |
                                        type);
                                    /* Add token with position */
                                    tokens.push(new lunr.Token(segments[s].toLowerCase(), {
                                        position: block << 20 | table[block].length - 1
                                    }));
                                    /* Keep track of length */
                                    l += segments[s].length;
                                }
                                return;
                            }
                        }
                        /* Add block to section */
                        table[block].push(start + index << 12 |
                            until - index << 2 |
                            type);
                        /* Add token with position */
                        tokens.push(new lunr.Token(section.slice(index, until).toLowerCase(), {
                            position: block << 20 | table[block].length - 1
                        }));
                    });
            }
        });
    }
    /* Return tokens */
    return tokens;
}
//# sourceMappingURL=index.js.map