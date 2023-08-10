import IKeyboardShortcut from "./IKeyboardShortcut.js"
import Shortcuts from "../../Shortcuts.js"
import Zoom from "../mouse/Zoom.js"

/** @typedef {import("../../Blueprint.js").default} Blueprint */

export default class KeyboardEnableZoom extends IKeyboardShortcut {

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
        this.#zoomInputObject = this.blueprint.getInputObject(Zoom)
        this.#zoomInputObject.enableZoonIn = true
    }

    unfire() {
        this.#zoomInputObject.enableZoonIn = false
    }
}
