import KeyboardShortcut from "./KeyboardShortcut.js"
import Shortcuts from "../../Shortcuts.js"
import Zoom from "../mouse/Zoom.js"

/**
 * @typedef {import("./KeyboardShortcut.js").Options & {
 *     activationKeys?: String | KeyBindingEntity | (String | KeyBindingEntity)[],
 * }} Options
 */

export default class KeyboardEnableZoom extends KeyboardShortcut {

    /** @type {Zoom} */
    #zoomInputObject

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Options} options
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
