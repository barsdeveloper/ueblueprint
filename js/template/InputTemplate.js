import ITemplate from "./ITemplate"

/** @typedef {import ("../element/InputElement").default} InputElement */

/** @extends {ITemplate<InputElement>} */
export default class InputTemplate extends ITemplate {

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.onFocusHandler =
            /** @param {FocusEvent} e */
            e => this.element.blueprint.dispatchEditTextEvent(true)
        this.onFocusOutHandler =
            /** @param {FocusEvent} e */
            e => {
                e.preventDefault()
                document.getSelection()?.removeAllRanges() // Deselect text inside the input
                this.element.blueprint.dispatchEditTextEvent(false)
            }
        this.element.addEventListener("focus", this.onFocusHandler)
        this.element.addEventListener("focusout", this.onFocusOutHandler)
    }
}