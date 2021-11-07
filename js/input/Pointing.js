import Context from "./Context"
import Utility from "../Utility"

export default class Pointing extends Context {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.movementSpace = this.blueprint?.getGridDOMElement() ?? document.documentElement
    }

    /**
     * 
     * @param {MouseEvent} mouseEvent 
     * @returns 
     */
    getLocation(mouseEvent) {
        const scaleCorrection = 1 / Utility.getScale(this.target)
        const targetOffset = this.movementSpace.getBoundingClientRect()
        let location = [
            (mouseEvent.clientX - targetOffset.x) * scaleCorrection,
            (mouseEvent.clientY - targetOffset.y) * scaleCorrection
        ]
        return location
    }
}
