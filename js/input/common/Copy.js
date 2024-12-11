import NiagaraClipboardContent from "../../entity/objects/NiagaraClipboardContent.js"
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

    copied() {
        const value = this.blueprint.getSerializedText()
        navigator.clipboard.writeText(value)
        return value
    }
}
