import Pointing from "./Pointing"

export default class MouseTracking extends Pointing {

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true
        super(target, blueprint, options)

        let self = this
        this.mousemoveHandler = e => {
            self.blueprint.entity.mousePosition = self.getLocation(e)
        }
    }

    blueprintFocused() {
        this.target.addEventListener("mousemove", this.mousemoveHandler)
    }

    blueprintUnfocused() {
        this.target.removeEventListener("mousemove", this.mousemoveHandler)
    }
}
