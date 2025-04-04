import { html, nothing } from "lit"
import Configuration from "../../Configuration.js"
import ElementFactory from "../../element/ElementFactory.js"
import MinimalPinTemplate from "../pin/MinimalPinTemplate.js"
import NodeTemplate from "./NodeTemplate.js"

export default class EventNodeTemplate extends NodeTemplate {

    static nodeStyleClasses = [...super.nodeStyleClasses, "ueb-node-style-event"]
    #delegatePinElement

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.element.querySelector(".ueb-node-top").appendChild(this.createDelegatePinElement())
    }

    renderTop() {
        const icon = this.renderNodeIcon()
        const name = this.renderNodeName()
        const customEvent = this.element.getType() === Configuration.paths.customEvent
            && (this.element.entity.CustomFunctionName || this.element.entity.FunctionReference.MemberParent)
        return html`
            <div class="ueb-node-name">
                ${icon ? html`
                    <div class="ueb-node-name-symbol">${icon}</div>
                ` : nothing}
                ${name ? html`
                    <div class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                        ${name}
                        ${customEvent ? html`
                            <div class="ueb-node-subtitle-text ueb-ellipsis-nowrap-text">
                                Custom Event
                            </div>
                        `: nothing}
                    </div>
                ` : nothing}
            </div>
        `
    }

    getPinElements() {
        return this.element.getPinElements().filter(v => v.entity.PinType.PinCategory?.toString() !== "delegate")
    }

    createDelegatePinElement() {
        if (!this.#delegatePinElement) {
            this.#delegatePinElement = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
                .newObject(
                    this.element.getPinEntities().find(v => !v.isHidden() && v.PinType.PinCategory?.toString() === "delegate"),
                    new MinimalPinTemplate(),
                    this.element
                )
            this.#delegatePinElement.template.isNameRendered = false
        }
        return this.#delegatePinElement
    }

    createPinElements() {
        return [
            this.createDelegatePinElement(),
            ...this.element.getPinEntities()
                .filter(v => !v.isHidden() && v.PinType.PinCategory?.toString() !== "delegate")
                .map(pinEntity => /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
                    .newObject(pinEntity, undefined, this.element)
                )
        ]
    }
}
