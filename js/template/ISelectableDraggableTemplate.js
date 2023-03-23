import IDraggablePositionedTemplate from "./IDraggablePositionedTemplate.js"
import MouseMoveNodes from "../input/mouse/MouseMoveNodes.js"

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 * @typedef {import("../input/mouse/MouseMoveDraggable").default} MouseMoveDraggable
 */

/**
 * @template {NodeElement} T
 * @extends {IDraggablePositionedTemplate<T>}
 */
export default class ISelectableDraggableTemplate extends IDraggablePositionedTemplate {

    getDraggableElement() {
        return /** @type {Element} */(this.element)
    }

    createDraggableObject() {
        return /** @type {MouseMoveDraggable} */(new MouseMoveNodes(this.element, this.blueprint, {
            draggableElement: this.getDraggableElement(),
            scrollGraphEdge: true,
        }))
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        if (this.element.selected && !this.element.listeningDrag) {
            this.element.setSelected(true)
        }
    }
}
