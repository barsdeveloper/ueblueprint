import GraphNode from "../graph/GraphNode"
import ObjectSerializer from "../serialization/ObjectSerializer"

export default class Paste {

    constructor(target, blueprint, options) {
        /** @type {HTMLElement} */
        this.target = target
        /** @type {import("../Blueprint").default}" */
        this.blueprint = blueprint
        this.serializer = new ObjectSerializer()

        let self = this
        this.pasteHandler = e => {
            self.pasted(e.clipboardData.getData("text"))
        }
        this.target.addEventListener("paste", this.pasteHandler)
    }

    pasted(value) {
        let nodes = this.serializer.readMultiple(value).map(entity => new GraphNode(entity))
        this.blueprint.addNode(...nodes)
    }

    unlistenDOMElement() {
        this.target.removeEventListener("paste", this.pasteHandler)
    }

}