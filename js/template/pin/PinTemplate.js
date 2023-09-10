import { html, nothing } from "lit"
import Configuration from "../../Configuration.js"
import ITemplate from "../ITemplate.js"
import MouseCreateLink from "../../input/mouse/MouseCreateLink.js"
import SVGIcon from "../../SVGIcon.js"
import Utility from "../../Utility.js"
import VariableConversionNodeTemplate from "../node/VariableConversionNodeTemplate.js"
import VariableOperationNodeTemplate from "../node/VariableOperationNodeTemplate.js"

/**
 * @typedef {import("../../input/IInput.js").default} IInput
 * @typedef {import("lit").PropertyValues} PropertyValues
 */
/**
 * @template T
 * @typedef {import("../../element/PinElement.js").default<T>} PinElement
 */

/**
 * @template T
 * @extends ITemplate<PinElement<T>>
 */
export default class PinTemplate extends ITemplate {

    static canWrapInput = true

    /** @type {HTMLElement} */
    #iconElement
    get iconElement() {
        return this.#iconElement
    }

    /** @type {HTMLElement} */
    #wrapperElement
    get wrapperElement() {
        return this.#wrapperElement
    }

    isNameRendered = true

    /** @param {PinElement<T>} element */
    initialize(element) {
        super.initialize(element)
        if (this.element.nodeElement) {
            const nodeTemplate = this.element.nodeElement.template
            this.isNameRendered = !(
                nodeTemplate instanceof VariableConversionNodeTemplate
                || nodeTemplate instanceof VariableOperationNodeTemplate
            )
        }
    }

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
            new MouseCreateLink(this.element, this.blueprint, {
                moveEverywhere: true,
                draggableElement: this.getClickableElement(),
            })
        ]
    }

    render() {
        const icon = html`<div class="ueb-pin-icon">${this.renderIcon()}</div>`
        const content = html`
            <div class="ueb-pin-content">
                ${this.isNameRendered ? this.renderName() : nothing}
                ${this.isInputRendered() ? this.renderInput() : html``}
            </div>
        `
        return html`
            <div class="ueb-pin-wrapper">
                ${this.element.isInput() ? html`${icon}${content}` : html`${content}${icon}`}
            </div>
        `
    }

    renderIcon() {
        if (this.element.nodeElement.entity.isPcg()) {
            switch (this.element.entity.getType()) {
                case "Any":
                case "Point":
                case "Spatial":
                case "Surface":
                    return SVGIcon.pcgPin
                case "Any[]":
                case "Point[]":
                case "Spatial[]":
                case "Surface[]":
                    return SVGIcon.pcgPinStack
            }
        }
        switch (this.element.entity.PinType.ContainerType?.toString()) {
            case "Array": return SVGIcon.array
            case "Set": return SVGIcon.set
            case "Map": return SVGIcon.map
        }
        if (this.element.entity.PinType.PinCategory.toLocaleLowerCase() === "delegate") {
            return SVGIcon.delegate
        }
        return SVGIcon.genericPin
    }

    renderName() {
        let name = this.element.getPinDisplayName()
        const nodeElement = this.element.nodeElement
        const pinName = this.element.getPinName()
        if (
            nodeElement.getType() == Configuration.paths.makeStruct
            && pinName == nodeElement.entity.StructType.getName()
        ) {
            name = pinName
        }
        return html`
            <span class="ueb-pin-name ueb-ellipsis-nowrap-text">${name}</span>
        `
    }

    isInputRendered() {
        return this.element.isInput()
            && !this.element.entity.bDefaultValueIsIgnored
            && !this.element.entity.PinType.bIsReference
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
            this.element.requestUpdate()
            this.element.updateComplete.then(() => node.acknowledgeReflow())
        }
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.element.style.setProperty("--ueb-pin-color-rgb", this.element.entity.pinColor().cssText)
        this.#iconElement = this.element.querySelector(".ueb-pin-icon svg") ?? this.element
        this.#wrapperElement = this.element.querySelector(".ueb-pin-wrapper")
    }

    getLinkLocation() {
        const rect = this.iconElement.getBoundingClientRect()
        const boundingLocation = [this.element.isInput() ? rect.left : rect.right + 1, (rect.top + rect.bottom) / 2]
        const location = Utility.convertLocation(boundingLocation, this.blueprint.template.gridElement)
        return this.blueprint.compensateTranslation(location[0], location[1])
    }

    getClickableElement() {
        return this.#wrapperElement ?? this.element
    }
}
