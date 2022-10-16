import IDraggableControlTemplate from "./IDraggableControlTemplate"
import Utility from "../Utility"

/** @typedef {import("../element/ColorHandlerElement").default} ColorHandlerElement */

/** @extends {IDraggableControlTemplate<ColorHandlerElement>} */
export default class ColorSliderTemplate extends IDraggableControlTemplate {

    /**  @param {[Number, Number]} param0 */
    adjustLocation([x, y]) {
        x = 0
        y = Utility.clamp(y, 0, this.movementSpaceSize[1])
        const hsva = this.getColor().toHSVA()
        this.locationChangeCallback?.([x, y])
        return [x, y]
    }

    getColor() {
        return this.element.windowElement.template.color
    }
}
