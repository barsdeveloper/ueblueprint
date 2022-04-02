// @ts-check

import KeyboardSelectAll from "./KeyboardSelectAll"

export default class KeyboardIgnoreSelectAll extends KeyboardSelectAll {

    /**
     * @param {HTMLElement} target
     * @param {any} blueprint
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
    }

    unfire() {

    }
}
