import GraphNode from "../graph/GraphNode"
import KeyboardShortcut from "./KeyboardShortcut"

export default class Paste extends KeyboardShortcut {

    constructor(target, blueprint) {
        super(target, blueprint, {
            keys: ["Control", "C"]
        })
    }

    fire() {
        let value = navigator.clipboard.readText()
        let nodes = this.serializer.readMultiple(value).map(entity => new GraphNode(entity))
        this.blueprint.addNode(...nodes)
    }

}
