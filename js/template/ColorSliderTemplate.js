import IDraggableControlTemplate from "./IDraggableControlTemplate"
import Utility from "../Utility"

/** @typedef {import("../element/ColorHandlerElement").default} ColorHandlerElement */

/** @extends {IDraggableControlTemplate<ColorHandlerElement>} */
export default class ColorSliderTemplate extends IDraggableControlTemplate {

    createInputObjects() {
        return [
            ...super.createInputObjects(),
        ]
    }

    /**  @param {[Number, Number]} param0 */
    adjustLocation([x, y]) {
        x = Utility.clamp(x, 0, this.movementSpaceSize[0])
        y = Utility.clamp(y, 0, this.movementSpaceSize[1])
        this.locationChangeCallback?.(x / this.movementSpaceSize[0], 1 - y / this.movementSpaceSize[1])
        return [x, y]
    }
}
