import UMouseClickDrag from "./UMouseClickDrag"

export default class USelect extends UMouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)

        this.blueprint = blueprint // blueprint is needed
        this.stepSize = options?.stepSize
        this.mousePosition = [0, 0]
    }

    clicked(e) {
    }

    startDrag(e) {
        this.blueprint.startSelecting(this.clickedPosition)
    }

    dragTo(e) {
        let scaleCorrection = 1 / this.blueprint.getScale()
        const targetOffset = e.target.getBoundingClientRect()
        const currentTargetOffset = e.currentTarget.getBoundingClientRect()
        let offset = [
            e.offsetX + targetOffset.x * scaleCorrection - currentTargetOffset.x * scaleCorrection,
            e.offsetY + targetOffset.y * scaleCorrection - currentTargetOffset.y * scaleCorrection
        ]
        this.blueprint.doSelecting(offset)
    }

    endDrag(e) {
        if (this.started) {
            this.blueprint.finishSelecting()
        } else {
            this.blueprint.unselectAll()
        }
    }
}