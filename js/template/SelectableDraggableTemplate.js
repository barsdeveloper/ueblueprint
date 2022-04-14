// @ts-check

import ITemplate from "./ITemplate"
import sanitizeText from "./sanitizeText"

/**
 * @typedef {import("../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 */

export default class SelectableDraggableTemplate extends ITemplate {

    /**
     * Returns the html elements rendered from this template.
     * @param {ISelectableDraggableElement} element Element of the graph
     */
    applyLocation(element) {
        element.style.setProperty("--ueb-position-x", sanitizeText(element.location[0]))
        element.style.setProperty("--ueb-position-y", sanitizeText(element.location[1]))
    }

    /**
     * Returns the html elements rendered from this template.
     * @param {ISelectableDraggableElement} element Element of the graph
     */
    applySelected(element) {
        if (element.selected) {
            element.classList.add("ueb-selected")
        } else {
            element.classList.remove("ueb-selected")
        }
    }
}
