import ElementFactory from "../../element/ElementFactory.js"
import IInput from "../IInput.js"
import ObjectSerializer from "../../serialization/ObjectSerializer.js"

/**
 * @typedef {import("../IInput.js").Options & {
 *     listenOnFocus?: Boolean,
 *     unlistenOnTextEdit?: Boolean,
 * }} Options
 */

export default class Paste extends IInput {

    static #serializer = new ObjectSerializer()

    /** @type {(e: ClipboardEvent) => void} */
    #pasteHandle

    /**
     * @param {Element} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.listenOnFocus ??= true
        options.unlistenOnTextEdit ??= true // No nodes paste if inside a text field, just text (default behavior)
        super(target, blueprint, options)
        let self = this
        this.#pasteHandle = e => self.pasted(e.clipboardData.getData("Text"))
    }

    listenEvents() {
        window.addEventListener("paste", this.#pasteHandle)
    }

    unlistenEvents() {
        window.removeEventListener("paste", this.#pasteHandle)
    }

    /** @param {String} value */
    pasted(value) {
        let top = 0
        let left = 0
        let count = 0
        let nodes = Paste.#serializer.readMultiple(value).map(entity => {
            let node = /** @type {NodeElementConstructor} */(ElementFactory.getConstructor("ueb-node"))
                .newObject(entity)
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
            node.addLocation(mousePosition[0] - left, mousePosition[1] - top)
            node.snapToGrid()
            node.setSelected(true)
        })
        this.blueprint.addGraphElement(...nodes)
        return true
    }
}
