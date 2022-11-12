import Configuration from "../../Configuration"
import IPointing from "./IPointing"

export default class IMouseWheel extends IPointing {

    #mouseWheelHandler =
        /** @param {WheelEvent} e */
        e => {
            e.preventDefault()
            const location = this.locationFromEvent(e)
            this.wheel(Math.sign(e.deltaY * Configuration.mouseWheelFactor), location)
        }

    #mouseParentWheelHandler =
        /** @param {WheelEvent} e */
        e => e.preventDefault()

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
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
