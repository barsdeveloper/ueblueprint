import ObjectEntity from "../entity/ObjectEntity"
import SerializerFactory from "../serialization/SerializerFactory"
import NodeTemplate from "../template/NodeTemplate"
import SelectableDraggable from "./SelectableDraggable"

export default class GraphNode extends SelectableDraggable {

    static fromSerializedObject(str) {
        let entity = SerializerFactory.getSerializer(ObjectEntity).read(str)
        return new GraphNode(entity)
    }

    constructor(entity) {
        super(entity, new NodeTemplate())
        this.graphNodeName = 'n/a'
        this.inputs = []
        this.outputs = []
    }

    connectedCallback() {
        const type = this.getAttribute('type')?.trim()
        super.connectedCallback()
        this.classList.add('ueb-node')
        if (this.selected) {
            this.classList.add('ueb-selected')
        }
        this.style.setProperty('--ueb-position-x', this.location[0])
        this.style.setProperty('--ueb-position-y', this.location[1])
    }
}

customElements.define('u-node', GraphNode)
