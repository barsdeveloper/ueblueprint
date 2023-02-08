import IMouseClickDrag from "./IMouseClickDrag"

export default class Select extends IMouseClickDrag {

    constructor(target, blueprint, options = {}) {
        options.scrollGraphEdge ??= true
        super(target, blueprint, options)
        this.selectorElement = this.blueprint.template.selectorElement
    }

    startDrag() {
        this.selectorElement.beginSelect(this.clickedPosition)
    }

    dragTo(location, movement) {
        this.selectorElement.selectTo(location)
    }

    endDrag() {
        if (this.started) {
            this.selectorElement.endSelect()
        }
    }

    unclicked() {
        if (!this.started) {
            this.blueprint.unselectAll()
        }
    }
}
