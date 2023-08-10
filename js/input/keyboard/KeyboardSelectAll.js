import KeyboardShortcut from "./KeyboardShortcut.js"
import Shortcuts from "../../Shortcuts.js"

/** @typedef {import("../../Blueprint.js").default} Blueprint */

export default class KeyboardSelectAll extends KeyboardShortcut {

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
