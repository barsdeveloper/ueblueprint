import { html, nothing } from "lit"
import SVGIcon from "../../SVGIcon.js"
import ElementFactory from "../../element/ElementFactory.js"
import NodeTemplate from "./NodeTemplate.js"

export default class VariableManagementNodeTemplate extends NodeTemplate {

    #hasInput = false
    #hasOutput = false
    #displayName = ""

    static nodeStyleClasses = ["ueb-node-style-glass"]

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element)
        this.#displayName = this.element.nodeDisplayName
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
                    ${this.#hasInput ? html`
                        <div class="ueb-node-inputs"></div>
                    ` : nothing}
                    ${this.#hasOutput ? html`
                        <div class="ueb-node-outputs"></div>
                    ` : nothing}
                    ${this.pinInserter ? html`
                        <div class="ueb-node-variadic" @click="${this.addPinHandler}">
                            Add pin ${SVGIcon.plusCircle}
                        </div>
                    `: nothing}
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
