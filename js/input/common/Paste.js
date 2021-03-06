// @ts-check

import IInput from "../IInput"
import NodeElement from "../../element/NodeElement"
import ObjectSerializer from "../../serialization/ObjectSerializer"

export default class Paste extends IInput {

    /** @type {(e: ClipboardEvent) => void} */
    #pasteHandle

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true
        options.unlistenOnTextEdit = true // No nodes paste if inside a text field, just text (default behavior)
        super(target, blueprint, options)
        this.serializer = new ObjectSerializer()
        let self = this
        this.#pasteHandle = e => self.pasted(e.clipboardData.getData("Text"))
    }

    listenEvents() {
        document.body.addEventListener("paste", this.#pasteHandle)
    }

    unlistenEvents() {
        document.body.removeEventListener("paste", this.#pasteHandle)
    }

    pasted(value) {
        let top = 0
        let left = 0
        let count = 0
        let nodes = this.serializer.readMultiple(value).map(entity => {
            let node = new NodeElement(entity)
            top += node.location[1]
            left += node.location[0]
            ++count
            return node
        })
        top /= count
        left /= count
        if (nodes.length > 0) {
            this.blueprint.unselectAll()
        }
        let mousePosition = this.blueprint.mousePosition
        nodes.forEach(node => {
            const locationOffset = [
                mousePosition[0] - left,
                mousePosition[1] - top,
            ]
            node.addLocation(locationOffset)
            node.setSelected(true)
            node.snapToGrid()
        })
        this.blueprint.addGraphElement(...nodes)
        return true
    }
}
