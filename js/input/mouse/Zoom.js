import Configuration from "../../Configuration.js"
import MouseWheel from "./MouseWheel.js"

export default class Zoom extends MouseWheel {

    #accumulatedVariation = 0

    #enableZoonIn = false
    get enableZoonIn() {
        return this.#enableZoonIn
    }
    set enableZoonIn(value) {
        if (value == this.#enableZoonIn) {
            return
        }
        this.#enableZoonIn = value
    }

    wheel() {
        this.#accumulatedVariation += -this.variation
        if (Math.abs(this.#accumulatedVariation) < Configuration.mouseWheelZoomThreshold) {
            return
        }
        let zoomLevel = this.blueprint.getZoom()
        if (!this.enableZoonIn && zoomLevel == 0 && this.#accumulatedVariation > 0) {
            return
        }
        zoomLevel += Math.sign(this.#accumulatedVariation)
        this.blueprint.setZoom(zoomLevel, this.location)
        this.#accumulatedVariation = 0
    }
}
