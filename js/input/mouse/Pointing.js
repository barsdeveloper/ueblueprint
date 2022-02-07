import Context from "../Context"
import Utility from "../../Utility"

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
    locationFromEvent(mouseEvent) {
        return this.blueprint.compensateTranslation(
            Utility.convertLocation(
                [mouseEvent.clientX, mouseEvent.clientY],
                this.movementSpace))
    }
}
