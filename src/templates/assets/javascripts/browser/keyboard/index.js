"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchComposition = watchComposition;
exports.watchKeyboard = watchKeyboard;
const rxjs_1 = require("rxjs");
const element_1 = require("../element");
const toggle_1 = require("../toggle");
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Check whether an element may receive keyboard input
 *
 * @param el - Element
 * @param type - Key type
 *
 * @returns Test result
 */
function isSusceptibleToKeyboard(el, type) {
    switch (el.constructor) {
        /* Input elements */
        case HTMLInputElement:
            /* @ts-expect-error - omit unnecessary type cast */
            if (el.type === "radio")
                return /^Arrow/.test(type);
            else
                return true;
        /* Select element and textarea */
        case HTMLSelectElement:
        case HTMLTextAreaElement:
            return true;
        /* Everything else */
        default:
            return el.isContentEditable;
    }
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch composition events
 *
 * @returns Composition observable
 */
function watchComposition() {
    return (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(window, "compositionstart").pipe((0, rxjs_1.map)(() => true)), (0, rxjs_1.fromEvent)(window, "compositionend").pipe((0, rxjs_1.map)(() => false)))
        .pipe((0, rxjs_1.startWith)(false));
}
/**
 * Watch keyboard
 *
 * @returns Keyboard observable
 */
function watchKeyboard() {
    const keyboard$ = (0, rxjs_1.fromEvent)(window, "keydown")
        .pipe((0, rxjs_1.filter)(ev => !(ev.metaKey || ev.ctrlKey)), (0, rxjs_1.map)(ev => ({
        mode: (0, toggle_1.getToggle)("search") ? "search" : "global",
        type: ev.key,
        claim() {
            ev.preventDefault();
            ev.stopPropagation();
        }
    })), (0, rxjs_1.filter)(({ mode, type }) => {
        if (mode === "global") {
            const active = (0, element_1.getActiveElement)();
            if (typeof active !== "undefined")
                return !isSusceptibleToKeyboard(active, type);
        }
        return true;
    }), (0, rxjs_1.share)());
    /* Don't emit during composition events - see https://bit.ly/3te3Wl8 */
    return watchComposition()
        .pipe((0, rxjs_1.switchMap)(active => !active ? keyboard$ : rxjs_1.EMPTY));
}
//# sourceMappingURL=index.js.map