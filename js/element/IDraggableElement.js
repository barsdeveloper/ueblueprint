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
export default class IDraggableElement extends IElement {

    static properties = {
        ...super.properties,
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
        this.locationX = 0
        this.locationY = 0
    }

    /** @param {Number[]} param0 */
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

    /** @param {Number[]} param0 */
    addLocation([x, y]) {
        this.setLocation([this.locationX + x, this.locationY + y])
    }

    /** @param {Number[]} value */
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
