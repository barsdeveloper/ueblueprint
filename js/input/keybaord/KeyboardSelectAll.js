import Configuration from "../../Configuration.js"
import IKeyboardShortcut from "./IKeyboardShortcut.js"

/** @typedef {import("../../Blueprint.js").default} Blueprint */

export default class KeyboardSelectAll extends IKeyboardShortcut {

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Configuration.selectAllKeyboardKey
        super(target, blueprint, options)
    }

    fire() {
        this.blueprint.selectAll()
    }
}
