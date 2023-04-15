import Configuration from "../../Configuration.js"
import IPointing from "./IPointing.js"

/** @typedef {import("../../Blueprint.js").default} Blueprint */

export default class IMouseWheel extends IPointing {

    /** @param {WheelEvent} e */
    #mouseWheelHandler = e => {
        e.preventDefault()
        const location = this.locationFromEvent(e)
        this.wheel(Math.sign(e.deltaY * Configuration.mouseWheelFactor), location)
    }

    /** @param {WheelEvent} e */
    #mouseParentWheelHandler = e => e.preventDefault()

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true
        options.strictTarget ??= false
        super(target, blueprint, options)
        this.strictTarget = options.strictTarget
    }

    listenEvents() {
        this.movementSpace.addEventListener("wheel", this.#mouseWheelHandler, false)
        this.movementSpace.parentElement?.addEventListener("wheel", this.#mouseParentWheelHandler)
    }

    unlistenEvents() {
        this.movementSpace.removeEventListener("wheel", this.#mouseWheelHandler, false)
        this.movementSpace.parentElement?.removeEventListener("wheel", this.#mouseParentWheelHandler)
    }

    /* Subclasses will override the following method */
    wheel(variation, location) {
    }
}
