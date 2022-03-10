import Configuration from "../Configuration"
import ISelectableDraggableElement from "./ISelectableDraggableElement"
import NodeTemplate from "../template/NodeTemplate"
import ObjectEntity from "../entity/ObjectEntity"
import PinEntity from "../entity/PinEntity"
import SerializerFactory from "../serialization/SerializerFactory"

export default class NodeElement extends ISelectableDraggableElement {

    static tagName = "ueb-node"

    /**
     * @param {ObjectEntity} entity
     */
    constructor(entity) {
        super(entity, new NodeTemplate())
        /** @type {ObjectEntity} */
        this.entity
        this.dragLinkObjects = []
        super.setLocation([this.entity.NodePosX, this.entity.NodePosY])
    }

    static fromSerializedObject(str) {
        let entity = SerializerFactory.getSerializer(ObjectEntity).read(str)
        return new NodeElement(entity)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.dispatchDeleteEvent()
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
        this.entity.NodePosX = new nodeType(value[0])
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

customElements.define(NodeElement.tagName, NodeElement)
