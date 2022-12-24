import IDraggableTemplate from "./IDraggableTemplate"
import MouseMoveDraggable from "../input/mouse/MouseMoveDraggable"

/**
 * @typedef {import("../element/IDraggableElement").default} IDraggableElement
 */

/**
 * @template {IDraggableElement} T
 * @extends {IDraggableTemplate<T>}
 */
export default class IDraggableControlTemplate extends IDraggableTemplate {

    /** @type {(x: Number, y: Number) => void} */
    #locationChangeCallback
    get locationChangeCallback() {
        return this.#locationChangeCallback
    }
    set locationChangeCallback(callback) {
        this.#locationChangeCallback = callback
    }

    movementSpace
    movementSpaceSize = [0, 0]

    setup() {
        super.setup()
        this.movementSpace = this.element.parentElement
        const bounding = this.movementSpace.getBoundingClientRect()
        this.movementSpaceSize = [bounding.width, bounding.height]
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.element.blueprint, {
            draggableElement: this.movementSpace,
            ignoreTranslateCompensate: true,
            moveEverywhere: true,
            movementSpace: this.movementSpace,
            repositionOnClick: true,
            stepSize: 1,
        })
    }

    /**  @param {[Number, Number]} param0 */
    adjustLocation([x, y]) {
        this.locationChangeCallback?.(x, y)
        return [x, y]
    }
}
