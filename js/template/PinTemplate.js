import html from "./html"
import ITemplate from "./ITemplate"
import sanitizeText from "./sanitizeText"
import Utility from "../Utility"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */
export default class PinTemplate extends ITemplate {

    /**
     * Computes the html content of the pin.
     * @param {PinElement} pin html element 
     * @returns The result html 
     */
    render(pin) {
        if (pin.isInput()) {
            return html`
                <span class="ueb-node-value-icon ${pin.isConnected() ? 'ueb-node-value-fill' : ''}"></span>
                ${sanitizeText(pin.getPinDisplayName())}
            `
        } else {
            return html`
                ${sanitizeText(pin.getPinDisplayName())}
                <span class="ueb-node-value-icon ${pin.isConnected() ? 'ueb-node-value-fill' : ''}"></span>
            `
        }
    }

    /**
     * Applies the style to the element.
     * @param {PinElement} pin element of the graph
     */
    apply(pin) {
        super.apply(pin)
        pin.classList.add(
            "ueb-node-" + (pin.isInput() ? "input" : pin.isOutput() ? "output" : "hidden"), "ueb-node-value-" + sanitizeText(pin.getType()))
        pin.clickableElement = pin
    }

    /**
     * 
     * @param {PinElement} pin 
     * @returns 
     */
    getLinkLocation(pin) {
        const rect = pin.querySelector(".ueb-node-value-icon").getBoundingClientRect()
        return pin.blueprint.compensateTranslation(Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            pin.blueprint.gridElement))
    }
}
