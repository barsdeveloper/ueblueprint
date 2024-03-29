import ColorHandlerTemplate from "../template/ColorHandlerTemplate.js"
import IDraggableControlElement from "./IDraggableControlElement.js"

/** @extends {IDraggableControlElement<Object, ColorHandlerTemplate>} */
export default class ColorHandlerElement extends IDraggableControlElement {

    constructor() {
        super()
        super.initialize({}, new ColorHandlerTemplate())
    }

    static newObject() {
        return new ColorHandlerElement()
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }
}
