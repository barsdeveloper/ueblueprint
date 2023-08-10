import IKeyboardShortcut from "./IKeyboardShortcut.js"
import Shortcuts from "../../Shortcuts.js"

/** @typedef {import("../../Blueprint.js").default} Blueprint */

export default class KeyboardSelectAll extends IKeyboardShortcut {

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Shortcuts.selectAllNodes
        super(target, blueprint, options)
    }

    fire() {
        this.blueprint.selectAll()
    }
}
