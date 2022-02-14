import Configuration from "../../Configuration"
import Pointing from "./Pointing"

export default class MouseTracking extends Pointing {

    #mouseTracker = null
    #mousemoveHandler
    #trackingMouseStolenHandler
    #trackingMouseGaveBackHandler

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true
        super(target, blueprint, options)

        let self = this

        /**
         * 
         * @param {MouseEvent} e 
         */
        this.#mousemoveHandler = e => {
            self.blueprint.entity.mousePosition = self.locationFromEvent(e)
        }

        /**
         * 
         * @param {CustomEvent} e 
         */
        this.#trackingMouseStolenHandler = e => {
            if (!self.#mouseTracker) {
                e.preventDefault()
                this.#mouseTracker = e.detail.tracker
                self.unlistenMouseMove()
            }
        }

        /**
         * 
         * @param {CustomEvent} e 
         */
        this.#trackingMouseGaveBackHandler = e => {
            if (self.#mouseTracker == e.detail.tracker) {
                e.preventDefault()
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
