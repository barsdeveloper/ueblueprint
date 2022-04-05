// @ts-check

import Configuration from "../Configuration"
import ISelectableDraggableElement from "./ISelectableDraggableElement"
import NodeTemplate from "../template/NodeTemplate"
import ObjectEntity from "../entity/ObjectEntity"
import PinEntity from "../entity/PinEntity"
import SerializerFactory from "../serialization/SerializerFactory"
import PinReferenceEntity from "../entity/PinReferenceEntity"

/**
 * @extends {ISelectableDraggableElement<ObjectEntity, NodeTemplate>}
 */
export default class NodeElement extends ISelectableDraggableElement {

    static tagName = "ueb-node"

    /**
     * @param {ObjectEntity} entity
     */
    constructor(entity) {
        super(entity, new NodeTemplate())
        this.dragLinkObjects = []
        super.setLocation([this.entity.NodePosX.value, this.entity.NodePosY.value])
    }

    static fromSerializedObject(str) {
        let entity = SerializerFactory.getSerializer(ObjectEntity).read(str)
        return new NodeElement(entity)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.dispatchDeleteEvent()
    }

    getNodeName() {
        return this.entity.getFullName()
    }

    /**
     * @param {String} name
     */
    rename(name) {
        if (this.entity.Name == name) {
            return false
        }
        this.getPinElements().forEach(sourcePinElement =>
            sourcePinElement.getLinks().forEach(targetPinReference =>
                this.blueprint.getPin(targetPinReference).redirectLink(sourcePinElement, new PinReferenceEntity({
                    objectName: name,
                    pinGuid: sourcePinElement.entity.PinId,
                }))
            ))
        this.entity.Name = name
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

    connectedCallback() {
        const type = this.getAttribute("type")?.trim()
        super.connectedCallback()
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
}

customElements.define("ueb-node", NodeElement)
