import IDraggableElement from "./IDraggableElement.js"

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
        this.template
        super.setLocation(...this.template.adjustLocation(x, y))
    }
}
