import { html, nothing } from "lit"
import ElementFactory from "../../element/ElementFactory"
import NodeTemplate from "./NodeTemplate"

/**
 * @typedef {import("../../element/NodeElement").default} NodeElement
 * @typedef {import("../../element/PinElement").PinElementConstructor} PinElementConstructor
 */

export default class VariableManagementNodeTemplate extends NodeTemplate {

    #hasInput = false
    #hasOutput = false
    #displayName = ""

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element)
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
                const result = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
                    .newObject(v, undefined, this.element)
                return result
            })
    }
}
