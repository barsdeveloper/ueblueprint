import NodeTemplate from "../template/NodeTemplate"
import ObjectEntity from "../entity/ObjectEntity"
import SelectableDraggable from "./SelectableDraggable"
import SerializerFactory from "../serialization/SerializerFactory"
import DragLink from "../input/DragLink"

export default class GraphNode extends SelectableDraggable {

    static fromSerializedObject(str) {
        let entity = SerializerFactory.getSerializer(ObjectEntity).read(str)
        return new GraphNode(entity)
    }

    /**
     * 
     * @param {ObjectEntity} entity 
     */
    constructor(entity) {
        super(entity, new NodeTemplate())
        this.graphNodeName = "n/a"
        this.dragLinkObjects = Array()
        super.setLocation([this.entity.NodePosX, this.entity.NodePosY])
    }

    connectedCallback() {
        const type = this.getAttribute("type")?.trim()
        super.connectedCallback()
        this.classList.add("ueb-node")
        if (this.selected) {
            this.classList.add("ueb-selected")
        }
        this.style.setProperty("--ueb-position-x", this.location[0])
        this.style.setProperty("--ueb-position-y", this.location[1])
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
        this.entity.NodePosX = value[0]
        this.entity.NodePosY = value[1]
        super.setLocation(value)
    }
}

customElements.define("u-node", GraphNode)
