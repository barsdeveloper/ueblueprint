import UEBlueprintDrag from "./UEBlueprintDrag.js"

export default class UEBlueprintDraggableObject extends HTMLElement {

    constructor() {
        super()
        this.dragObject = null
        this.location = [0, 0]
    }

    connectedCallback() {
        this.dragObject = new UEBlueprintDrag(this)
    }

    disconnectedCallback() {
        this.dragObject.unlistenDOMElement()
    }

    setLocation(value = [0, 0]) {
        this.location = value
        this.style.setProperty('--ueb-position-x', this.location[0])
        this.style.setProperty('--ueb-position-y', this.location[1])
    }

    addLocation(value) {
        this.setLocation([this.location[0] + value[0], this.location[1] + value[1]])
    }

    getLocation() {
        return this.location
    }

}