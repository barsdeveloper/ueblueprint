import sanitizeText from "./sanitizeText"
import Template from "./Template"

/**
 * @typedef {import("../graph/SelectableDraggable").default} SelectableDraggable
 */
export default class SelectableDraggableTemplate extends Template {

    /**
     * Returns the html elements rendered from this template.
     * @param {SelectableDraggable} element Element of the graph
     */
    applyLocation(element) {
        element.style.setProperty("--ueb-position-x", sanitizeText(element.location[0]))
        element.style.setProperty("--ueb-position-y", sanitizeText(element.location[1]))
    }

    /**
     * Returns the html elements rendered from this template.
     * @param {SelectableDraggable} element Element of the graph
     */
    applySelected(element) {
        if (element.selected) {
            element.classList.add("ueb-selected")
        } else {
            element.classList.remove("ueb-selected")
        }
    }
}
