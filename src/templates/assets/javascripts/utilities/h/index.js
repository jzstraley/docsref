"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.h = h;
/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Append a child node to an element
 *
 * @param el - Element
 * @param child - Child node(s)
 */
function appendChild(el, child) {
    /* Handle primitive types (including raw HTML) */
    if (typeof child === "string" || typeof child === "number") {
        el.innerHTML += child.toString();
        /* Handle nodes */
    }
    else if (child instanceof Node) {
        el.appendChild(child);
        /* Handle nested children */
    }
    else if (Array.isArray(child)) {
        for (const node of child)
            appendChild(el, node);
    }
}
function h(tag, attributes, ...children) {
    const el = document.createElement(tag);
    /* Set attributes, if any */
    if (attributes)
        for (const attr of Object.keys(attributes)) {
            if (typeof attributes[attr] === "undefined")
                continue;
            /* Set default attribute or boolean */
            if (typeof attributes[attr] !== "boolean")
                el.setAttribute(attr, attributes[attr]);
            else
                el.setAttribute(attr, "");
        }
    /* Append child nodes */
    for (const child of children)
        appendChild(el, child);
    /* Return element */
    return el;
}
//# sourceMappingURL=index.js.map