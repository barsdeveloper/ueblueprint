import MouseClickDrag from "./MouseClickDrag"

export default class DragLink extends MouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        /** @type {import("../graph/GraphPin").default} */
        this.target
        /** @type {import("../graph/GraphLink").default} */
        this.link
    }

    startDrag() {
        let link = this.target.dragLink()

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
