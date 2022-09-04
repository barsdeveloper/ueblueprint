import Configuration from "../Configuration"
import IElement from "./IElement"
import Utility from "../Utility"

/**
 * @typedef {import("../template/SelectableDraggableTemplate").default} SelectableDraggableTemplate
 * @typedef {import("../entity/IEntity").default} IEntity
 */

/**
 * @template {IEntity} T
 * @template {SelectableDraggableTemplate} U
 * @extends {IElement<T, U>}
 */
export default class ISelectableDraggableElement extends IElement {

    static properties = {
        ...super.properties,
        selected: {
            type: Boolean,
            attribute: "data-selected",
            reflect: true,
            converter: Utility.booleanConverter,
        },
        locationX: {
            type: Number,
            attribute: false,
        },
        locationY: {
            type: Number,
            attribute: false,
        },
    }

    constructor(...args) {
        super(...args)
        this.selected = false
        this.locationX = 0
        this.locationY = 0

        this.listeningDrag = false

        let self = this
        this.dragHandler = e => self.addLocation(e.detail.value)
    }

    connectedCallback() {
        super.connectedCallback()
        this.setSelected(this.selected)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.blueprint.removeEventListener(Configuration.nodeDragEventName, this.dragHandler)
    }

    /**
     * @param {Number[]} param0
     */
    setLocation([x, y]) {
        const d = [x - this.locationX, y - this.locationY]
        this.locationX = x
        this.locationY = y
        if (this.blueprint) {
            const dragLocalEvent = new CustomEvent(Configuration.nodeDragLocalEventName, {
                detail: {
                    value: d,
                },
                bubbles: false,
                cancelable: true
            })
            this.dispatchEvent(dragLocalEvent)
        }
    }

    /**
     * @param {Number[]} param0
     */
    addLocation([x, y]) {
        this.setLocation([this.locationX + x, this.locationY + y])
    }

    setSelected(value = true) {
        this.selected = value
        if (this.blueprint) {
            if (this.selected) {
                this.listeningDrag = true
                this.blueprint.addEventListener(Configuration.nodeDragEventName, this.dragHandler)
            } else {
                this.blueprint.removeEventListener(Configuration.nodeDragEventName, this.dragHandler)
                this.listeningDrag = false
            }
        }
    }

    /**
     * @param {Number[]} value 
     */
    dispatchDragEvent(value) {
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
        const snappedLocation = Utility.snapToGrid([this.locationX, this.locationY], Configuration.gridSize)
        if (this.locationX != snappedLocation[0] || this.locationY != snappedLocation[1]) {
            this.setLocation(snappedLocation)
        }
    }
}
