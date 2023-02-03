import Configuration from "../Configuration"
import IElement from "./IElement"
import Utility from "../Utility"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../template/IDraggableTemplate").default} IDraggableTemplate
 * @typedef {CustomEvent<{
 *     value: [Number, Number]
 * }>} DragEvent
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

/**
 * @template {IEntity} T
 * @template {IDraggableTemplate} U
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
        sizeX: {
            type: Number,
            attribute: false,
        },
        sizeY: {
            type: Number,
            attribute: false,
        },
    }
    static dragEventName = Configuration.dragEventName
    static dragGeneralEventName = Configuration.dragGeneralEventName

    constructor() {
        super()
        this.locationX = 0
        this.locationY = 0
        this.sizeX = 0
        this.sizeY = 0
    }

    computeSizes() {
        const bounding = this.getBoundingClientRect()
        this.sizeX = this.blueprint.scaleCorrect(bounding.width)
        this.sizeY = this.blueprint.scaleCorrect(bounding.height)
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.computeSizes()
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    setLocation(x, y, acknowledge = true) {
        const dx = x - this.locationX
        const dy = y - this.locationY
        this.locationX = x
        this.locationY = y
        if (this.blueprint && acknowledge) {
            const dragLocalEvent = new CustomEvent(
                /** @type {typeof IDraggableElement} */(this.constructor).dragEventName,
                {
                    detail: {
                        value: [dx, dy],
                    },
                    bubbles: false,
                    cancelable: true,
                }
            )
            this.dispatchEvent(dragLocalEvent)
        }
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    addLocation(x, y, acknowledge = true) {
        this.setLocation(this.locationX + x, this.locationY + y, acknowledge)
    }

    /** @param {Number[]} value */
    acknowledgeDrag(value) {
        const dragEvent = new CustomEvent(
            /** @type {typeof IDraggableElement} */(this.constructor).dragGeneralEventName,
            {
                detail: {
                    value: value
                },
                bubbles: true,
                cancelable: true
            }
        )
        this.dispatchEvent(dragEvent)
    }

    snapToGrid() {
        const snappedLocation = Utility.snapToGrid(this.locationX, this.locationY, Configuration.gridSize)
        if (this.locationX != snappedLocation[0] || this.locationY != snappedLocation[1]) {
            this.setLocation(snappedLocation[0], snappedLocation[1])
        }
    }

    topBoundary(justSelectableArea = false) {
        return this.template.topBoundary(justSelectableArea)
    }

    rightBoundary(justSelectableArea = false) {
        return this.template.rightBoundary(justSelectableArea)
    }

    bottomBoundary(justSelectableArea = false) {
        return this.template.bottomBoundary(justSelectableArea)
    }

    leftBoundary(justSelectableArea = false) {
        return this.template.leftBoundary(justSelectableArea)
    }
}
