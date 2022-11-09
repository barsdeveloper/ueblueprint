import IInput from "../IInput"

export default class IFocus extends IInput {

    /** @type {(e: FocusEvent) => void} */
    #focusHandler

    /** @type {(e: FocusEvent) => void} */
    #focusoutHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus ??= true
        super(target, blueprint, options)
        const self = this
        this.#focusHandler = e => {
            e.preventDefault()
            this.focused()
        }
        this.#focusoutHandler = e => {
            e.preventDefault()
            this.unfocused()
        }
    }

    listenEvents() {
        this.target.addEventListener("focus", this.#focusHandler)
        this.target.addEventListener("focusout", this.#focusoutHandler)
    }

    unlistenEvents() {
        this.target.removeEventListener("focus", this.#focusHandler)
        this.target.removeEventListener("focusout", this.#focusoutHandler)
    }

    focused() {
    }

    unfocused() {
    }
}