import DragMove from "../input/DragMove"
import GraphElement from "./GraphElement"

export default class SelectableDraggable extends GraphElement {

    constructor(...args) {
        super(...args)
        this.dragObject = null
        this.location = [0, 0]
        this.selected = false
        /** @type {import("../template/SelectableDraggableTemplate").default} */
        this.template

        let self = this
        this.dragHandler = (e) => {
            self.addLocation(e.detail.value)
        }
    }

    connectedCallback() {
        super.connectedCallback()
        this.dragObject = new DragMove(this, this.blueprint, {
            looseTarget: true
        })
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.dragObject.unlistenDOMElement()
    }

    setLocation(value = [0, 0]) {
        this.location = value
        this.template.applyLocation(this)
    }

    addLocation(value) {
        this.setLocation([this.location[0] + value[0], this.location[1] + value[1]])
    }

    setSelected(value = true) {
        if (this.selected == value) {
            return
        }
        this.selected = value
        if (this.selected) {
            this.blueprint.addEventListener("ueb-node-drag", this.dragHandler)
        } else {
            this.blueprint.removeEventListener("ueb-node-drag", this.dragHandler)
        }
        this.template.applySelected(this)
    }

    dispatchDragEvent(value) {
        if (!this.selected) {
            this.blueprint.unselectAll()
            this.setSelected(true)
        }
        let dragEvent = new CustomEvent("ueb-node-drag", {
            detail: {
                instigator: this,
                value: value
            },
            cancelable: true
        })
        this.blueprint.dispatchEvent(dragEvent)
    }
}
