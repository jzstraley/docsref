"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setupVersionSelector = setupVersionSelector;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
const components_1 = require("~/components");
const templates_1 = require("~/templates");
const sitemap_1 = require("../sitemap");
const findurl_1 = require("./findurl");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Set up version selector
 *
 * @param options - Options
 */
function setupVersionSelector({ document$ }) {
    const config = (0, _1.configuration)();
    const versions$ = (0, browser_1.requestJSON)(new URL("../versions.json", config.base))
        .pipe((0, rxjs_1.catchError)(() => rxjs_1.EMPTY) // @todo refactor instant loading
    );
    /* Determine current version */
    const current$ = versions$
        .pipe((0, rxjs_1.map)(versions => {
        const [, current] = config.base.match(/([^/]+)\/?$/);
        return versions.find(({ version, aliases }) => (version === current || aliases.includes(current))) || versions[0];
    }));
    /* Intercept inter-version navigation */
    versions$
        .pipe((0, rxjs_1.map)(versions => new Map(versions.map(version => [
        `${new URL(`../${version.version}/`, config.base)}`,
        version
    ]))), (0, rxjs_1.switchMap)(urls => (0, rxjs_1.fromEvent)(document.body, "click")
        .pipe((0, rxjs_1.filter)(ev => !ev.metaKey && !ev.ctrlKey), (0, rxjs_1.withLatestFrom)(current$), (0, rxjs_1.switchMap)(([ev, current]) => {
        if (ev.target instanceof Element) {
            const el = ev.target.closest("a");
            if (el && !el.target && urls.has(el.href)) {
                const url = el.href;
                // This is a temporary hack to detect if a version inside the
                // version selector or on another part of the site was clicked.
                // If we're inside the version selector, we definitely want to
                // find the same page, as we might have different deployments
                // due to aliases. However, if we're outside the version
                // selector, we must abort here, because we might otherwise
                // interfere with instant navigation. We need to refactor this
                // at some point together with instant navigation.
                //
                // See https://github.com/squidfunk/mkdocs-material/issues/4012
                if (!ev.target.closest(".md-version")) {
                    const version = urls.get(url);
                    if (version === current)
                        return rxjs_1.EMPTY;
                }
                ev.preventDefault();
                return (0, rxjs_1.of)(new URL(url));
            }
        }
        return rxjs_1.EMPTY;
    }), (0, rxjs_1.switchMap)(selectedVersionBaseURL => {
        return (0, sitemap_1.fetchSitemap)(selectedVersionBaseURL).pipe((0, rxjs_1.map)(sitemap => {
            var _a;
            return (_a = (0, findurl_1.selectedVersionCorrespondingURL)({
                selectedVersionSitemap: sitemap,
                selectedVersionBaseURL,
                currentLocation: (0, browser_1.getLocation)(),
                currentBaseURL: config.base
            })) !== null && _a !== void 0 ? _a : selectedVersionBaseURL;
        }));
    }))))
        .subscribe(url => (0, browser_1.setLocation)(url, true));
    /* Render version selector and warning */
    (0, rxjs_1.combineLatest)([versions$, current$])
        .subscribe(([versions, current]) => {
        const topic = (0, browser_1.getElement)(".md-header__topic");
        topic.appendChild((0, templates_1.renderVersionSelector)(versions, current));
    });
    /* Integrate outdated version banner with instant navigation */
    document$.pipe((0, rxjs_1.switchMap)(() => current$))
        .subscribe(current => {
        var _a;
        // Always scope outdate version banner to the base URL of the site
        const base = new URL(config.base);
        /* Check if version state was already determined */
        let outdated = __md_get("__outdated", sessionStorage, base);
        if (outdated === null) {
            outdated = true;
            /* Obtain and normalize default versions */
            let ignored = ((_a = config.version) === null || _a === void 0 ? void 0 : _a.default) || "latest";
            if (!Array.isArray(ignored))
                ignored = [ignored];
            /* Check if version is considered a default */
            main: for (const ignore of ignored)
                for (const version of current.aliases.concat(current.version))
                    if (new RegExp(ignore, "i").test(version)) {
                        outdated = false;
                        break main;
                    }
            /* Persist version state in session storage */
            __md_set("__outdated", outdated, sessionStorage, base);
        }
        /* Unhide outdated version banner */
        if (outdated)
            for (const warning of (0, components_1.getComponentElements)("outdated"))
                warning.hidden = false;
    });
}
//# sourceMappingURL=index.js.map