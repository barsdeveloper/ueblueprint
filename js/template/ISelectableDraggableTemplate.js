import IDraggablePositionedTemplate from "./IDraggablePositionedTemplate.js"
import MouseMoveNodes from "../input/mouse/MouseMoveNodes.js"

/**
 * @template {NodeElement} T
 * @extends {IDraggablePositionedTemplate<T>}
 */
export default class ISelectableDraggableTemplate extends IDraggablePositionedTemplate {

    /** @returns {HTMLElement} */
    getDraggableElement() {
        return this.element
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
