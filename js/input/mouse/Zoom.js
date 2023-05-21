import Configuration from "../../Configuration.js"
import IMouseWheel from "./IMouseWheel.js"

export default class Zoom extends IMouseWheel {

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

    wheel(variation, location) {
        this.#accumulatedVariation += -variation
        variation = this.#accumulatedVariation
        if (Math.abs(this.#accumulatedVariation) < Configuration.mouseWheelZoomThreshold) {
            return
        } else {
            this.#accumulatedVariation = 0
        }
        let zoomLevel = this.blueprint.getZoom()
        if (!this.enableZoonIn && zoomLevel == 0 && variation > 0) {
            return
        }
        zoomLevel += Math.sign(variation)
        this.blueprint.setZoom(zoomLevel, location)
    }
}
