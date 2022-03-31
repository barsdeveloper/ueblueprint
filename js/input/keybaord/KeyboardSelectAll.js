// @ts-check

import IKeyboardShortcut from "./IKeyboardShortcut"

export default class KeyboardSelectAll extends IKeyboardShortcut {

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options = {
            ...options,
            activationKeys: blueprint.settings.selectAllKeyboardKey
        }
        super(target, blueprint, options)
    }

    fire() {
        this.blueprint.selectAll()
    }
}
