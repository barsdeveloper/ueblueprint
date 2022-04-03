// @ts-check

import Configuration from "../../Configuration"
import IKeyboardShortcut from "./IKeyboardShortcut"

export default class KeyboardCanc extends IKeyboardShortcut {

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options = {
            ...options,
            activationKeys: Configuration.deleteNodesKeyboardKey
        }
        super(target, blueprint, options)
    }

    fire() {
        this.blueprint.removeGraphElement(...this.blueprint.getNodes(true))
    }
}