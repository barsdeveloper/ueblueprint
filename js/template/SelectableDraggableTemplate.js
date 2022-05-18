// @ts-check

import ITemplate from "./ITemplate"
import MouseMoveNodes from "../input/mouse/MouseMoveNodes"
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
            new MouseMoveNodes(element, element.blueprint, {
                looseTarget: true
            }),
        ]
    }

    /**
     * @param {ISelectableDraggableElement} element
     */
    applyLocation(element) {
        requestAnimationFrame(_ => {
            element.style.setProperty("--ueb-position-x", sanitizeText(element.location[0]))
            element.style.setProperty("--ueb-position-y", sanitizeText(element.location[1]))
        })
    }

    /**
     * @param {ISelectableDraggableElement} element
     */
    applySelected(element) {
        requestAnimationFrame(_ => {
            if (element.selected) {
                element.classList.add("ueb-selected")
            } else {
                element.classList.remove("ueb-selected")
            }
        })
    }
}
