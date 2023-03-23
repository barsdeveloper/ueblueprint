import IMouseWheel from "./IMouseWheel.js"

export default class Zoom extends IMouseWheel {

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
        let zoomLevel = this.blueprint.getZoom()
        variation = -variation
        if (!this.enableZoonIn && zoomLevel == 0 && variation > 0) {
            return
        }
        zoomLevel += variation
        this.blueprint.setZoom(zoomLevel, location)
    }
}
