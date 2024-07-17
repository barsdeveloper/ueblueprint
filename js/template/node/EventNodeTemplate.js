import { html, nothing } from "lit"
import Configuration from "../../Configuration.js"
import ElementFactory from "../../element/ElementFactory.js"
import MinimalPinTemplate from "../pin/MinimalPinTemplate.js"
import NodeTemplate from "./NodeTemplate.js"

export default class EventNodeTemplate extends NodeTemplate {

    static nodeStyleClasses = [...super.nodeStyleClasses, "ueb-node-style-event"]

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

    createDelegatePinElement() {
        const pin = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin")).newObject(
            this.element.getPinEntities().find(v => !v.isHidden() && v.PinType.PinCategory?.valueOf() === "delegate"),
            new MinimalPinTemplate(),
            this.element
        )
        pin.template.isNameRendered = false
        return pin
    }

    createPinElements() {
        return this.element.getPinEntities()
            .filter(v => !v.isHidden() && v.PinType.PinCategory !== "delegate")
            .map(pinEntity => /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
                .newObject(pinEntity, undefined, this.element)
            )
    }
}
