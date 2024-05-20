import ObjectSerializer from "../../serialization/ObjectSerializer.js"
import IInput from "../IInput.js"

/**
 * @typedef {import("../IInput.js").Options & {
 *     listenOnFocus?: Boolean,
 *     unlistenOnTextEdit?: Boolean,
 * }} Options
 */

export default class Copy extends IInput {

    static #serializer = new ObjectSerializer()

    /** @type {(e: ClipboardEvent) => void} */
    #copyHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus ??= true
        options.unlistenOnTextEdit ??= true // No nodes copy if inside a text field, just text (default behavior)
        super(target, blueprint, options)
        let self = this
        this.#copyHandler = () => self.copied()
    }

    listenEvents() {
        window.addEventListener("copy", this.#copyHandler)
    }

    unlistenEvents() {
        window.removeEventListener("copy", this.#copyHandler)
    }

    getSerializedText() {
        const allNodes = this.blueprint.getNodes(true).map(n => n.entity)
        const exported = allNodes.filter(n => n.isExported).map(n => Copy.#serializer.write(n, false))
        const result = allNodes.filter(n => !n.isExported).map(n => Copy.#serializer.write(n, false))
        if (exported.length) {
            this.blueprint.entity.ExportedNodes = btoa(exported.join(""))
            result.splice(0, 0, Copy.#serializer.write(this.blueprint.entity, false))
            delete this.blueprint.entity.ExportedNodes
        }
        return result.join("")
    }

    copied() {
        const value = this.getSerializedText()
        navigator.clipboard.writeText(value)
        return value
    }
}
