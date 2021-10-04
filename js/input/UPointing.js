import Utility from "../Utility"

export default class UPointing {

    constructor(target, blueprint, options) {
        /** @type {HTMLElement} */
        this.target = target
        /** @type {import("../UEBlueprint").default}" */
        this.blueprint = blueprint
        this.movementSpace = this.blueprint?.getGridDOMElement() ?? document.documentElement
    }

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