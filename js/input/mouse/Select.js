// @ts-check

import IMouseClickDrag from "./IMouseClickDrag"

export default class Select extends IMouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.selectorElement = this.blueprint.selectorElement
    }

    startDrag() {
        this.selectorElement.startSelecting(this.clickedPosition)
    }

    dragTo(location, movement) {
        this.selectorElement.doSelecting(location)
    }

    endDrag() {
        if (this.started) {
            this.selectorElement.finishSelecting()
        }
    }

    unclicked() {
        if (!this.started) {
            this.blueprint.unselectAll()
        }
    }
}
