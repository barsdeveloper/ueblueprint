import KeyboardShortcut from "./KeyboardShortcut";


export default class KeyvoardCanc extends KeyboardShortcut {

    constructor(target, blueprint, options = {}) {
        options.key = "Delete"
        super(target, blueprint, options)
    }

    fire() {
        this.blueprint.deleteNode(...this.blueprint.getNodes(true))
    }
}