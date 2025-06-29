"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchSidebar = watchSidebar;
exports.mountSidebar = mountSidebar;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch sidebar
 *
 * This function returns an observable that computes the visual parameters of
 * the sidebar which depends on the vertical viewport offset, as well as the
 * height of the main area. When the page is scrolled beyond the header, the
 * sidebar is locked and fills the remaining space.
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @returns Sidebar observable
 */
function watchSidebar(el, { viewport$, main$ }) {
    const parent = el.closest(".md-grid");
    const adjust = parent.offsetTop -
        parent.parentElement.offsetTop;
    /* Compute the sidebar's available height and if it should be locked */
    return (0, rxjs_1.combineLatest)([main$, viewport$])
        .pipe((0, rxjs_1.map)(([{ offset, height }, { offset: { y } }]) => {
        height = height
            + Math.min(adjust, Math.max(0, y - offset))
            - adjust;
        return {
            height,
            locked: y >= offset + adjust
        };
    }), (0, rxjs_1.distinctUntilChanged)((a, b) => (a.height === b.height &&
        a.locked === b.locked)));
}
/**
 * Mount sidebar
 *
 * This function doesn't set the height of the actual sidebar, but of its first
 * child – the `.md-sidebar__scrollwrap` element in order to mitigiate jittery
 * sidebars when the footer is scrolled into view. At some point we switched
 * from `absolute` / `fixed` positioning to `sticky` positioning, significantly
 * reducing jitter in some browsers (respectively Firefox and Safari) when
 * scrolling from the top. However, top-aligned sticky positioning means that
 * the sidebar snaps to the bottom when the end of the container is reached.
 * This is what leads to the mentioned jitter, as the sidebar's height may be
 * updated too slowly.
 *
 * This behaviour can be mitigiated by setting the height of the sidebar to `0`
 * while preserving the padding, and the height on its first element.
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @returns Sidebar component observable
 */
function mountSidebar(el, { header$, ...options }) {
    const inner = (0, browser_1.getElement)(".md-sidebar__scrollwrap", el);
    const { y } = (0, browser_1.getElementOffset)(inner);
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        const done$ = push$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(true));
        const next$ = push$
            .pipe((0, rxjs_1.auditTime)(0, rxjs_1.animationFrameScheduler));
        /* Update sidebar height and offset */
        next$.pipe((0, rxjs_1.withLatestFrom)(header$))
            .subscribe({
            /* Handle emission */
            next([{ height }, { height: offset }]) {
                inner.style.height = `${height - 2 * y}px`;
                el.style.top = `${offset}px`;
            },
            /* Handle complete */
            complete() {
                inner.style.height = "";
                el.style.top = "";
            }
        });
        /* Bring active item into view on initial load */
        next$.pipe((0, rxjs_1.first)())
            .subscribe(() => {
            for (const item of (0, browser_1.getElements)(".md-nav__link--active[href]", el)) {
                if (!item.clientHeight) // skip invisible toc in left sidebar
                    continue;
                const container = item.closest(".md-sidebar__scrollwrap");
                if (typeof container !== "undefined") {
                    const offset = item.offsetTop - container.offsetTop;
                    const { height } = (0, browser_1.getElementSize)(container);
                    container.scrollTo({
                        top: offset - height / 2
                    });
                }
            }
        });
        /* Handle accessibility for expandable items, see https://bit.ly/3jaod9p */
        (0, rxjs_1.from)((0, browser_1.getElements)("label[tabindex]", el))
            .pipe((0, rxjs_1.mergeMap)(label => (0, rxjs_1.fromEvent)(label, "click")
            .pipe((0, rxjs_1.observeOn)(rxjs_1.asyncScheduler), (0, rxjs_1.map)(() => label), (0, rxjs_1.takeUntil)(done$))))
            .subscribe(label => {
            const input = (0, browser_1.getElement)(`[id="${label.htmlFor}"]`);
            const nav = (0, browser_1.getElement)(`[aria-labelledby="${label.id}"]`);
            nav.setAttribute("aria-expanded", `${input.checked}`);
        });
        /* Create and return component */
        return watchSidebar(el, options)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map