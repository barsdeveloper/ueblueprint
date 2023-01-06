import { css, html, nothing } from "lit"
import Configuration from "../../Configuration"
import ElementFactory from "../../element/ElementFactory"
import ISelectableDraggableTemplate from "../ISelectableDraggableTemplate"
import SVGIcon from "../../SVGIcon"
import Utility from "../../Utility"

/**
 * @typedef {import("../../element/NodeElement").default} NodeElement
 * @typedef {import("../../element/PinElement").default} PinElement
 * @typedef {import("../../element/PinElement").PinElementConstructor} PinElementConstructor
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

/** @extends {ISelectableDraggableTemplate<NodeElement>} */
export default class NodeTemplate extends ISelectableDraggableTemplate {

    /** @typedef {typeof NodeTemplate} NodeTemplateConstructor */

    #hasTargetInputNode = false

    static nodeStyleClasses = ["ueb-node-style-default"]

    toggleAdvancedDisplayHandler = () => {
        this.element.toggleShowAdvancedPinDisplay()
        this.element.addNextUpdatedCallbacks(() => this.element.acknowledgeReflow(), true)
    }

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element)
        this.element.classList.add(.../** @type {NodeTemplateConstructor} */(this.constructor).nodeStyleClasses)
        this.element.style.setProperty("--ueb-node-color", this.getColor().cssText)
    }

    getColor() {
        return Configuration.nodeColor(this.element)
    }

    render() {
        const icon = this.renderNodeIcon()
        const name = this.renderNodeName()
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top">
                        <div class="ueb-node-name">
                            ${icon ? html`
                                <div class="ueb-node-name-symbol">${icon}</div>
                            ` : nothing}
                            ${name ? html`
                                <div class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                                    ${name}
                                    ${this.#hasTargetInputNode && this.element.entity.FunctionReference.MemberParent ? html`
                                        <div class="ueb-node-subtitle-text ueb-ellipsis-nowrap-text">
                                            Target is ${Utility.formatStringName(this.element.entity.FunctionReference.MemberParent.getName())}
                                        </div>
                                    `: nothing}
                                </div>
                            ` : nothing}
                        </div>
                    </div>
                    <div class="ueb-node-content">
                        <div class="ueb-node-inputs"></div>
                        <div class="ueb-node-outputs"></div>
                    </div>
                    ${this.element.enabledState?.toString() == "DevelopmentOnly" ? html`
                        <div class="ueb-node-developmentonly">
                            <span class="ueb-node-developmentonly-text">Development Only</span>
                        </div>
                    ` : nothing}
                    ${this.element.advancedPinDisplay ? html`
                        <div class="ueb-node-expansion" @click="${this.toggleAdvancedDisplayHandler}">
                            ${SVGIcon.expandIcon}
                        </div>
                    ` : nothing}
                </div>
            </div>
        `
    }

    renderNodeIcon() {
        return Configuration.nodeIcon(this.element)
    }

    renderNodeName() {
        return this.element.getNodeDisplayName()
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.setupPins()
        this.element.updateComplete.then(() => this.element.acknowledgeReflow())
    }

    setupPins() {
        const inputContainer = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-inputs"))
        const outputContainer = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-outputs"))
        this.element.nodeNameElement = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-name-text"))
        this.element.getPinElements().forEach(p => {
            if (p.isInput()) {
                inputContainer.appendChild(p)
            } else if (p.isOutput()) {
                outputContainer.appendChild(p)
            }
        })
    }

    createPinElements() {
        return this.element.getPinEntities()
            .filter(v => !v.isHidden())
            .map(pinEntity => {
                if (!this.#hasTargetInputNode && pinEntity.getDisplayName() == "Target") {
                    this.#hasTargetInputNode = true
                }
                let pinElement = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
                    .newObject(pinEntity, undefined, this.element)
                return pinElement
            })
    }

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }

    linksChanged() { }
}
