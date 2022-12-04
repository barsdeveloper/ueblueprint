import MouseMoveDraggable from "./MouseMoveDraggable"

/** @typedef {import("../../Blueprint").default} Blueprint */

export default class MouseClickDrag extends MouseMoveDraggable {

    #onClicked
    #onStartDrag
    #onDrag
    #onEndDrag

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
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

    clicked() {
        super.clicked()
        this.#onClicked?.()
    }

    startDrag() {
        super.startDrag()
        this.#onStartDrag?.()
    }

    dragAction(location, movement) {
        this.#onDrag?.(location, movement)
    }

    endDrag() {
        super.endDrag()
        this.#onEndDrag?.()
    }
}
