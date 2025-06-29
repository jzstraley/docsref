"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchTableOfContents = watchTableOfContents;
exports.mountTableOfContents = mountTableOfContents;
const rxjs_1 = require("rxjs");
const _1 = require("~/_");
const browser_1 = require("~/browser");
const _2 = require("../_");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch table of contents
 *
 * This is effectively a scroll spy implementation which will account for the
 * fixed header and automatically re-calculate anchor offsets when the viewport
 * is resized. The returned observable will only emit if the table of contents
 * needs to be repainted.
 *
 * This implementation tracks an anchor element's entire path starting from its
 * level up to the top-most anchor element, e.g. `[h3, h2, h1]`. Although the
 * Material theme currently doesn't make use of this information, it enables
 * the styling of the entire hierarchy through customization.
 *
 * Note that the current anchor is the last item of the `prev` anchor list.
 *
 * @param el - Table of contents element
 * @param options - Options
 *
 * @returns Table of contents observable
 */
function watchTableOfContents(el, { viewport$, header$ }) {
    const table = new Map();
    /* Compute anchor-to-target mapping */
    const anchors = (0, browser_1.getElements)(".md-nav__link", el);
    for (const anchor of anchors) {
        const id = decodeURIComponent(anchor.hash.substring(1));
        const target = (0, browser_1.getOptionalElement)(`[id="${id}"]`);
        if (typeof target !== "undefined")
            table.set(anchor, target);
    }
    /* Compute necessary adjustment for header */
    const adjust$ = header$
        .pipe((0, rxjs_1.distinctUntilKeyChanged)("height"), (0, rxjs_1.map)(({ height }) => {
        const main = (0, _2.getComponentElement)("main");
        const grid = (0, browser_1.getElement)(":scope > :first-child", main);
        return height + 0.8 * (grid.offsetTop -
            main.offsetTop);
    }), (0, rxjs_1.share)());
    /* Compute partition of previous and next anchors */
    const partition$ = (0, browser_1.watchElementSize)(document.body)
        .pipe((0, rxjs_1.distinctUntilKeyChanged)("height"), 
    /* Build index to map anchor paths to vertical offsets */
    (0, rxjs_1.switchMap)(body => (0, rxjs_1.defer)(() => {
        let path = [];
        return (0, rxjs_1.of)([...table].reduce((index, [anchor, target]) => {
            while (path.length) {
                const last = table.get(path[path.length - 1]);
                if (last.tagName >= target.tagName) {
                    path.pop();
                }
                else {
                    break;
                }
            }
            /* If the current anchor is hidden, continue with its parent */
            let offset = target.offsetTop;
            while (!offset && target.parentElement) {
                target = target.parentElement;
                offset = target.offsetTop;
            }
            /* Fix anchor offsets in tables - see https://bit.ly/3CUFOcn */
            let parent = target.offsetParent;
            for (; parent; parent = parent.offsetParent)
                offset += parent.offsetTop;
            /* Map reversed anchor path to vertical offset */
            return index.set([...path = [...path, anchor]].reverse(), offset);
        }, new Map()));
    })
        .pipe(
    /* Sort index by vertical offset (see https://bit.ly/30z6QSO) */
    (0, rxjs_1.map)(index => new Map([...index].sort(([, a], [, b]) => a - b))), (0, rxjs_1.combineLatestWith)(adjust$), 
    /* Re-compute partition when viewport offset changes */
    (0, rxjs_1.switchMap)(([index, adjust]) => viewport$
        .pipe((0, rxjs_1.scan)(([prev, next], { offset: { y }, size }) => {
        const last = y + size.height >= Math.floor(body.height);
        /* Look forward */
        while (next.length) {
            const [, offset] = next[0];
            if (offset - adjust < y || last) {
                prev = [...prev, next.shift()];
            }
            else {
                break;
            }
        }
        /* Look backward */
        while (prev.length) {
            const [, offset] = prev[prev.length - 1];
            if (offset - adjust >= y && !last) {
                next = [prev.pop(), ...next];
            }
            else {
                break;
            }
        }
        /* Return partition */
        return [prev, next];
    }, [[], [...index]]), (0, rxjs_1.distinctUntilChanged)((a, b) => (a[0] === b[0] &&
        a[1] === b[1])))))));
    /* Compute and return anchor list migrations */
    return partition$
        .pipe((0, rxjs_1.map)(([prev, next]) => ({
        prev: prev.map(([path]) => path),
        next: next.map(([path]) => path)
    })), 
    /* Extract anchor list migrations */
    (0, rxjs_1.startWith)({ prev: [], next: [] }), (0, rxjs_1.bufferCount)(2, 1), (0, rxjs_1.map)(([a, b]) => {
        /* Moving down */
        if (a.prev.length < b.prev.length) {
            return {
                prev: b.prev.slice(Math.max(0, a.prev.length - 1), b.prev.length),
                next: []
            };
            /* Moving up */
        }
        else {
            return {
                prev: b.prev.slice(-1),
                next: b.next.slice(0, b.next.length - a.next.length)
            };
        }
    }));
}
/* ------------------------------------------------------------------------- */
/**
 * Mount table of contents
 *
 * @param el - Table of contents element
 * @param options - Options
 *
 * @returns Table of contents component observable
 */
function mountTableOfContents(el, { viewport$, header$, main$, target$ }) {
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        const done$ = push$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(true));
        push$.subscribe(({ prev, next }) => {
            /* Look forward */
            for (const [anchor] of next) {
                anchor.classList.remove("md-nav__link--passed");
                anchor.classList.remove("md-nav__link--active");
            }
            /* Look backward */
            for (const [index, [anchor]] of prev.entries()) {
                anchor.classList.add("md-nav__link--passed");
                anchor.classList.toggle("md-nav__link--active", index === prev.length - 1);
            }
        });
        /* Set up following, if enabled */
        if ((0, _1.feature)("toc.follow")) {
            /* Toggle smooth scrolling only for anchor clicks */
            const smooth$ = (0, rxjs_1.merge)(viewport$.pipe((0, rxjs_1.debounceTime)(1), (0, rxjs_1.map)(() => undefined)), viewport$.pipe((0, rxjs_1.debounceTime)(250), (0, rxjs_1.map)(() => "smooth")));
            /* Bring active anchor into view */ // @todo: refactor
            push$
                .pipe((0, rxjs_1.filter)(({ prev }) => prev.length > 0), (0, rxjs_1.combineLatestWith)(main$.pipe((0, rxjs_1.observeOn)(rxjs_1.asyncScheduler))), (0, rxjs_1.withLatestFrom)(smooth$))
                .subscribe(([[{ prev }], behavior]) => {
                const [anchor] = prev[prev.length - 1];
                if (anchor.offsetHeight) {
                    /* Retrieve overflowing container and scroll */
                    const container = (0, browser_1.getElementContainer)(anchor);
                    if (typeof container !== "undefined") {
                        const offset = anchor.offsetTop - container.offsetTop;
                        const { height } = (0, browser_1.getElementSize)(container);
                        container.scrollTo({
                            top: offset - height / 2,
                            behavior
                        });
                    }
                }
            });
        }
        /* Set up anchor tracking, if enabled */
        if ((0, _1.feature)("navigation.tracking"))
            viewport$
                .pipe((0, rxjs_1.takeUntil)(done$), (0, rxjs_1.distinctUntilKeyChanged)("offset"), (0, rxjs_1.debounceTime)(250), (0, rxjs_1.skip)(1), (0, rxjs_1.takeUntil)(target$.pipe((0, rxjs_1.skip)(1))), (0, rxjs_1.repeat)({ delay: 250 }), (0, rxjs_1.withLatestFrom)(push$))
                .subscribe(([, { prev }]) => {
                const url = (0, browser_1.getLocation)();
                /* Set hash fragment to active anchor */
                const anchor = prev[prev.length - 1];
                if (anchor && anchor.length) {
                    const [active] = anchor;
                    const { hash } = new URL(active.href);
                    if (url.hash !== hash) {
                        url.hash = hash;
                        history.replaceState({}, "", `${url}`);
                    }
                    /* Reset anchor when at the top */
                }
                else {
                    url.hash = "";
                    history.replaceState({}, "", `${url}`);
                }
            });
        /* Create and return component */
        return watchTableOfContents(el, { viewport$, header$ })
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map