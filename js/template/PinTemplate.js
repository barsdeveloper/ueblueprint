import { html } from "lit"
import Configuration from "../Configuration"
import ITemplate from "./ITemplate"
import MouseCreateLink from "../input/mouse/MouseCreateLink"
import Utility from "../Utility"

/** @typedef {import("../input/IInput").default} IInput */
/**
 * @template T
 * @typedef {import("../element/PinElement").default<T>} PinElement
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

    /** @param {PinElement<T>} element */
    constructed(element) {
        super.constructed(element)
        this.element.dataset.id = this.element.getPinId().toString()
    }

    connectedCallback() {
        super.connectedCallback()
        this.element.nodeElement = this.element.closest("ueb-node")
    }

    /** @returns {IInput[]} */
    createInputObjects() {
        return [
            new MouseCreateLink(this.getClickableElement(), this.element.blueprint, {
                moveEverywhere: true,
            })
        ]
    }

    render() {
        const icon = this.renderIcon()
        const content = html`
            <div class="ueb-pin-content">
                ${this.renderName()}
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
        return html`
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="ueb-pin-icon">
                <circle class="ueb-pin-tofill" cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="5" />
                <path d="M 34 6 L 34 26 L 42 16 Z" fill="currentColor" />
            </svg>
        `
    }

    renderName() {
        return html`
            <span class="ueb-pin-name">${this.element.getPinDisplayName()}</span>
        `
    }

    renderInput() {
        return html``
    }

    /** @param {Map} changedProperties */
    updated(changedProperties) {
        if (this.element.isInput() && changedProperties.has("isLinked")) {
            // When connected, an input may drop its input fields which means the node has to reflow
            const node = this.element.nodeElement
            node.addNextUpdatedCallbacks(() => node.dispatchReflowEvent())
            node.requestUpdate()
        }
    }


    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.element.style.setProperty("--ueb-pin-color-rgb", Configuration.pinColor[this.element.pinType])
        this.#iconElement = this.element.querySelector(".ueb-pin-icon") ?? this.element
    }

    getLinkLocation() {
        const rect = this.iconElement.getBoundingClientRect()
        const location = Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            this.element.blueprint.gridElement
        )
        return this.element.blueprint.compensateTranslation(location)
    }

    getClickableElement() {
        return this.element
    }
}
