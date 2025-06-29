"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("focus-visible");
const rxjs_1 = require("rxjs");
const _1 = require("./_");
const browser_1 = require("./browser");
const components_1 = require("./components");
const integrations_1 = require("./integrations");
const patches_1 = require("./patches");
require("./polyfills");
/* ----------------------------------------------------------------------------
 * Functions - @todo refactor
 * ------------------------------------------------------------------------- */
/**
 * Fetch search index
 *
 * @returns Search index observable
 */
function fetchSearchIndex() {
    if (location.protocol === "file:") {
        return (0, browser_1.watchScript)(`${new URL("search/search_index.js", config.base)}`)
            .pipe(
        // @ts-ignore - @todo fix typings
        (0, rxjs_1.map)(() => __index), (0, rxjs_1.shareReplay)(1));
    }
    else {
        return (0, browser_1.requestJSON)(new URL("search/search_index.json", config.base));
    }
}
/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */
/* Yay, JavaScript is available */
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");
/* Set up navigation observables and subjects */
const document$ = (0, browser_1.watchDocument)();
const location$ = (0, browser_1.watchLocation)();
const target$ = (0, browser_1.watchLocationTarget)(location$);
const keyboard$ = (0, browser_1.watchKeyboard)();
/* Set up media observables */
const viewport$ = (0, browser_1.watchViewport)();
const tablet$ = (0, browser_1.watchMedia)("(min-width: 960px)");
const screen$ = (0, browser_1.watchMedia)("(min-width: 1220px)");
const print$ = (0, browser_1.watchPrint)();
/* Retrieve search index, if search is enabled */
const config = (0, _1.configuration)();
const index$ = document.forms.namedItem("search")
    ? fetchSearchIndex()
    : rxjs_1.NEVER;
/* Set up Clipboard.js integration */
const alert$ = new rxjs_1.Subject();
(0, integrations_1.setupClipboardJS)({ alert$ });
/* Set up progress indicator */
const progress$ = new rxjs_1.Subject();
/* Set up instant navigation, if enabled */
if ((0, _1.feature)("navigation.instant"))
    (0, integrations_1.setupInstantNavigation)({ location$, viewport$, progress$ })
        .subscribe(document$);
/* Set up version selector */
if (((_a = config.version) === null || _a === void 0 ? void 0 : _a.provider) === "mike")
    (0, integrations_1.setupVersionSelector)({ document$ });
/* Always close drawer and search on navigation */
(0, rxjs_1.merge)(location$, target$)
    .pipe((0, rxjs_1.delay)(125))
    .subscribe(() => {
    (0, browser_1.setToggle)("drawer", false);
    (0, browser_1.setToggle)("search", false);
});
/* Set up global keyboard handlers */
keyboard$
    .pipe((0, rxjs_1.filter)(({ mode }) => mode === "global"))
    .subscribe(key => {
    switch (key.type) {
        /* Go to previous page */
        case "p":
        case ",":
            const prev = (0, browser_1.getOptionalElement)("link[rel=prev]");
            if (typeof prev !== "undefined")
                (0, browser_1.setLocation)(prev);
            break;
        /* Go to next page */
        case "n":
        case ".":
            const next = (0, browser_1.getOptionalElement)("link[rel=next]");
            if (typeof next !== "undefined")
                (0, browser_1.setLocation)(next);
            break;
        /* Expand navigation, see https://bit.ly/3ZjG5io */
        case "Enter":
            const active = (0, browser_1.getActiveElement)();
            if (active instanceof HTMLLabelElement)
                active.click();
    }
});
/* Set up patches */
(0, patches_1.patchEllipsis)({ viewport$, document$ });
(0, patches_1.patchIndeterminate)({ document$, tablet$ });
(0, patches_1.patchScrollfix)({ document$ });
(0, patches_1.patchScrolllock)({ viewport$, tablet$ });
/* Set up header and main area observable */
const header$ = (0, components_1.watchHeader)((0, components_1.getComponentElement)("header"), { viewport$ });
const main$ = document$
    .pipe((0, rxjs_1.map)(() => (0, components_1.getComponentElement)("main")), (0, rxjs_1.switchMap)(el => (0, components_1.watchMain)(el, { viewport$, header$ })), (0, rxjs_1.shareReplay)(1));
/* Set up control component observables */
const control$ = (0, rxjs_1.merge)(
/* Consent */
...(0, components_1.getComponentElements)("consent")
    .map(el => (0, components_1.mountConsent)(el, { target$ })), 
/* Dialog */
...(0, components_1.getComponentElements)("dialog")
    .map(el => (0, components_1.mountDialog)(el, { alert$ })), 
/* Color palette */
...(0, components_1.getComponentElements)("palette")
    .map(el => (0, components_1.mountPalette)(el)), 
/* Progress bar */
...(0, components_1.getComponentElements)("progress")
    .map(el => (0, components_1.mountProgress)(el, { progress$ })), 
/* Search */
...(0, components_1.getComponentElements)("search")
    .map(el => (0, components_1.mountSearch)(el, { index$, keyboard$ })), 
/* Repository information */
...(0, components_1.getComponentElements)("source")
    .map(el => (0, components_1.mountSource)(el)));
/* Set up content component observables */
const content$ = (0, rxjs_1.defer)(() => (0, rxjs_1.merge)(
/* Announcement bar */
...(0, components_1.getComponentElements)("announce")
    .map(el => (0, components_1.mountAnnounce)(el)), 
/* Content */
...(0, components_1.getComponentElements)("content")
    .map(el => (0, components_1.mountContent)(el, { viewport$, target$, print$ })), 
/* Search highlighting */
...(0, components_1.getComponentElements)("content")
    .map(el => (0, _1.feature)("search.highlight")
    ? (0, components_1.mountSearchHiglight)(el, { index$, location$ })
    : rxjs_1.EMPTY), 
/* Header */
...(0, components_1.getComponentElements)("header")
    .map(el => (0, components_1.mountHeader)(el, { viewport$, header$, main$ })), 
/* Header title */
...(0, components_1.getComponentElements)("header-title")
    .map(el => (0, components_1.mountHeaderTitle)(el, { viewport$, header$ })), 
/* Sidebar */
...(0, components_1.getComponentElements)("sidebar")
    .map(el => el.getAttribute("data-md-type") === "navigation"
    ? (0, browser_1.at)(screen$, () => (0, components_1.mountSidebar)(el, { viewport$, header$, main$ }))
    : (0, browser_1.at)(tablet$, () => (0, components_1.mountSidebar)(el, { viewport$, header$, main$ }))), 
/* Navigation tabs */
...(0, components_1.getComponentElements)("tabs")
    .map(el => (0, components_1.mountTabs)(el, { viewport$, header$ })), 
/* Table of contents */
...(0, components_1.getComponentElements)("toc")
    .map(el => (0, components_1.mountTableOfContents)(el, {
    viewport$, header$, main$, target$
})), 
/* Back-to-top button */
...(0, components_1.getComponentElements)("top")
    .map(el => (0, components_1.mountBackToTop)(el, { viewport$, header$, main$, target$ }))));
/* Set up component observables */
const component$ = document$
    .pipe((0, rxjs_1.switchMap)(() => content$), (0, rxjs_1.mergeWith)(control$), (0, rxjs_1.shareReplay)(1));
/* Subscribe to all components */
component$.subscribe();
/* ----------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------- */
window.document$ = document$; /* Document observable */
window.location$ = location$; /* Location subject */
window.target$ = target$; /* Location target observable */
window.keyboard$ = keyboard$; /* Keyboard observable */
window.viewport$ = viewport$; /* Viewport observable */
window.tablet$ = tablet$; /* Media tablet observable */
window.screen$ = screen$; /* Media screen observable */
window.print$ = print$; /* Media print observable */
window.alert$ = alert$; /* Alert subject */
window.progress$ = progress$; /* Progress indicator subject */
window.component$ = component$; /* Component observable */
//# sourceMappingURL=bundle.js.map