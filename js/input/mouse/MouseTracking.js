import Configuration from "../../Configuration"
import Pointing from "./Pointing"

export default class MouseTracking extends Pointing {

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true
        super(target, blueprint, options)

        this.trackingStolen = null
        let self = this
        this.mousemoveHandler = e => {
            self.blueprint.entity.mousePosition = self.locationFromEvent(e)
            return true
        }
        this.trackingMouseStolenHandler = e => {
            this.trackingStolen = e.target
            self.unlistenMouseMove()
            return true
        }
        this.trackingMouseGaveBackHandler = e => {
            if (!this.trackingStolen == e.target) {
                return false
            }
            self.listenMouseMove()
            return true
        }
    }

    listenMouseMove() {
        this.target.addEventListener("mousemove", this.mousemoveHandler)
    }

    unlistenMouseMove() {
        this.target.removeEventListener("mousemove", this.mousemoveHandler)
    }

    listenEvents() {
        this.listenMouseMove()
        this.blueprint.addEventListener(Configuration.trackingMouseEventName.begin, this.trackingMouseStolenHandler)
        this.blueprint.addEventListener(Configuration.trackingMouseEventName.end, this.trackingMouseGaveBackHandler)
    }

    unlistenEvents() {
        this.unlistenMouseMove()
        this.blueprint.removeEventListener(Configuration.trackingMouseEventName.begin, this.trackingMouseStolenHandler)
        this.blueprint.removeEventListener(Configuration.trackingMouseEventName.end, this.trackingMouseGaveBackHandler)
    }
}
