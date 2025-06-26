"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.watchAnnotation = watchAnnotation;
exports.mountAnnotation = mountAnnotation;
const rxjs_1 = require("rxjs");
const browser_1 = require("~/browser");
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch annotation
 *
 * @param el - Annotation element
 * @param container - Containing element
 *
 * @returns Annotation observable
 */
function watchAnnotation(el, container) {
    const offset$ = (0, rxjs_1.defer)(() => (0, rxjs_1.combineLatest)([
        (0, browser_1.watchElementOffset)(el),
        (0, browser_1.watchElementContentOffset)(container)
    ]))
        .pipe((0, rxjs_1.map)(([{ x, y }, scroll]) => {
        const { width, height } = (0, browser_1.getElementSize)(el);
        return ({
            x: x - scroll.x + width / 2,
            y: y - scroll.y + height / 2
        });
    }));
    /* Actively watch annotation on focus */
    return (0, browser_1.watchElementFocus)(el)
        .pipe((0, rxjs_1.switchMap)(active => offset$
        .pipe((0, rxjs_1.map)(offset => ({ active, offset })), (0, rxjs_1.take)(+!active || Infinity))));
}
/**
 * Mount annotation
 *
 * @param el - Annotation element
 * @param container - Containing element
 * @param options - Options
 *
 * @returns Annotation component observable
 */
function mountAnnotation(el, container, { target$ }) {
    const [tooltip, index] = Array.from(el.children);
    /* Mount component on subscription */
    return (0, rxjs_1.defer)(() => {
        const push$ = new rxjs_1.Subject();
        const done$ = push$.pipe((0, rxjs_1.ignoreElements)(), (0, rxjs_1.endWith)(true));
        push$.subscribe({
            /* Handle emission */
            next({ offset }) {
                el.style.setProperty("--md-tooltip-x", `${offset.x}px`);
                el.style.setProperty("--md-tooltip-y", `${offset.y}px`);
            },
            /* Handle complete */
            complete() {
                el.style.removeProperty("--md-tooltip-x");
                el.style.removeProperty("--md-tooltip-y");
            }
        });
        /* Start animation only when annotation is visible */
        (0, browser_1.watchElementVisibility)(el)
            .pipe((0, rxjs_1.takeUntil)(done$))
            .subscribe(visible => {
            el.toggleAttribute("data-md-visible", visible);
        });
        /* Toggle tooltip presence to mitigate empty lines when copying */
        (0, rxjs_1.merge)(push$.pipe((0, rxjs_1.filter)(({ active }) => active)), push$.pipe((0, rxjs_1.debounceTime)(250), (0, rxjs_1.filter)(({ active }) => !active)))
            .subscribe({
            /* Handle emission */
            next({ active }) {
                if (active)
                    el.prepend(tooltip);
                else
                    tooltip.remove();
            },
            /* Handle complete */
            complete() {
                el.prepend(tooltip);
            }
        });
        /* Toggle tooltip visibility */
        push$
            .pipe((0, rxjs_1.auditTime)(16, rxjs_1.animationFrameScheduler))
            .subscribe(({ active }) => {
            tooltip.classList.toggle("md-tooltip--active", active);
        });
        /* Track relative origin of tooltip */
        push$
            .pipe((0, rxjs_1.throttleTime)(125, rxjs_1.animationFrameScheduler), (0, rxjs_1.filter)(() => !!el.offsetParent), (0, rxjs_1.map)(() => el.offsetParent.getBoundingClientRect()), (0, rxjs_1.map)(({ x }) => x))
            .subscribe({
            /* Handle emission */
            next(origin) {
                if (origin)
                    el.style.setProperty("--md-tooltip-0", `${-origin}px`);
                else
                    el.style.removeProperty("--md-tooltip-0");
            },
            /* Handle complete */
            complete() {
                el.style.removeProperty("--md-tooltip-0");
            }
        });
        /* Allow to copy link without scrolling to anchor */
        (0, rxjs_1.fromEvent)(index, "click")
            .pipe((0, rxjs_1.takeUntil)(done$), (0, rxjs_1.filter)(ev => !(ev.metaKey || ev.ctrlKey)))
            .subscribe(ev => {
            ev.stopPropagation();
            ev.preventDefault();
        });
        /* Allow to open link in new tab or blur on close */
        (0, rxjs_1.fromEvent)(index, "mousedown")
            .pipe((0, rxjs_1.takeUntil)(done$), (0, rxjs_1.withLatestFrom)(push$))
            .subscribe(([ev, { active }]) => {
            var _a;
            /* Open in new tab */
            if (ev.button !== 0 || ev.metaKey || ev.ctrlKey) {
                ev.preventDefault();
                /* Close annotation */
            }
            else if (active) {
                ev.preventDefault();
                /* Focus parent annotation, if any */
                const parent = el.parentElement.closest(".md-annotation");
                if (parent instanceof HTMLElement)
                    parent.focus();
                else
                    (_a = (0, browser_1.getActiveElement)()) === null || _a === void 0 ? void 0 : _a.blur();
            }
        });
        /* Open and focus annotation on location target */
        target$
            .pipe((0, rxjs_1.takeUntil)(done$), (0, rxjs_1.filter)(target => target === tooltip), (0, rxjs_1.delay)(125))
            .subscribe(() => el.focus());
        /* Create and return component */
        return watchAnnotation(el, container)
            .pipe((0, rxjs_1.tap)(state => push$.next(state)), (0, rxjs_1.finalize)(() => push$.complete()), (0, rxjs_1.map)(state => ({ ref: el, ...state })));
    });
}
//# sourceMappingURL=index.js.map