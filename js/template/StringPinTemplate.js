import html from "./html"
import PinTemplate from "./PinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */
export default class StringPinTemplate extends PinTemplate {

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        const stopEventPropagation = "e => stopPropagation()"
        return html`
            <span class="ueb-pin-input">
                <span class="ueb-pin-input-content" role="textbox" contenteditable="true"
                    onkeydown="${stopEventPropagation}" onkeyup="${stopEventPropagation}"
                    oncopy="${stopEventPropagation}" onpaste="${stopEventPropagation}"></span>
            </span>
        `
    }
}
