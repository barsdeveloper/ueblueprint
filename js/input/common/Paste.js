import ElementFactory from "../../element/ElementFactory"
import IInput from "../IInput"
import ObjectSerializer from "../../serialization/ObjectSerializer"

/** @typedef {import("../../element/NodeElement").default} NodeElement */

export default class Paste extends IInput {

    static #serializer = new ObjectSerializer()

    /** @type {(e: ClipboardEvent) => void} */
    #pasteHandle

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus ??= true
        options.unlistenOnTextEdit ??= true // No nodes paste if inside a text field, just text (default behavior)
        super(target, blueprint, options)
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
        let nodes = Paste.#serializer.readMultiple(value).map(entity => {
            /** @type {NodeElement} */
            // @ts-expect-error
            let node = new (ElementFactory.getConstructor("ueb-node"))(entity)
            top += node.locationY
            left += node.locationX
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
            node.snapToGrid()
            node.setSelected(true)
        })
        this.blueprint.addGraphElement(...nodes)
        return true
    }
}
