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
        return this.element
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.element.blueprint, {
            draggableElement: this.getDraggableElement(),
            looseTarget: true,
        })
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            this.createDraggableObject(),
        ]
    }

    /** @param {Map} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        if (changedProperties.has("locationX")) {
            this.element.style.setProperty("--ueb-position-x", `${this.element.locationX}`)
        }
        if (changedProperties.has("locationY")) {
            this.element.style.setProperty("--ueb-position-y", `${this.element.locationY}`)
        }
    }
}
