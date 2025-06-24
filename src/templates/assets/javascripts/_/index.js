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
exports.configuration = configuration;
exports.feature = feature;
exports.translation = translation;
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Retrieve global configuration and make base URL absolute
 */
const script = (0, browser_1.getElement)("#__config");
const config = JSON.parse(script.textContent);
config.base = `${new URL(config.base, (0, browser_1.getLocation)())}`;
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve global configuration
 *
 * @returns Global configuration
 */
function configuration() {
    return config;
}
/**
 * Check whether a feature flag is enabled
 *
 * @param flag - Feature flag
 *
 * @returns Test result
 */
function feature(flag) {
    return config.features.includes(flag);
}
/**
 * Retrieve the translation for the given key
 *
 * @param key - Key to be translated
 * @param value - Positional value, if any
 *
 * @returns Translation
 */
function translation(key, value) {
    return typeof value !== "undefined"
        ? config.translations[key].replace("#", value.toString())
        : config.translations[key];
}
//# sourceMappingURL=index.js.map