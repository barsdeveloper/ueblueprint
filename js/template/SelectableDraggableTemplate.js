import IDraggableTemplate from "./IDraggableTemplate"
import ITemplate from "./ITemplate"
import MouseMoveNodes from "../input/mouse/MouseMoveNodes"

/** @typedef {import("../element/ISelectableDraggableElement").default} ISelectableDraggableElement */

/**
 * @template {ISelectableDraggableElement} T
 * @extends {ITemplate<T>}
 */
export default class SelectableDraggableTemplate extends IDraggableTemplate {

    /** @param {T} element */
    getDraggableElement(element) {
        return element
    }

    createDraggableObject(element) {
        return new MouseMoveNodes(element, element.blueprint, {
            draggableElement: this.getDraggableElement(element),
            looseTarget: true,
        })
    }

    /**
     * @param {T} element
     * @param {Map} changedProperties
     */
    firstUpdated(element, changedProperties) {
        super.firstUpdated(element, changedProperties)
        if (element.selected && !element.listeningDrag) {
            element.setSelected(true)
        }
    }
}
