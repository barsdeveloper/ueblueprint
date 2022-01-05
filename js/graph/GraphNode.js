import NodeTemplate from "../template/NodeTemplate"
import ObjectEntity from "../entity/ObjectEntity"
import SelectableDraggable from "./SelectableDraggable"
import SerializerFactory from "../serialization/SerializerFactory"
import PinEntity from "../entity/PinEntity"

export default class GraphNode extends SelectableDraggable {

    /**
     * 
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
        return new GraphNode(entity)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.dispatchDeleteEvent()
    }

    /**
     * 
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
        let dragEvent = new CustomEvent("ueb-node-delete", {
            bubbles: true,
            cancelable: true,
        })
        this.dispatchEvent(dragEvent)
    }
}

customElements.define("ueb-node", GraphNode)
