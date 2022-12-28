import { html, nothing } from "lit"
import Configuration from "../../Configuration"
import ITemplate from "../ITemplate"
import MouseCreateLink from "../../input/mouse/MouseCreateLink"
import SVGIcon from "../../SVGIcon"
import Utility from "../../Utility"
import VariableConversionNodeTemplate from "../node/VariableConversionNodeTemplate"
import VariableOperationNodeTemplate from "../node/VariableOperationNodeTemplate"

/**
 * @typedef {import("../../input/IInput").default} IInput
 * @typedef {import("lit").PropertyValues} PropertyValues
 */
/**
 * @template T
 * @typedef {import("../../element/PinElement").default<T>} PinElement
 */

/**
 * @template T
 * @extends ITemplate<PinElement<T>>
 */
export default class PinTemplate extends ITemplate {

    /** @type {HTMLElement} */
    #iconElement
    get iconElement() {
        return this.#iconElement
    }

    isNameRendered = true

    setup() {
        super.setup()
        this.element.nodeElement = this.element.closest("ueb-node")
        const nodeTemplate = this.element.nodeElement.template
        if (
            nodeTemplate instanceof VariableConversionNodeTemplate
            || nodeTemplate instanceof VariableOperationNodeTemplate
        ) {
            this.isNameRendered = false
            this.element.requestUpdate()
        }
    }

    /** @returns {IInput[]} */
    createInputObjects() {
        return [
            new MouseCreateLink(this.getClickableElement(), this.blueprint, {
                moveEverywhere: true,
            })
        ]
    }

    render() {
        const icon = html`<div class="ueb-pin-icon">${this.renderIcon()}</div>`
        const content = html`
            <div class="ueb-pin-content">
                ${this.isNameRendered ? this.renderName() : nothing}
                ${this.element.isInput() && !this.element.entity.bDefaultValueIsIgnored ? this.renderInput() : html``}
            </div>
        `
        return html`
            <div class="ueb-pin-wrapper">
                ${this.element.isInput() ? html`${icon}${content}` : html`${content}${icon}`}
            </div>
        `
    }

    renderIcon() {
        return SVGIcon.genericPin
    }

    renderName() {
        return html`
            <span class="ueb-pin-name">${this.element.getPinDisplayName()}</span>
        `
    }

    renderInput() {
        return html``
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties)
        if (this.element.isInput() && changedProperties.has("isLinked")) {
            // When connected, an input may drop its input fields which means the node has to reflow
            const node = this.element.nodeElement
            node.addNextUpdatedCallbacks(() => node.acknowledgeReflow())
            node.requestUpdate()
        }
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.element.style.setProperty("--ueb-pin-color-rgb", Configuration.getPinColor(this.element).cssText)
        this.#iconElement = this.element.querySelector(".ueb-pin-icon svg") ?? this.element
    }

    getLinkLocation() {
        const rect = this.iconElement.getBoundingClientRect()
        const location = Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            this.blueprint.template.gridElement
        )
        return this.blueprint.compensateTranslation(location)
    }

    getClickableElement() {
        return this.element
    }
}
