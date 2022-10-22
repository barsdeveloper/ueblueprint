import IDraggablePositionedTemplate from "./IDraggablePositionedTemplate"
import MouseMoveNodes from "../input/mouse/MouseMoveNodes"

/**
 * @typedef {import("../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 * @typedef {import("../input/mouse/MouseMoveDraggable").default} MouseMoveDraggable
 */

/**
 * @template {ISelectableDraggableElement} T
 * @extends {IDraggablePositionedTemplate<T>}
 */
export default class ISelectableDraggableTemplate extends IDraggablePositionedTemplate {

    getDraggableElement() {
        return this.element
    }

    createDraggableObject() {
        return /** @type {MouseMoveDraggable} */ (new MouseMoveNodes(this.element, this.element.blueprint, {
            draggableElement: this.getDraggableElement(),
        }))
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        if (this.element.selected && !this.element.listeningDrag) {
            this.element.setSelected(true)
        }
    }
}
