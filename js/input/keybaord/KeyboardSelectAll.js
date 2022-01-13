import KeyboardShortcut from "./KeyboardShortcut"
import Configuration from "../../Configuration"


export default class KeyboardSelectAll extends KeyboardShortcut {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {import("../../Blueprint").default} blueprint 
     * @param {Object} options 
     */
    constructor(target, blueprint, options = {}) {
        options = KeyboardShortcut.keyOptionsParse(options, Configuration.selectAllKeyboardKey)
        super(target, blueprint, options)
    }

    fire() {
        this.blueprint.selectAll()
    }
}