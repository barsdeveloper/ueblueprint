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
        return html`
            <span class="ueb-pin-input" role="textbox" contenteditable="true"></span>
        `
    }
}
