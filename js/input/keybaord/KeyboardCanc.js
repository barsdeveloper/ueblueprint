import IKeyboardShortcut from "./IKeyboardShortcut"
import Configuration from "../../Configuration"

export default class KeyvoardCanc extends IKeyboardShortcut {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {import("../../Blueprint").default} blueprint 
     * @param {OBject} options 
     */
    constructor(target, blueprint, options = {}) {
        options = IKeyboardShortcut.keyOptionsParse(options, Configuration.deleteNodesKeyboardKey)
        super(target, blueprint, options)
    }

    fire() {
        this.blueprint.removeGraphElement(...this.blueprint.getNodes(true))
    }
}