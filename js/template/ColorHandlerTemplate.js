import IDraggableTemplate from "./IDraggableTemplate"
import MouseMoveDraggable from "../input/mouse/MouseMoveDraggable"

/** @typedef {import("../element/ColorHandlerElement").default} ColorHandlerElement */

/** @extends {IDraggableTemplate<ColorHandlerElement>} */
export default class ColorHandlerTemplate extends IDraggableTemplate {

    connectedCallback() {
        super.connectedCallback()
        this.window = this.element.closest("ueb-window")
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.element.blueprint, {
            draggableElement: this.element.parentElement,
            ignoreTranslateCompensate: true,
            looseTarget: true,
            moveEverywhere: true,
            movementSpace: this.element.parentElement,
            repositionClickOffset: true,
            stepSize: 1,
        })
    }
}
