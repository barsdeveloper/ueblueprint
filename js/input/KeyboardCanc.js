import KeyboardShortcut from "./KeyboardShortcut"
import Configuration from "../Configuration"


export default class KeyvoardCanc extends KeyboardShortcut {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {import("../Blueprint").default} blueprint 
     * @param {OBject} options 
     */
    constructor(target, blueprint, options = {}) {
        options = KeyboardShortcut.keyOptionsParse(options, Configuration.deleteNodesKeyboardKey)
        super(target, blueprint, options)
    }

    fire() {
        this.blueprint.removeGraphElement(...this.blueprint.getNodes(true))
    }
}