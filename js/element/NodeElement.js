// @ts-check

import Configuration from "../Configuration"
import IdentifierEntity from "../entity/IdentifierEntity"
import ISelectableDraggableElement from "./ISelectableDraggableElement"
import NodeTemplate from "../template/NodeTemplate"
import ObjectEntity from "../entity/ObjectEntity"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import SerializerFactory from "../serialization/SerializerFactory"

/**
 * @extends {ISelectableDraggableElement<ObjectEntity, NodeTemplate>}
 */
export default class NodeElement extends ISelectableDraggableElement {

    /**
     * @param {ObjectEntity} entity
     */
    constructor(entity) {
        super(entity, new NodeTemplate())
        this.dragLinkObjects = []
        super.setLocation([this.entity.NodePosX.value, this.entity.NodePosY.value])
    }

    /**
     * @param {String} str
     */
    static fromSerializedObject(str) {
        str = str.trim()
        let entity = SerializerFactory.getSerializer(ObjectEntity).deserialize(str)
        return new NodeElement(entity)
    }

    connectedCallback() {
        const type = this.getAttribute("type")?.trim()
        super.connectedCallback()
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.dispatchDeleteEvent()
    }

    getNodeName() {
        return this.entity.getObjectName()
    }

    getNodeDisplayName() {
        return this.entity.getDisplayName()
    }

    sanitizeLinks() {
        this.getPinElements().forEach(pin => pin.sanitizeLinks())
    }

    /**
     * @param {String} name
     */
    rename(name) {
        if (this.entity.Name == name) {
            return false
        }
        for (let sourcePinElement of this.getPinElements()) {
            for (let targetPinReference of sourcePinElement.getLinks()) {
                this.blueprint.getPin(targetPinReference).redirectLink(sourcePinElement, new PinReferenceEntity({
                    objectName: name,
                    pinGuid: sourcePinElement.entity.PinId,
                }))
            }
        }
        this.entity.Name = name
        this.template.applyRename(this)
    }

    getPinElements() {
        return this.template.getPinElements(this)
    }

    /**
     * @returns {PinEntity[]}
     */
    getPinEntities() {
        return this.entity.CustomProperties.filter(v => v instanceof PinEntity)
    }

    setLocation(value = [0, 0]) {
        let nodeType = this.entity.NodePosX.constructor
        // @ts-expect-error
        this.entity.NodePosX = new nodeType(value[0])
        // @ts-expect-error
        this.entity.NodePosY = new nodeType(value[1])
        super.setLocation(value)
    }

    dispatchDeleteEvent(value) {
        let deleteEvent = new CustomEvent(Configuration.nodeDeleteEventName, {
            bubbles: true,
            cancelable: true,
        })
        this.dispatchEvent(deleteEvent)
    }

    setShowAdvancedPinDisplay(value) {
        this.entity.AdvancedPinDisplay = new IdentifierEntity(value ? "Shown" : "Hidden")
        this.template.applyAdvancedPinDisplay(this)
    }

    toggleShowAdvancedPinDisplay() {
        this.setShowAdvancedPinDisplay(this.entity.AdvancedPinDisplay.value != "Shown")
    }
}

customElements.define("ueb-node", NodeElement)
