import Configuration from "../../Configuration.js"
import IPointing from "./IPointing.js"

/**
 * @typedef {import("./IPointing.js").Options & {
 *     listenOnFocus?: Boolean,
 * }} Options
 */

export default class MouseTracking extends IPointing {

    /** @type {IPointing} */
    #mouseTracker = null

    /** @param {MouseEvent} e */
    #mousemoveHandler = e => {
        e.preventDefault()
        this.setLocationFromEvent(e)
        this.blueprint.mousePosition = [...this.location]
    }

    /** @param {CustomEvent} e */
    #trackingMouseStolenHandler = e => {
        if (!this.#mouseTracker) {
            e.preventDefault()
            this.#mouseTracker = e.detail.tracker
            this.unlistenMouseMove()
        }
    }

    /** @param {CustomEvent} e */
    #trackingMouseGaveBackHandler = e => {
        if (this.#mouseTracker == e.detail.tracker) {
            e.preventDefault()
            this.#mouseTracker = null
            this.listenMouseMove()
        }
    }

    /**
     * @param {Element} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true
        super(target, blueprint, options)
    }

    listenMouseMove() {
        this.target.addEventListener("mousemove", this.#mousemoveHandler)
    }

    unlistenMouseMove() {
        this.target.removeEventListener("mousemove", this.#mousemoveHandler)
    }

    listenEvents() {
        this.listenMouseMove()
        this.blueprint.addEventListener(
            Configuration.trackingMouseEventName.begin,
            /** @type {(e: Event) => any} */(this.#trackingMouseStolenHandler))
        this.blueprint.addEventListener(
            Configuration.trackingMouseEventName.end,
            /** @type {(e: Event) => any} */(this.#trackingMouseGaveBackHandler))
    }

    unlistenEvents() {
        this.unlistenMouseMove()
        this.blueprint.removeEventListener(
            Configuration.trackingMouseEventName.begin,
            /** @type {(e: Event) => any} */(this.#trackingMouseStolenHandler))
        this.blueprint.removeEventListener(
            Configuration.trackingMouseEventName.end,
            /** @type {(e: Event) => any} */(this.#trackingMouseGaveBackHandler)
        )
    }
}
