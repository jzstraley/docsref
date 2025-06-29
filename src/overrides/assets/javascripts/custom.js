"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const components_1 = require("./components");
const integrations_1 = require("./integrations");
/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */
/* Set up extra analytics events */
(0, integrations_1.setupAnalytics)();
/* Set up extra component observables */
const component$ = document$
    .pipe((0, rxjs_1.switchMap)(() => (0, rxjs_1.merge)(
/* Icon search */
...(0, components_1.getComponentElements)("iconsearch")
    .map(el => (0, components_1.mountIconSearch)(el)), 
/* Sponsorship */
...(0, components_1.getComponentElements)("sponsorship")
    .map(el => (0, components_1.mountSponsorship)(el)))));
/* Subscribe to all components */
component$.subscribe();
//# sourceMappingURL=custom.js.map