import IInput from "../IInput.js"
import ObjectSerializer from "../../serialization/ObjectSerializer.js"
import KeyboardCanc from "../keybaord/KeyboardCanc.js"

export default class Cut extends IInput {

    static #serializer = new ObjectSerializer()

    /** @type {(e: ClipboardEvent) => void} */
    #cutHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus ??= true
        options.unlistenOnTextEdit ??= true // No nodes copy if inside a text field, just text (default behavior)
        super(target, blueprint, options)
        let self = this
        this.#cutHandler = _ => self.cut()
    }

    listenEvents() {
        window.addEventListener("cut", this.#cutHandler)
    }

    unlistenEvents() {
        window.removeEventListener("cut", this.#cutHandler)
    }

    getSerializedText() {
        return this.blueprint
            .getNodes(true)
            .map(node => Cut.#serializer.write(node.entity, false))
            .join("")
    }

    cut() {
        this.blueprint.template.getCopyInputObject().copied()
        this.blueprint.template.getInputObject(KeyboardCanc).fire()
    }
}
