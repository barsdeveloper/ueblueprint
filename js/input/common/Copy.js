import IInput from "../IInput.js"
import ObjectSerializer from "../../serialization/ObjectSerializer.js"

export default class Copy extends IInput {

    static #serializer = new ObjectSerializer()

    /** @type {(e: ClipboardEvent) => void} */
    #copyHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus ??= true
        options.unlistenOnTextEdit ??= true // No nodes copy if inside a text field, just text (default behavior)
        super(target, blueprint, options)
        let self = this
        this.#copyHandler = _ => self.copied()
    }

    listenEvents() {
        window.addEventListener("copy", this.#copyHandler)
    }

    unlistenEvents() {
        window.removeEventListener("copy", this.#copyHandler)
    }

    getSerializedText() {
        return this.blueprint
            .getNodes(true)
            .map(node => Copy.#serializer.serialize(node.entity, false))
            .join("")
    }

    copied() {
        const value = this.getSerializedText()
        navigator.clipboard.writeText(value)
    }
}
