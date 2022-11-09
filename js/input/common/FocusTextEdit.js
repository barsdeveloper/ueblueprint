import IFocus from "./IFocus"

export default class FocusTextEdit extends IFocus {

    focused() {
        this.blueprint.dispatchEditTextEvent(true)
    }

    unfocused() {
        document.getSelection()?.removeAllRanges() // Deselect eventually selected text inside the input
        this.blueprint.dispatchEditTextEvent(false)
    }
}