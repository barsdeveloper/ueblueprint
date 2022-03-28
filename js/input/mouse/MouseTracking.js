// @ts-check

import Configuration from "../../Configuration"
import IPointing from "./IPointing"

export default class MouseTracking extends IPointing {

    /** @type {IPointing} */
    #mouseTracker = null

    /** @type {(e: MouseEvent) => void} */
    #mousemoveHandler

    /** @type {(e: CustomEvent) => void} */
    #trackingMouseStolenHandler

    /** @type {(e: CustomEvent) => void} */
    #trackingMouseGaveBackHandler

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true
        super(target, blueprint, options)

        let self = this

        this.#mousemoveHandler = e => {
            self.blueprint.entity.mousePosition = self.locationFromEvent(e)
        }

        this.#trackingMouseStolenHandler = e => {
            if (!self.#mouseTracker) {
                this.#mouseTracker = e.detail.tracker
                self.unlistenMouseMove()
            }
        }

        this.#trackingMouseGaveBackHandler = e => {
            if (self.#mouseTracker == e.detail.tracker) {
                self.#mouseTracker = null
                self.listenMouseMove()
            }
        }
    }

    listenMouseMove() {
        this.target.addEventListener("mousemove", this.#mousemoveHandler)
    }

    unlistenMouseMove() {
        this.target.removeEventListener("mousemove", this.#mousemoveHandler)
    }

    listenEvents() {
        this.listenMouseMove()
        this.blueprint.addEventListener(Configuration.trackingMouseEventName.begin, this.#trackingMouseStolenHandler)
        this.blueprint.addEventListener(Configuration.trackingMouseEventName.end, this.#trackingMouseGaveBackHandler)
    }

    unlistenEvents() {
        this.unlistenMouseMove()
        this.blueprint.removeEventListener(Configuration.trackingMouseEventName.begin, this.#trackingMouseStolenHandler)
        this.blueprint.removeEventListener(Configuration.trackingMouseEventName.end, this.#trackingMouseGaveBackHandler)
    }
}
