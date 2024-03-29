import Utility from "../Utility.js"
import IDraggableControlTemplate from "./IDraggableControlTemplate.js"

/** @extends {IDraggableControlTemplate<ColorHandlerElement>} */
export default class ColorSliderTemplate extends IDraggableControlTemplate {

    /**
     * @param {Number} x
     * @param {Number} y
     * @return {Coordinates}
     */
    adjustLocation(x, y) {
        x = Utility.clamp(x, 0, this.movementSpaceSize[0])
        y = Utility.clamp(y, 0, this.movementSpaceSize[1])
        this.locationChangeCallback?.(x / this.movementSpaceSize[0], 1 - y / this.movementSpaceSize[1])
        return [x, y]
    }
}
