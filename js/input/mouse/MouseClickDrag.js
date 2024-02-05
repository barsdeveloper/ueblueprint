import MouseMoveDraggable from "./MouseMoveDraggable.js"

/**
 * @typedef {import("./MouseMoveDraggable.js").Options & {
 *     onClicked?: () => {},
 *     onStartDrag?: () => {},
 *     onDrag?: (location: Coordinates, movement: Coordinates) => {},
 *     onEndDrag?: () => {},
* }} Options
*/

export default class MouseClickDrag extends MouseMoveDraggable {

    #onClicked
    #onStartDrag
    #onDrag
    #onEndDrag

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        super(target, blueprint, options)
        if (options.onClicked) {
            this.#onClicked = options.onClicked
        }
        if (options.onStartDrag) {
            this.#onStartDrag = options.onStartDrag
        }
        if (options.onDrag) {
            this.#onDrag = options.onDrag
        }
        if (options.onEndDrag) {
            this.#onEndDrag = options.onEndDrag
        }
    }

    /** @param {Coordinates} location */
    clicked(location) {
        super.clicked(location)
        this.#onClicked?.()
    }

    startDrag() {
        super.startDrag()
        this.#onStartDrag?.()
    }

    /**
     * @param {Coordinates} location
     * @param {Coordinates} movement
     */
    dragAction(location, movement) {
        this.#onDrag?.(location, movement)
    }

    endDrag() {
        super.endDrag()
        this.#onEndDrag?.()
    }
}
