"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = extract;
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Split a string into markup and text sections
 *
 * This function scans a string and divides it up into sections of markup and
 * text. For each section, it invokes the given visitor function with the block
 * index, extraction type, as well as start and end offsets. Using a visitor
 * function (= streaming data) is ideal for minimizing pressure on the GC.
 *
 * @param input - Input value
 * @param fn - Visitor function
 */
function extract(input, fn) {
    let block = 0; /* Current block */
    let start = 0; /* Current start offset */
    let end = 0; /* Current end offset */
    /* Split string into sections */
    for (let stack = 0; end < input.length; end++) {
        /* Opening tag after non-empty section */
        if (input.charAt(end) === "<" && end > start) {
            fn(block, 1 /* Extract.TEXT */, start, start = end);
            /* Closing tag */
        }
        else if (input.charAt(end) === ">") {
            if (input.charAt(start + 1) === "/") {
                if (--stack === 0)
                    fn(block++, 2 /* Extract.TAG_CLOSE */, start, end + 1);
                /* Tag is not self-closing */
            }
            else if (input.charAt(end - 1) !== "/") {
                if (stack++ === 0)
                    fn(block, 0 /* Extract.TAG_OPEN */, start, end + 1);
            }
            /* New section */
            start = end + 1;
        }
    }
    /* Add trailing section */
    if (end > start)
        fn(block, 1 /* Extract.TEXT */, start, end);
}
//# sourceMappingURL=index.js.map