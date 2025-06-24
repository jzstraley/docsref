"use strict";
/*
 * Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
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