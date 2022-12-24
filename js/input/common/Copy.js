import IInput from "../IInput"
import ObjectSerializer from "../../serialization/ObjectSerializer"

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

    copied() {
        const value = this.blueprint
            .getNodes(true)
            .map(node => Copy.#serializer.serialize(node.entity, false))
            .join("")
        navigator.clipboard.writeText(value)
    }
}
