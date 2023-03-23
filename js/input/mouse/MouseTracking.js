import Configuration from "../../Configuration.js"
import IPointing from "./IPointing.js"

export default class MouseTracking extends IPointing {

    /** @type {IPointing} */
    #mouseTracker = null

    /** @param {MouseEvent} e */
    #mousemoveHandler= e => {
        e.preventDefault()
        this.blueprint.mousePosition = this.locationFromEvent(e)
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
