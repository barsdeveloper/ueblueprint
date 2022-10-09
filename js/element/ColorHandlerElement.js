import LinearColorEntity from "../entity/LinearColorEntity"
import ColorHandlerTemplate from "../template/ColorHandlerTemplate"
import IDraggableElement from "./IDraggableElement"

/** @typedef {import("../template/ColorPickerWindowTemplate").default} ColorPickerWindowTemplate */
/**
 * @template T
 * @typedef {import("./WindowElement").default<T>} WindowElement
 */

export default class ColorHandlerElement extends IDraggableElement {

    /** @type {WindowElement<ColorPickerWindowTemplate>} */
    windowElement

    constructor() {
        super({}, new ColorHandlerTemplate())
    }

    connectedCallback() {
        super.connectedCallback()
        this.windowElement = this.closest("ueb-window")
    }

    /** @param {Number[]} param0 */
    addLocation([x, y]) {
        super.addLocation([x, y])
        this.windowElement.windowOptions
        this.windowElement.template.color = this.computeColor()
    }

    computeColor() {
        return new LinearColorEntity()
    }
}

customElements.define("ueb-color-handler", ColorHandlerElement)
