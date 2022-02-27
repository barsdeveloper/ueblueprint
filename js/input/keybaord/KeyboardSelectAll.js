import IKeyboardShortcut from "./IKeyboardShortcut"
import Configuration from "../../Configuration"

export default class KeyboardSelectAll extends IKeyboardShortcut {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {import("../../Blueprint").default} blueprint 
     * @param {Object} options 
     */
    constructor(target, blueprint, options = {}) {
        options = IKeyboardShortcut.keyOptionsParse(options, Configuration.selectAllKeyboardKey)
        super(target, blueprint, options)
    }

    fire() {
        this.blueprint.selectAll()
    }
}