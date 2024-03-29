import Utility from "../Utility.js"
import IDraggableControlTemplate from "./IDraggableControlTemplate.js"

/** @extends {IDraggableControlTemplate<ColorHandlerElement>} */
export default class ColorHandlerTemplate extends IDraggableControlTemplate {

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Coordinates}
     */
    adjustLocation(x, y) {
        const radius = Math.round(this.movementSpaceSize[0] / 2)
        x = x - radius
        y = -(y - radius)
        let [r, theta] = Utility.getPolarCoordinates(x, y)
        r = Math.min(r, radius), [x, y] = Utility.getCartesianCoordinates(r, theta)
        this.locationChangeCallback?.(x / radius, y / radius)
        x = Math.round(x + radius)
        y = Math.round(-y + radius)
        return [x, y]
    }
}
