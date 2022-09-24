import ITemplate from "./ITemplate"
import MouseMoveDraggable from "../input/mouse/MouseMoveDraggable"

/**
 * @typedef {import("../element/IDraggableElement").default} IDraggableElement
 */

/**
 * @template {ISelectableDraggableElement} T
 * @extends {ITemplate<T>}
 */
export default class IDraggableTemplate extends ITemplate {

    /** @param {T} element */
    getDraggableElement(element) {
        return element
    }

    createDraggableObject(element) {
        return new MouseMoveDraggable(element, element.blueprint, {
            draggableElement: this.getDraggableElement(element),
            looseTarget: true,
        })
    }

    /** @param {T} element */
    createInputObjects(element) {
        return [
            ...super.createInputObjects(element),
            this.createDraggableObject(element),
        ]
    }

    /**
     * @param {T} element
     * @param {Map} changedProperties
     */
    update(element, changedProperties) {
        super.update(element, changedProperties)
        if (changedProperties.has("locationX")) {
            element.style.setProperty("--ueb-position-x", `${element.locationX}`)
        }
        if (changedProperties.has("locationY")) {
            element.style.setProperty("--ueb-position-y", `${element.locationY}`)
        }
    }
}
