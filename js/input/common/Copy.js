// @ts-check

import IInput from "../IInput"
import ObjectSerializer from "../../serialization/ObjectSerializer"

export default class Copy extends IInput {

    /** @type {(e: ClipboardEvent) => void} */
    #copyHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true
        options.unlistenOnTextEdit = true // No nodes copy if inside a text field, just text (default behavior)
        super(target, blueprint, options)
        this.serializer = new ObjectSerializer()
        let self = this
        this.#copyHandler = _ => self.copied()
    }

    listenEvents() {
        document.body.addEventListener("copy", this.#copyHandler)
    }

    unlistenEvents() {
        document.body.removeEventListener("copy", this.#copyHandler)
    }

    copied() {
        const value = this.blueprint.getNodes(true).map(node => this.serializer.serialize(node.entity, false)).join("\n")
        navigator.clipboard.writeText(value)
    }
}
