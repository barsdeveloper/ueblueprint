// @ts-check

import ExecPinTemplate from "../template/ExecPinTemplate"
import IElement from "./IElement"
import LinkElement from "./LinkElement"
import PinTemplate from "../template/PinTemplate"
import StringPinTemplate from "../template/StringPinTemplate"

/**
 * @typedef {import("../entity/GuidEntity").default} GuidEntity
 * @typedef {import("../entity/PinEntity").default} PinEntity
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 * @typedef {import("./NodeElement").default} NodeElement
 */

/**
 * @extends {IElement<PinEntity, PinTemplate>}
 */
export default class PinElement extends IElement {

    static #typeTemplateMap = {
        "exec": ExecPinTemplate,
        "string": StringPinTemplate,
    }

    #color = ""

    /** @type {NodeElement} */
    nodeElement

    /** @type {HTMLElement} */
    clickableElement

    connections = 0

    constructor(entity) {
        super(
            entity,
            new (PinElement.#typeTemplateMap[entity.getType()] ?? PinTemplate)()
        )
    }

    connectedCallback() {
        super.connectedCallback()
        this.#color = window.getComputedStyle(this).getPropertyValue("--ueb-pin-color")
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

    isLinked() {
        return this.entity.isLinked()
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
        return this.entity.LinkedTo ?? []
    }

    sanitizeLinks() {
        this.entity.LinkedTo = this.getLinks().filter(pinReference => {
            let pin = this.blueprint.getPin(pinReference)
            if (pin) {
                let link = this.blueprint.getLink(this, pin, true)
                if (!link) {
                    this.blueprint.addGraphElement(new LinkElement(this, pin))
                }
            }
            return pin
        })
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

    /**
     * 
     * @param {PinElement} originalPinElement
     * @param {PinReferenceEntity} newReference
     */
    redirectLink(originalPinElement, newReference) {
        const index = this.entity.LinkedTo.findIndex(pinReference =>
            pinReference.objectName.toString() == originalPinElement.getPinName()
            && pinReference.pinGuid == originalPinElement.entity.PinId
        )
        if (index >= 0) {
            this.entity.LinkedTo[index] = newReference
            return true
        }
        return false
    }
}

customElements.define("ueb-pin", PinElement)
