// @ts-check

import Configuration from "../../Configuration"
import IKeyboardShortcut from "./IKeyboardShortcut"
import Zoom from "../mouse/Zoom"

export default class KeyboardEnableZoom extends IKeyboardShortcut {

    /** @type {Zoom} */
    #zoomInputObject

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Configuration.enableZoomIn
        super(target, blueprint, options)
    }

    fire() {
        this.#zoomInputObject = this.blueprint.getInputObject(Zoom)
        this.#zoomInputObject.enableZoonIn = true
    }

    unfire() {
        this.#zoomInputObject.enableZoonIn = false
    }
}
