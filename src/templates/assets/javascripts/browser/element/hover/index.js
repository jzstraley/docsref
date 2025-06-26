"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchElementHover = watchElementHover;
const rxjs_1 = require("rxjs");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch element hover
 *
 * The second parameter allows to specify a timeout in milliseconds after which
 * the hover state will be reset to `false`. This is useful for tooltips which
 * should disappear after a certain amount of time, in order to allow the user
 * to move the cursor from the host to the tooltip.
 *
 * @param el - Element
 * @param timeout - Timeout
 *
 * @returns Element hover observable
 */
function watchElementHover(el, timeout) {
    return (0, rxjs_1.defer)(() => (0, rxjs_1.merge)((0, rxjs_1.fromEvent)(el, "mouseenter").pipe((0, rxjs_1.map)(() => true)), (0, rxjs_1.fromEvent)(el, "mouseleave").pipe((0, rxjs_1.map)(() => false)))
        .pipe(timeout ? (0, rxjs_1.debounce)(active => (0, rxjs_1.timer)(+!active * timeout)) : rxjs_1.identity, (0, rxjs_1.startWith)(el.matches(":hover"))));
}
//# sourceMappingURL=index.js.map