import { html, nothing } from "lit"
import ElementFactory from "../../element/ElementFactory.js"
import ISelectableDraggableTemplate from "../ISelectableDraggableTemplate.js"
import SVGIcon from "../../SVGIcon.js"
import Utility from "../../Utility.js"

/**
 * @typedef {import("../../element/NodeElement.js").default} NodeElement
 * @typedef {import("../../element/PinElement.js").default} PinElement
 * @typedef {import("../../element/PinElement.js").PinElementConstructor} PinElementConstructor
 * @typedef {import("../../entity/PinEntity.js").default} PinEntity
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

/** @extends {ISelectableDraggableTemplate<NodeElement>} */
export default class NodeTemplate extends ISelectableDraggableTemplate {

    /** @typedef {typeof NodeTemplate} NodeTemplateConstructor */

    static nodeStyleClasses = ["ueb-node-style-default"]

    #hasSubtitle = false

    /** @type {() => PinEntity} */
    pinInserter

    /** @type {HTMLElement} */
    inputContainer

    /** @type {HTMLElement} */
    outputContainer

    /** @type {PinElement} */
    pinElement

    addPinHandler = () => {
        const pin = this.pinInserter?.()
        if (pin) {
            if (this.defaultPin && this.defaultPin.isInput() === pin.isInput()) {
                this.defaultPin.before(this.createPinElement(pin))
            } else {
                (pin.isInput() ? this.inputContainer : this.outputContainer).appendChild(this.createPinElement(pin))
            }
            this.element.acknowledgeReflow()
        }
    }

    toggleAdvancedDisplayHandler = () => {
        this.element.toggleShowAdvancedPinDisplay()
        this.element.requestUpdate()
        this.element.updateComplete.then(() => this.element.acknowledgeReflow())
    }

    /** @param {PinEntity} pinEntity */
    createPinElement(pinEntity) {
        const pinElement = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
            .newObject(pinEntity, undefined, this.element)
        if (this.pinInserter && !this.defaultPin && pinElement.getPinName() === "Default") {
            this.defaultPin = pinElement
            this.defaultPin.classList.add("ueb-node-variadic-default")
        }
        return pinElement
    }

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element)
        this.element.classList.add(.../** @type {NodeTemplateConstructor} */(this.constructor).nodeStyleClasses)
        this.element.style.setProperty("--ueb-node-color", this.getColor().cssText)
        this.pinInserter = this.element.entity.additionalPinInserter()
    }

    getColor() {
        return this.element.entity.nodeColor()
    }

    render() {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top">${this.renderTop()}</div>
                    <div class="ueb-node-inputs"></div>
                    <div class="ueb-node-outputs"></div>
                    ${this.pinInserter ? html`
                        <div class="ueb-node-variadic" @click="${this.addPinHandler}">
                            Add pin ${SVGIcon.plusCircle}
                        </div>
                    `: nothing}
                    ${this.element.entity.isDevelopmentOnly() ? html`
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
        return this.element.entity.nodeIcon()
    }

    renderNodeName() {
        return this.element.getNodeDisplayName()
    }

    renderTop() {
        const icon = this.renderNodeIcon()
        const name = this.renderNodeName()
        return html`
            <div class="ueb-node-name">
                ${icon ? html`
                    <div class="ueb-node-name-symbol">${icon}</div>
                ` : nothing}
                ${name ? html`
                    <div class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                        ${name}
                        ${this.#hasSubtitle && this.getTargetType().length > 0 ? html`
                            <div class="ueb-node-subtitle-text ueb-ellipsis-nowrap-text">
                                Target is ${Utility.formatStringName(this.getTargetType())}
                            </div>
                        `: nothing}
                    </div>
                ` : nothing}
            </div>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.inputContainer = this.element.querySelector(".ueb-node-inputs")
        this.outputContainer = this.element.querySelector(".ueb-node-outputs")
        this.setupPins()
        this.element.updateComplete.then(() => this.element.acknowledgeReflow())
    }

    setupPins() {
        this.element.nodeNameElement = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-name-text"))
        let hasInput = false
        let hasOutput = false
        for (const p of this.element.getPinElements()) {
            if (p === this.defaultPin) {
                continue
            }
            if (p.isInput()) {
                this.inputContainer.appendChild(p)
                hasInput = true
            } else if (p.isOutput()) {
                this.outputContainer.appendChild(p)
                hasOutput = true
            }
        }
        if (this.defaultPin) {
            (this.defaultPin.isInput() ? this.inputContainer : this.outputContainer).appendChild(this.defaultPin)
        }
        if (hasInput) {
            this.element.classList.add("ueb-node-has-inputs")
        }
        if (hasOutput) {
            this.element.classList.add("ueb-node-has-outputs")
        }
    }

    createPinElements() {
        return this.element.getPinEntities()
            .filter(v => !v.isHidden())
            .map(pinEntity => {
                this.#hasSubtitle = this.#hasSubtitle
                    || pinEntity.PinName === "self" && pinEntity.pinDisplayName() === "Target"
                return this.createPinElement(pinEntity)
            })
    }

    getTargetType() {
        return this.element.entity.FunctionReference?.MemberParent?.getName() ?? "Untitled"
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
