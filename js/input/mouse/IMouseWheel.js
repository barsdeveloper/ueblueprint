import Configuration from "../../Configuration"
import IPointing from "./IPointing"

export default class IMouseWheel extends IPointing {

    /** @type {(e: WheelEvent) => void} */
    #mouseWheelHandler

    /** @type {(e: WheelEvent) => void} */
    #mouseParentWheelHandler

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options) {
        options.listenOnFocus = true
        super(target, blueprint, options)
        this.looseTarget = options?.looseTarget ?? true
        let self = this

        this.#mouseWheelHandler = e => {
            e.preventDefault()
            const location = self.locationFromEvent(e)
            self.wheel(Math.sign(e.deltaY * Configuration.mouseWheelFactor), location)
        }
        this.#mouseParentWheelHandler = e => e.preventDefault()

        if (this.blueprint.focused) {
            this.movementSpace.addEventListener("wheel", this.#mouseWheelHandler, false)
        }
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
