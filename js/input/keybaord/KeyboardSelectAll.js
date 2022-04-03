// @ts-check

import Configuration from "../../Configuration"
import IKeyboardShortcut from "./IKeyboardShortcut"

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 */
export default class KeyboardSelectAll extends IKeyboardShortcut {

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options = {
            ...options,
            activationKeys: Configuration.selectAllKeyboardKey
        }
        super(target, blueprint, options)
    }

    fire() {
        this.blueprint.selectAll()
    }
}
