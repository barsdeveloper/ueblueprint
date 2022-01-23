import Utility from "../Utility"
import html from "./html"
import sanitizeText from "./sanitizeText"
import Template from "./Template"

/**
 * @typedef {import("../graph/GraphPin").default} GraphPin
 */
export default class PinTemplate extends Template {

    /**
     * Computes the html content of the pin.
     * @param {GraphPin} pin Pin entity 
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
     * @param {GraphPin} pin Element of the graph
     */
    apply(pin) {
        super.apply(pin)
        pin.classList.add(
            "ueb-node-" + (pin.isInput() ? "input" : pin.isOutput() ? "output" : "hidden"), "ueb-node-value-" + sanitizeText(pin.getType()))
        pin.clickableElement = pin
    }

    /**
     * 
     * @param {GraphPin} pin 
     * @returns 
     */
    getLinkLocation(pin) {
        const rect = pin.querySelector(".ueb-node-value-icon").getBoundingClientRect()
        return Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            pin.blueprint.gridElement)
    }
}
