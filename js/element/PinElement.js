import IElement from "./IElement"
import MouseCreateLink from "../input/mouse/MouseCreateLink"
import PinTemplate from "../template/PinTemplate"

/**
 * @typedef {import("./NodeElement").default} NodeElement
 * @typedef {import("../entity/GuidEntity").default} GuidEntity
 */
export default class PinElement extends IElement {

    static tagName = "ueb-pin"

    /** @type {NodeElement} */
    nodeElement

    /** @type {HTMLElement} */
    clickableElement

    /** @type {String} */
    #color

    constructor(entity) {
        super(entity, new PinTemplate())
        /** @type {import("../entity/PinEntity").default} */
        this.entity
        /** @type {PinTemplate} */
        this.template
    }

    connectedCallback() {
        super.connectedCallback()
        this.#color = window.getComputedStyle(this).getPropertyValue("--ueb-pin-color")
    }

    createInputObjects() {
        return [
            new MouseCreateLink(this.clickableElement, this.blueprint, {
                moveEverywhere: true,
                looseTarget: true
            }),
        ]
    }

    /** @return {GuidEntity} */
    GetPinId() {
        return this.entity.PinId
    }

    /** @return {String} */
    GetPinIdValue() {
        return this.GetPinId().value
    }

    /**
     * @returns {String}
     */
    getPinName() {
        return this.entity.PinName
    }

    /**
     * @returns {String}
     */
    getPinDisplayName() {
        return this.entity.PinName
    }

    isInput() {
        return this.entity.isInput()
    }

    isOutput() {
        return this.entity.isOutput()
    }

    isConnected() {
        return this.entity.isConnected()
    }

    getType() {
        return this.entity.getType()
    }

    getClickableElement() {
        return this.clickableElement
    }

    getColor() {
        return this.#color
    }

    /**
     * Returns The exact location where the link originates from or arrives at.
     * @returns {Number[]} The location array
     */
    getLinkLocation() {
        return this.template.getLinkLocation(this)
    }

    /**
     * @returns {NodeElement}
     */
    getNodeElement() {
        return this.closest("ueb-node")
    }

    getLinks() {
        return this.entity.LinkedTo?.map(pinReference =>
            pinReference
        ) ?? []
    }

    /**
     * @param {PinElement} targetPinElement
     */
    linkTo(targetPinElement) {
        this.entity.linkTo(targetPinElement.nodeElement.getNodeName(), targetPinElement.entity)
        this.template.applyConnected(this)
    }

    /**
     * @param {PinElement} targetPinElement
     */
    unlinkFrom(targetPinElement) {
        this.entity.unlinkFrom(targetPinElement.nodeElement.getNodeName(), targetPinElement.entity)
        this.template.applyConnected(this)
    }
}

customElements.define(PinElement.tagName, PinElement)
