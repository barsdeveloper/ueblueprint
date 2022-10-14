import IInputPinTemplate from "./IInputPinTemplate"

/** @typedef {import("../element/PinElement").default} PinElement */

export default class NamePinTemplate extends IInputPinTemplate {

    /** @type {(e : InputEvent) => void} */
    onInputHandler

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.onInputHandler = e => {
            e.stopPropagation()
            if (
                e.inputType == "insertParagraph"
                || e.inputType == "insertLineBreak"
                || (e.inputType == "insertFromPaste" && /** @type {HTMLElement} */(e.target).innerText.includes("\n"))
            ) {
                /** @type {HTMLElement} */(e.target).blur() // Loose focus in case it tries to insert newline
                this.inputContentElements.forEach(element => element.innerText = element.innerText.replaceAll("\n", ""))
            }
        }
        this.inputContentElements.forEach(element => {
            element.addEventListener("input", /** @type {(e : Event) => void} */(this.onInputHandler))
        })
    }

    cleanup() {
        super.cleanup()
        this.inputContentElements.forEach(element => {
            element.removeEventListener("input", /** @type {(e : Event) => void} */(this.onInputHandler))
        })
    }

    getInputs() {
        return this.inputContentElements.map(element => element.textContent) // textContent for performance reason
    }

    /** @param {String[]} values */
    setInputs(values = [], updateDefaultValue = true) {
        values = values.map(value => value.replaceAll("\n", "")) // get rid of the new lines
        super.setInputs(values, updateDefaultValue)
    }
}