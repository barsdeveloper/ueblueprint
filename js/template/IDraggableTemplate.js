import ITemplate from "./ITemplate"
import MouseMoveDraggable from "../input/mouse/MouseMoveDraggable"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../element/IDraggableElement").default} IDraggableElement
 */

/**
 * @template {IDraggableElement} T
 * @extends {ITemplate<T>}
 */
export default class IDraggableTemplate extends ITemplate {

    getDraggableElement() {
        return /** @type {Element} */(this.element)
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.element.blueprint, {
            draggableElement: this.getDraggableElement(),
        })
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            this.createDraggableObject(),
        ]
    }
}
