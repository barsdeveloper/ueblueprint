import Configuration from "../Configuration"
import MouseMoveNodes from "../input/mouse/MouseMoveNodes"
import IElement from "./IElement"

/** @typedef {import("../template/SelectableDraggableTemplate").default} SelectableDraggableTemplate */

export default class ISelectableDraggableElement extends IElement {

    constructor(...args) {
        super(...args)
        this.dragObject = null
        this.location = [0, 0]
        this.selected = false
        /** @type {SelectableDraggableTemplate} */
        this.template

        let self = this
        this.dragHandler = (e) => {
            self.addLocation(e.detail.value)
        }
    }

    createInputObjects() {
        return [
            new MouseMoveNodes(this, this.blueprint, {
                looseTarget: true
            }),
        ]
    }

    setLocation(value = [0, 0]) {
        const d = [value[0] - this.location[0], value[1] - this.location[1]]
        const dragLocalEvent = new CustomEvent(Configuration.nodeDragLocalEventName, {
            detail: {
                value: d
            },
            bubbles: false,
            cancelable: true
        })
        this.location = value
        this.template.applyLocation(this)
        this.dispatchEvent(dragLocalEvent)
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
            this.blueprint.addEventListener(Configuration.nodeDragEventName, this.dragHandler)
        } else {
            this.blueprint.removeEventListener(Configuration.nodeDragEventName, this.dragHandler)
        }
        this.template.applySelected(this)
    }

    dispatchDragEvent(value) {
        if (!this.selected) {
            this.blueprint.unselectAll()
            this.setSelected(true)
        }
        const dragEvent = new CustomEvent(Configuration.nodeDragEventName, {
            detail: {
                value: value
            },
            bubbles: true,
            cancelable: true
        })
        this.dispatchEvent(dragEvent)
    }

    snapToGrid() {
        let snappedLocation = this.blueprint.snapToGrid(this.location)
        if (this.location[0] != snappedLocation[0] || this.location[1] != snappedLocation[1]) {
            this.setLocation(snappedLocation)
        }
    }
}
