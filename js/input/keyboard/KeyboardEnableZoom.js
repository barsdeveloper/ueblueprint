import KeyboardShortcut from "./KeyboardShortcut.js"
import Shortcuts from "../../Shortcuts.js"
import Zoom from "../mouse/Zoom.js"

export default class KeyboardEnableZoom extends KeyboardShortcut {

    /** @type {Zoom} */
    #zoomInputObject

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Shortcuts.enableZoomIn
        super(target, blueprint, options)
    }

    fire() {
        this.#zoomInputObject = this.blueprint.template.getZoomInputObject()
        this.#zoomInputObject.enableZoonIn = true
    }

    unfire() {
        this.#zoomInputObject.enableZoonIn = false
    }
}
