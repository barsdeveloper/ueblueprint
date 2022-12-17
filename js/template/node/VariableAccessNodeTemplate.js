import { html, nothing } from "lit"
import ElementFactory from "../../element/ElementFactory"
import NodeTemplate from "./NodeTemplate"

/**
 * @typedef {import("../../element/NodeElement").default} NodeElement
 * @typedef {import("../../element/PinElement").default} PinElement
 */

export default class VariableAccessNodeTemplate extends NodeTemplate {

    #hasInput = false
    #hasOutput = false
    #displayName = ""

    /** @param {NodeElement} element */
    constructed(element) {
        super.constructed(element)
        this.element.classList.add("ueb-node-style-glass")
        this.#displayName = this.element.getNodeDisplayName()
    }

    render() {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    ${this.#displayName ? html`
                        <div class="ueb-node-top">
                            <div class="ueb-node-name">
                                <span class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                                    ${this.#displayName}
                                </span>
                            </div>
                        </div>
                    ` : nothing}
                    <div class="ueb-node-content">
                        ${this.#hasInput ? html`
                            <div class="ueb-node-inputs"></div>
                        ` : nothing}
                        ${this.#hasOutput ? html`
                            <div class="ueb-node-outputs"></div>
                        ` : nothing}
                    </div>
                </div>
            </div>
        `
    }

    createPinElements() {
        return this.element.getPinEntities()
            .filter(v => !v.isHidden())
            .map(v => {
                this.#hasInput ||= v.isInput()
                this.#hasOutput ||= v.isOutput()
                return /** @type {PinElement} */(
                    new (ElementFactory.getConstructor("ueb-pin"))(v, undefined, this.element)
                )
            })
    }

    setupPins() {
        super.setupPins()
        let outputPin = this.element.getPinElements().find(p => !p.entity.isHidden() && !p.entity.isExecution())
        this.element.style.setProperty("--ueb-node-color", outputPin.getColor().cssText)
    }
}
