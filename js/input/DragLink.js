import MouseClickDrag from "./MouseClickDrag"

export default class DragLink extends MouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
    }

    startDrag() {
        let a = 12
        console.log(a)
    }

    dragTo(location, movement) {
        //this.selectorElement.doSelecting(location)
    }

    endDrag() {
        if (this.started) {
            //this.selectorElement.finishSelecting()
        } else {
            // this.blueprint.unselectAll()
        }
    }
}
