"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToggle = getToggle;
exports.setToggle = setToggle;
exports.watchToggle = watchToggle;
const rxjs_1 = require("rxjs");
const element_1 = require("../element");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Toggle map
 */
const toggles = {
    drawer: (0, element_1.getElement)("[data-md-toggle=drawer]"),
    search: (0, element_1.getElement)("[data-md-toggle=search]")
};
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve the value of a toggle
 *
 * @param name - Toggle
 *
 * @returns Toggle value
 */
function getToggle(name) {
    return toggles[name].checked;
}
/**
 * Set toggle
 *
 * Simulating a click event seems to be the most cross-browser compatible way
 * of changing the value while also emitting a `change` event. Before, Material
 * used `CustomEvent` to programmatically change the value of a toggle, but this
 * is a much simpler and cleaner solution which doesn't require a polyfill.
 *
 * @param name - Toggle
 * @param value - Toggle value
 */
function setToggle(name, value) {
    if (toggles[name].checked !== value)
        toggles[name].click();
}
/* ------------------------------------------------------------------------- */
/**
 * Watch toggle
 *
 * @param name - Toggle
 *
 * @returns Toggle value observable
 */
function watchToggle(name) {
    const el = toggles[name];
    return (0, rxjs_1.fromEvent)(el, "change")
        .pipe((0, rxjs_1.map)(() => el.checked), (0, rxjs_1.startWith)(el.checked));
}
//# sourceMappingURL=index.js.map