import MouseMoveDraggable from "../input/mouse/MouseMoveDraggable.js"
import IDraggableTemplate from "./IDraggableTemplate.js"

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

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.movementSpace = this.element.parentElement
    }

    setup() {
        super.setup()
        const bounding = this.movementSpace.getBoundingClientRect()
        this.movementSpaceSize = [bounding.width, bounding.height]
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.blueprint, {
            draggableElement: this.movementSpace,
            ignoreTranslateCompensate: true,
            moveEverywhere: true,
            movementSpace: this.movementSpace,
            repositionOnClick: true,
            stepSize: 1,
        })
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Coordinates}
     */
    adjustLocation(x, y) {
        this.locationChangeCallback?.(x, y)
        return [x, y]
    }
}
