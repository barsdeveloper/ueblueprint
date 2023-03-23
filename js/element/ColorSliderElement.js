import ColorSliderTemplate from "../template/ColorSliderTemplate.js"
import IDraggableControlElement from "./IDraggableControlElement.js"

/** @extends {IDraggableControlElement<Object, ColorSliderTemplate>} */
export default class ColorSliderElement extends IDraggableControlElement {

    constructor() {
        super()
        super.initialize({}, new ColorSliderTemplate())
    }

    static newObject() {
        return new ColorSliderElement()
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }
}
