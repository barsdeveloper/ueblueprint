import ColorHandlerTemplate from "../template/ColorHandlerTemplate"
import IDraggableControlElement from "./IDraggableControlElement"

/** @typedef {import("../template/ColorPickerWindowTemplate").default} ColorPickerWindowTemplate */
/**
 * @template T
 * @typedef {import("./WindowElement").default<T>} WindowElement
 */

/** @extends {IDraggableControlElement<Object, ColorHandlerTemplate>} */
export default class ColorHandlerElement extends IDraggableControlElement {

    constructor() {
        super({}, new ColorHandlerTemplate())
    }
}
