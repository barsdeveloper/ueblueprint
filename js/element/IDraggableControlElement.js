import IDraggableElement from "./IDraggableElement.js"

/**
 * @typedef {import("../element/WindowElement.js").default} WindowElement
 * @typedef {import("../entity/IEntity.js").default} IEntity
 * @typedef {import("../template/IDraggableControlTemplate.js").default} IDraggableControlTemplate
 */

/**
 * @template {IEntity} T
 * @template {IDraggableControlTemplate} U
 * @extends {IDraggableElement<T, U>}
 */
export default class IDraggableControlElement extends IDraggableElement {

    /** @type {WindowElement} */
    windowElement

    setup() {
        super.setup()
        this.windowElement = this.closest("ueb-window")
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    setLocation(x, y) {
        super.setLocation(...this.template.adjustLocation(x, y))
    }
}
