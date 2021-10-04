import UMouseClickDrag from "./UMouseClickDrag"

export default class USelect extends UMouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.stepSize = options?.stepSize
        this.mousePosition = [0, 0]
    }

    startDrag() {
        this.blueprint.startSelecting(this.clickedPosition)
    }

    dragTo(location, movement) {
        this.blueprint.doSelecting(location)
    }

    endDrag() {
        if (this.started) {
            this.blueprint.finishSelecting()
        } else {
            this.blueprint.unselectAll()
        }
    }
}