import MouseClickDrag from "./MouseClickDrag"

export default class Select extends MouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.stepSize = options?.stepSize
        this.mousePosition = [0, 0]
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
        } else {
            this.blueprint.unselectAll()
        }
    }
}
