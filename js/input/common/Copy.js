import IInput from "../IInput.js"

/**
 * @typedef {import("../IInput.js").Options & {
 *     listenOnFocus?: Boolean,
 *     unlistenOnTextEdit?: Boolean,
 * }} Options
 */

export default class Copy extends IInput {

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
        const exported = allNodes.filter(n => n.exported).map(n => n.serialize())
        const result = allNodes.filter(n => !n.exported).map(n => n.serialize())
        if (exported.length) {
            this.blueprint.entity.ExportedNodes.value = btoa(exported.join(""))
            result.splice(0, 0, this.blueprint.entity.serialize(false))
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
