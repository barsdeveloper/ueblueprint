import IDraggableTemplate from "./IDraggableTemplate"
import MouseMoveDraggable from "../input/mouse/MouseMoveDraggable"
import Utility from "../Utility"

/** @typedef {import("../element/ColorHandlerElement").default} ColorHandlerElement */

/** @extends {IDraggableTemplate<ColorHandlerElement>} */
export default class ColorHandlerTemplate extends IDraggableTemplate {

    #locationChangeCallback

    connectedCallback() {
        super.connectedCallback()
        this.window = this.element.closest("ueb-window")
        this.movementSpace = this.element.parentElement
        const bounding = this.movementSpace.getBoundingClientRect()
        this.movementSpaceSize = [bounding.width, bounding.height]
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.element.blueprint, {
            draggableElement: this.element.parentElement,
            ignoreTranslateCompensate: true,
            moveEverywhere: true,
            movementSpace: this.element.parentElement,
            repositionOnClick: true,
            stepSize: 1,
        })
    }

    /**  @param {[Number, Number]} param0 */
    adjustLocation([x, y]) {
        const radius = Math.round(this.movementSpaceSize[0] / 2)
        x = x - radius
        y = -(y - radius)
        let [r, theta] = Utility.getPolarCoordinates([x, y])
        r = Math.min(r, radius), [x, y] = Utility.getCartesianCoordinates([r, theta])
        x = Math.round(x + radius)
        y = Math.round(-y + radius)
        this.#locationChangeCallback?.([x, y])
        return [x, y]
    }

    setLocationChangeCallback(callback) {
        this.#locationChangeCallback = callback
    }
}
