import html from "./html"
import Template from "./Template"

/**
 * @typedef {import("../entity/PinEntity").default} PinEntity
 */
export default class PinTemplate extends Template {

    /**
     * Computes the template for a pin in case it is an input.
     * @param {PinEntity} pin Pin entity 
     * @returns The result html 
     */
    renderInputPin(pin) {
        return html`
            <div class="ueb-node-input ueb-node-value-${pin.getType()}">
                <span class="ueb-node-value-icon ${pin.isConnected() ? 'ueb-node-value-fill' : ''}"></span>
                ${pin.getPinDisplayName()}
            </div>
        `
    }

    /**
     * Computes the template for a pin in case it is an output.
     * @param {PinEntity} pin Pin entity 
     * @returns The result html 
     */
    renderOutputPin(pin) {
        return html`
            <div class="ueb-node-output ueb-node-value-${pin.getType()}">
                ${output.getPinDisplayName()}
                <span class="ueb-node-value-icon ${pin.isConnected() ? 'ueb-node-value-fill' : ''}"></span>
            </div>
        `
    }

    /**
     * Computes the html content of the pin.
     * @param {PinEntity} pin Pin entity 
     * @returns The result html 
     */
    render(pin) {
        if (pin.isInput()) {
            return this.renderInputPin(pin)
        }
        if (pin.isOutput()) {
            return this.renderOutputPin(pin)
        }
        return ""
    }
}
