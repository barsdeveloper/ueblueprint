import UEBlueprintDOMModel from "./UEBlueprintDOMModel.js"
import UEBlueprintDrag from "./UEBlueprintDrag.js"

export default class UEBlueprintDraggableObject extends UEBlueprintDOMModel {

    constructor() {
        super()
        this.dragObject = null
        this.location = [0, 0]
    }

    createDOMElement() {
        super.createDOMElement()
        this.dragObject = new UEBlueprintDrag(this)
    }

    removeDOMElement() {
        if (this.domElement) {
            this.dragObject.unlistenDOMElement()
        }
        return super.removeDOMElement()
    }

    setLocation(value = [0, 0]) {
        this.location = value
        if (this.domElement) {
            this.domElement.style.setProperty('--ueb-position-x', this.location[0])
            this.domElement.style.setProperty('--ueb-position-y', this.location[1])
        }
    }

    addLocation(value) {
        this.setLocation([this.location[0] + value[0], this.location[1] + value[1]])
    }

    getLocation() {
        return this.location
    }

}