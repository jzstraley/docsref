"use strict";
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