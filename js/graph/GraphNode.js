import NodeTemplate from "../template/NodeTemplate"
import ObjectEntity from "../entity/ObjectEntity"
import SelectableDraggable from "./SelectableDraggable"
import SerializerFactory from "../serialization/SerializerFactory"
import DragLink from "../input/DragLink"
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
        this.graphNodeName = "n/a"
        this.dragLinkObjects = []
        super.setLocation([this.entity.NodePosX, this.entity.NodePosY])
    }

    static fromSerializedObject(str) {
        let entity = SerializerFactory.getSerializer(ObjectEntity).read(str)
        return new GraphNode(entity)
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
        this.querySelectorAll(".ueb-node-input, .ueb-node-output").forEach(element => {
            this.dragLinkObjects.push(
                new DragLink(element, this.blueprint, {
                    clickButton: 0,
                    moveEverywhere: true,
                    exitAnyButton: true,
                    looseTarget: true
                })
            )
        })
    }

    setLocation(value = [0, 0]) {
        let nodeType = this.entity.NodePosX.constructor
        this.entity.NodePosX = new nodeType(value[0])
        this.entity.NodePosY = new nodeType(value[1])
        super.setLocation(value)
    }
}

customElements.define("u-node", GraphNode)
