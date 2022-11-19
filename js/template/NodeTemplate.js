import { css, html, nothing } from "lit"
import Configuration from "../Configuration"
import ElementFactory from "../element/ElementFactory"
import ISelectableDraggableTemplate from "./ISelectableDraggableTemplate"
import SVGIcon from "../SVGIcon"

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("../element/PinElement").default} PinElement
 */

/** @extends {ISelectableDraggableTemplate<NodeElement>} */
export default class NodeTemplate extends ISelectableDraggableTemplate {

    static #nodeIcon = {
        [Configuration.nodeType.doN]: SVGIcon.doN,
        [Configuration.nodeType.dynamicCast]: SVGIcon.cast,
        [Configuration.nodeType.executionSequence]: SVGIcon.sequence,
        [Configuration.nodeType.forEachElementInEnum]: SVGIcon.loop,
        [Configuration.nodeType.forEachLoop]: SVGIcon.forEachLoop,
        [Configuration.nodeType.forEachLoopWithBreak]: SVGIcon.forEachLoop,
        [Configuration.nodeType.forLoop]: SVGIcon.loop,
        [Configuration.nodeType.forLoopWithBreak]: SVGIcon.loop,
        [Configuration.nodeType.ifThenElse]: SVGIcon.branchNode,
        [Configuration.nodeType.makeArray]: SVGIcon.makeArray,
        [Configuration.nodeType.whileLoop]: SVGIcon.loop,
        default: SVGIcon.functionSymbol
    }

    toggleAdvancedDisplayHandler = () => {
        this.element.toggleShowAdvancedPinDisplay()
        this.element.addNextUpdatedCallbacks(() => this.element.dispatchReflowEvent(), true)
    }

    getColor() {
        const functionColor = css`84, 122, 156`
        const pureFunctionColor = css`95, 129, 90`
        switch (this.element.entity.getClass()) {
            case Configuration.nodeType.callFunction:
                if (this.element.entity.bIsPureFunc) {
                    return pureFunctionColor
                }
                return functionColor
            case Configuration.nodeType.makeArray:
                return pureFunctionColor
            case Configuration.nodeType.macro:
            case Configuration.nodeType.executionSequence:
                return css`150,150,150`
            case Configuration.nodeType.dynamicCast:
                return css`46, 104, 106`

        }
        return functionColor
    }

    /** @param {NodeElement} element */
    constructed(element) {
        super.constructed(element)
        this.element.style.setProperty("--ueb-node-color", this.getColor().cssText)
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
                                <span class="ueb-node-name-symbol">${icon}</span>
                            ` : nothing}
                            ${name ? html`
                                <span class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                                    ${name}
                                </span>
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
        let icon = NodeTemplate.#nodeIcon[this.element.getType()]
        if (icon) {
            return icon
        }
        if (this.element.getNodeDisplayName().startsWith("Break")) {
            return SVGIcon.breakStruct
        }
        if (this.element.entity.getClass() === Configuration.nodeType.macro) {
            return SVGIcon.macro
        }
        return NodeTemplate.#nodeIcon.default
    }

    renderNodeName() {
        return this.element.getNodeDisplayName()
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.setupPins()
        Promise.all(this.element.getPinElements().map(n => n.updateComplete)).then(() => this.element.dispatchReflowEvent())
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

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }

    createPinElements() {
        return this.element.getPinEntities()
            .filter(v => !v.isHidden())
            .map(v => /** @type {PinElement} */(
                new (ElementFactory.getConstructor("ueb-pin"))(v, undefined, this.element)
            ))
    }

    linksChanged() { }
}
