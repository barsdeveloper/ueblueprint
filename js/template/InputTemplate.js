import FocusTextEdit from "../input/common/FocusTextEdit"
import ITemplate from "./ITemplate"

/** @typedef {import ("../element/InputElement").default} InputElement */

/** @extends {ITemplate<InputElement>} */
export default class InputTemplate extends ITemplate {

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new FocusTextEdit(this.element, this.element.blueprint),
        ]
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.element.classList.add("ueb-pin-input-content")
        this.element.setAttribute("role", "textbox")
        this.element.contentEditable = "true"
    }
}