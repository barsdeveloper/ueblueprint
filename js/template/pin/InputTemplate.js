import ITemplate from "../ITemplate"

/** @typedef {import ("../../element/InputElement").default} InputElement */

/** @extends {ITemplate<InputElement>} */
export default class InputTemplate extends ITemplate {

    #focusHandler = () => {
        this.element.blueprint.acknowledgeEditText(true)
        if (this.element.selectOnFocus) {
            getSelection().selectAllChildren(this.element)
        }
    }
    #focusoutHandler = () => {
        this.element.blueprint.acknowledgeEditText(false)
        document.getSelection()?.removeAllRanges() // Deselect eventually selected text inside the input
    }
    #inputSingleLineHandler =
        /** @param {InputEvent} e */
        e =>  /** @type {HTMLElement} */(e.target).querySelectorAll("br").forEach(br => br.remove())
    #onKeydownBlurOnEnterHandler =
        /** @param {KeyboardEvent} e */
        e => {
            if (e.code == "Enter" && !e.shiftKey) {
                    /** @type {HTMLElement} */(e.target).blur()
            }
        }

    /** @param {InputElement} element */
    constructed(element) {
        super.constructed(element)
        this.element.classList.add("ueb-pin-input-content")
        this.element.setAttribute("role", "textbox")
        this.element.contentEditable = "true"
    }

    connectedCallback() {
        this.element.addEventListener("focus", this.#focusHandler)
        this.element.addEventListener("focusout", this.#focusoutHandler)
        if (this.element.singleLine) {
            this.element.addEventListener("input", this.#inputSingleLineHandler)
        }
        if (this.element.blurOnEnter) {
            this.element.addEventListener("keydown", this.#onKeydownBlurOnEnterHandler)
        }
    }

    cleanup() {
        this.element.removeEventListener("focus", this.#focusHandler)
        this.element.removeEventListener("focusout", this.#focusoutHandler)
        if (this.element.singleLine) {
            this.element.removeEventListener("input", this.#inputSingleLineHandler)
        }
        if (this.element.blurOnEnter) {
            this.element.removeEventListener("keydown", this.#onKeydownBlurOnEnterHandler)
        }
    }
}
