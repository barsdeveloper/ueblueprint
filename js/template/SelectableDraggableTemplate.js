import IDraggableTemplate from "./IDraggableTemplate"
import MouseMoveNodes from "../input/mouse/MouseMoveNodes"

/**
 * @typedef {import("../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 * @typedef {import("../input/mouse/MouseMoveDraggable").default} MouseMoveDraggable
 */

/**
 * @template {ISelectableDraggableElement} T
 * @extends {IDraggableTemplate<T>}
 */
export default class SelectableDraggableTemplate extends IDraggableTemplate {

    getDraggableElement() {
        return this.element
    }

    createDraggableObject() {
        return /** @type {MouseMoveDraggable} */ (new MouseMoveNodes(this.element, this.element.blueprint, {
            draggableElement: this.getDraggableElement(),
            looseTarget: true,
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
