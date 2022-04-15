// @ts-check

import MouseMoveNodes from "../input/mouse/MouseMoveNodes"
import ITemplate from "./ITemplate"
import sanitizeText from "./sanitizeText"

/**
 * @typedef {import("../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 */

/**
 * @extends {ITemplate<ISelectableDraggableElement>}
 */
export default class SelectableDraggableTemplate extends ITemplate {

    /**
     * @param {ISelectableDraggableElement} element
     */
    createInputObjects(element) {
        return [
            ...super.createInputObjects(element),
            ...[
                new MouseMoveNodes(element, element.blueprint, {
                    looseTarget: true
                }),
            ]
        ]
    }

    /**
     * @param {ISelectableDraggableElement} element
     */
    applyLocation(element) {
        element.style.setProperty("--ueb-position-x", sanitizeText(element.location[0]))
        element.style.setProperty("--ueb-position-y", sanitizeText(element.location[1]))
    }

    /**
     * @param {ISelectableDraggableElement} element
     */
    applySelected(element) {
        if (element.selected) {
            element.classList.add("ueb-selected")
        } else {
            element.classList.remove("ueb-selected")
        }
    }
}
