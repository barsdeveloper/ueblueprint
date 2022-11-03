import ColorSliderTemplate from "../template/ColorSliderTemplate"
import IDraggableControlElement from "./IDraggableControlElement"

/** @typedef {import("../template/IDraggableControlTemplate").default} IDraggableControlTemplate */

/** @extends {IDraggableControlElement<Object, ColorSliderTemplate>} */
export default class ColorSliderElement extends IDraggableControlElement {

    constructor() {
        super({}, new ColorSliderTemplate())
    }
}

customElements.define("ueb-ui-slider", ColorSliderElement)
