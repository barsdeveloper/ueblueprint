import IPointing from "./IPointing.js"

export default class MouseWheel extends IPointing {

    static #ignoreEvent =
        /** @param {MouseWheel} self */
        self => { }

    #variation = 0
    get variation() {
        return this.#variation
    }

    /** @param {WheelEvent} e */
    #mouseWheelHandler = e => {
        if (this.enablerKey && !this.enablerActivated) {
            return
        }
        e.preventDefault()
        this.#variation = e.deltaY
        this.setLocationFromEvent(e)
        this.wheel()
    }

    /** @param {WheelEvent} e */
    #mouseParentWheelHandler = e => e.preventDefault()

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(
        target,
        blueprint,
        options = {},
        onWheel = MouseWheel.#ignoreEvent,
    ) {
        options.listenOnFocus = true
        options.strictTarget ??= false
        super(target, blueprint, options)
        this.strictTarget = options.strictTarget
        this.onWheel = onWheel
    }

    listenEvents() {
        this.movementSpace.addEventListener("wheel", this.#mouseWheelHandler, false)
        this.movementSpace.parentElement?.addEventListener("wheel", this.#mouseParentWheelHandler)
    }

    unlistenEvents() {
        this.movementSpace.removeEventListener("wheel", this.#mouseWheelHandler, false)
        this.movementSpace.parentElement?.removeEventListener("wheel", this.#mouseParentWheelHandler)
    }

    /* Subclasses can override */
    wheel() {
        this.onWheel(this)
    }
}
