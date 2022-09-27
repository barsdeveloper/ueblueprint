import IDraggableTemplate from "./IDraggableTemplate"
import ITemplate from "./ITemplate"
import MouseMoveNodes from "../input/mouse/MouseMoveNodes"

/** @typedef {import("../element/ISelectableDraggableElement").default} ISelectableDraggableElement */

/**
 * @template {ISelectableDraggableElement} T
 * @extends {ITemplate<T>}
 */
export default class SelectableDraggableTemplate extends IDraggableTemplate {

    getDraggableElement() {
        return this.element
    }

    createDraggableObject() {
        return new MouseMoveNodes(this.element, this.element.blueprint, {
            draggableElement: this.getDraggableElement(),
            looseTarget: true,
        })
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        if (this.element.selected && !this.element.listeningDrag) {
            this.element.setSelected(true)
        }
    }
}
