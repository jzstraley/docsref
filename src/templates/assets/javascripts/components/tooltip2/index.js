"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchTooltip2 = watchTooltip2;
exports.mountTooltip2 = mountTooltip2;
exports.mountInlineTooltip2 = mountInlineTooltip2;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
const templates_1 = require("~/templates");
/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Global sequence number for tooltips
 */
let sequence = 0;
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch tooltip
 *
 * This function tracks the tooltip host element, and deduces the active state
 * and offset of the tooltip from it. The active state is determined by whether
 * the host element is focused or hovered, and the offset is determined by the
 * host element's absolute position in the document.
 *
 * @param el - Tooltip host element
 *
 * @returns Tooltip observable
 */
function watchTooltip2(el) {
    // Compute whether tooltip should be shown - we need to watch both focus and
    // hover events on the host element and emit if one of them is active. In case
    // of a hover event, we keep the element visible for a short amount of time
    // after the pointer left the host element for a better user experience.
    const active$ = (0, rxjs_1.combineLatest)([
        (0, browser_1.watchElementFocus)(el),
        (0, browser_1.watchElementHover)(el)
    ])
        .pipe((0, rxjs_1.map)(([focus, hover]) => focus || hover), (0, rxjs_1.distinctUntilChanged)());
    // We need to determine all parent elements of the host element that are
    // currently scrollable, as they might affect the position of the tooltip
    // depending on their horizontal of vertical offset. We must track all of
    // them and recompute the position of the tooltip if they change.
    const offset$ = (0, rxjs_1.defer)(() => (0, browser_1.getElementContainers)(el)).pipe((0, rxjs_1.mergeMap)(browser_1.watchElementContentOffset), (0, rxjs_1.throttleTime)(1), 
    // Note that we need to poll the value again if the active state changes,
    // as otherwise the tooltip might be misplaced. This particularly happens
    // when using third-party integrations like tablesort that change the
    // position of elements – see https://t.ly/Y-V7X
    (0, rxjs_1.combineLatestWith)(active$), (0, rxjs_1.map)(() => (0, browser_1.getElementOffsetAbsolute)(el)));
    // Only track parent elements and compute offset of the tooltip host if the
    // tooltip should be shown - we defer the computation of the offset until the
    // tooltip becomes active for the first time. This is necessary, because we
    // must also keep the tooltip active as long as it is focused or hovered.
    return active$.pipe((0, rxjs_1.first)(active => active), (0, rxjs_1.switchMap)(() => (0, rxjs_1.combineLatest)([active$, offset$])), (0, rxjs_1.map)(([active, offset]) => ({ active, offset })), (0, rxjs_1.share)());
}
/**
 * Mount tooltip
 *
 * This function renders a tooltip with the content from the provided `content$`
 * observable as passed via the dependencies. If the returned element has a role
 * of type `dialog`, the tooltip is considered to be interactive, and rendered
 * either above or below the host element, depending on the available space.
 *
 * If the returned element has a role of type `tooltip`, the tooltip is always
 * rendered below the host element and considered to be non-interactive. This
 * allows us to reuse the same positioning logic for both interactive and
 * non-interactive tooltips, as it is largely the same.
 *
 * @param el - Tooltip host element
 * @param dependencies - Dependencies
 *
 * @returns Tooltip component observable
 */
function mountTooltip2(el, dependencies) {
    const { content$, viewport$ } = dependencies;
    // Compute unique tooltip id - this is necessary to associate the tooltip host
    // element with the tooltip element for ARIA purposes
    const id = `__tooltip2_${sequence++}`;
    // Create component on subscription
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        // Create subject to track tooltip presence and visibility - we use another
        // purely internal subject to track the tooltip's presence and visibility,
        // as the tooltip should be visible if the host element or tooltip itself
        // is focused or hovered to allow for smooth pointer migration
        const show$ = new rxjs_1.BehaviorSubject(false);
        push$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(false))
            .subscribe(show$);
        // Create observable controlling tooltip element - we create and attach the
        // tooltip only if it is actually present, in order to keep the number of
        // elements low. We need to keep the tooltip visible for a short time after
        // the pointer left the host element or tooltip itself. For this, we use an
        // inner subscription to the tooltip observable, which we terminate when the
        // tooltip should not be shown, automatically removing the element. Moreover
        // we use the queue scheduler, which will schedule synchronously in case the
        // tooltip should be shown, and asynchronously if it should be hidden.
        const node$ = show$.pipe((0, rxjs_1.debounce)(active => (0, rxjs_1.timer)(+!active * 250, rxjs_1.queueScheduler)), (0, rxjs_1.distinctUntilChanged)(), (0, rxjs_1.switchMap)(active => active ? content$ : rxjs_1.EMPTY), (0, rxjs_1.tap)(node => node.id = id), (0, rxjs_1.share)());
        // Compute tooltip presence and visibility - the tooltip should be shown if
        // the host element or the tooltip itself is focused or hovered
        (0, rxjs_1.combineLatest)([
            push$.pipe((0, rxjs_1.map)(({ active }) => active)),
            node$.pipe((0, rxjs_1.switchMap)(node => (0, browser_1.watchElementHover)(node, 250)), (0, rxjs_1.startWith)(false))
        ])
            .pipe((0, rxjs_1.map)(states => states.some(active => active)))
            .subscribe(show$);
        // Compute tooltip origin - we need to compute the tooltip origin depending
        // on the position of the host element, the viewport size, as well as the
        // actual size of the tooltip, if positioned above. The tooltip must about
        // to be rendered for this to be correct, which is why we do it here.
        const origin$ = show$.pipe((0, rxjs_1.filter)(active => active), (0, rxjs_1.withLatestFrom)(node$, viewport$), (0, rxjs_1.map)(([_, node, { size }]) => {
            const host = el.getBoundingClientRect();
            const x = host.width / 2;
            // If the tooltip is non-interactive, we always render it below the
            // actual element because all operating systems do it that way
            if (node.role === "tooltip") {
                return { x, y: 8 + host.height };
                // Otherwise, we determine where there is more space, and render the
                // tooltip either above or below the host element
            }
            else if (host.y >= size.height / 2) {
                const { height } = (0, browser_1.getElementSize)(node);
                return { x, y: -16 - height };
            }
            else {
                return { x, y: +16 + host.height };
            }
        }));
        // Update tooltip position - we always need to update the position of the
        // tooltip, as it might change depending on the viewport offset of the host
        (0, rxjs_1.combineLatest)([node$, push$, origin$])
            .subscribe(([node, { offset }, origin]) => {
            node.style.setProperty("--md-tooltip-host-x", `${offset.x}px`);
            node.style.setProperty("--md-tooltip-host-y", `${offset.y}px`);
            // Update tooltip origin - this is mainly set to determine the position
            // of the tooltip tail, to show the direction it is originating from
            node.style.setProperty("--md-tooltip-x", `${origin.x}px`);
            node.style.setProperty("--md-tooltip-y", `${origin.y}px`);
            // Update tooltip render location, i.e., whether the tooltip is shown
            // above or below the host element, depending on the available space
            node.classList.toggle("md-tooltip2--top", origin.y < 0);
            node.classList.toggle("md-tooltip2--bottom", origin.y >= 0);
        });
        // Update tooltip width - we only explicitly set the width of the tooltip
        // if it is non-interactive, in case it should always be rendered centered
        show$.pipe((0, rxjs_1.filter)(active => active), (0, rxjs_1.withLatestFrom)(node$, (_, node) => node), (0, rxjs_1.filter)(node => node.role === "tooltip"))
            .subscribe(node => {
            const size = (0, browser_1.getElementSize)((0, browser_1.getElement)(":scope > *", node));
            // Set tooltip width and remove tail by setting it to a width of zero -
            // if authors want to keep the tail, we can move this to CSS later
            node.style.setProperty("--md-tooltip-width", `${size.width}px`);
            node.style.setProperty("--md-tooltip-tail", `${0}px`);
        });
        // Update tooltip visibility - we defer to the next animation frame, because
        // the tooltip must first be added to the document before we make it appear,
        // or it will appear instantly without delay. Additionally, we need to keep
        // the tooltip visible for a short time after the pointer left the host.
        show$.pipe((0, rxjs_1.distinctUntilChanged)(), (0, rxjs_1.observeOn)(rxjs_1.animationFrameScheduler), (0, rxjs_1.withLatestFrom)(node$))
            .subscribe(([active, node]) => {
            node.classList.toggle("md-tooltip2--active", active);
        });
        // Set up ARIA attributes when tooltip is visible
        (0, rxjs_1.combineLatest)([
            show$.pipe((0, rxjs_1.filter)(active => active)),
            node$
        ])
            .subscribe(([_, node]) => {
            if (node.role === "dialog") {
                el.setAttribute("aria-controls", id);
                el.setAttribute("aria-haspopup", "dialog");
            }
            else {
                el.setAttribute("aria-describedby", id);
            }
        });
        // Remove ARIA attributes when tooltip is hidden
        show$.pipe((0, rxjs_1.filter)(active => !active))
            .subscribe(() => {
            el.removeAttribute("aria-controls");
            el.removeAttribute("aria-describedby");
            el.removeAttribute("aria-haspopup");
        });
        // Create and return component
        return watchTooltip2(el)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
// ----------------------------------------------------------------------------
/**
 * Mount inline tooltip
 *
 * @todo refactor this function
 *
 * @param el - Tooltip host element
 * @param dependencies - Dependencies
 * @param container - Container
 *
 * @returns Tooltip component observable
 */
function mountInlineTooltip2(el, { viewport$ }, container = document.body) {
    return mountTooltip2(el, {
        content$: new rxjs_1.Observable(observer => {
            const title = el.title;
            const node = (0, templates_1.renderInlineTooltip2)(title);
            observer.next(node);
            el.removeAttribute("title");
            // Append tooltip and remove on unsubscription
            container.append(node);
            return () => {
                node.remove();
                el.setAttribute("title", title);
            };
        }),
        viewport$
    });
}
//# sourceMappingURL=index.js.map