import { html } from "lit"
import Configuration from "../Configuration"
import ElementFactory from "../element/ElementFactory"
import KnotPinTemplate from "./KnotPinTemplate"
import NodeTemplate from "./NodeTemplate"

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class VariableNodeTemplate extends NodeTemplate {

    /** @param {NodeElement} element */
    constructed(element) {
        super.constructed(element)
        this.element.classList.add("ueb-node-type-variable")
    }

    render() {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-outputs"></div>
                </div>
            </div>
        `
    }

    setupPins() {
        super.setupPins()
        let outputPin = this.element.getPinElements().find(p => p.isOutput())
        this.element.style.setProperty("--ueb-node-color", outputPin.getColor().cssText)
    }
}
