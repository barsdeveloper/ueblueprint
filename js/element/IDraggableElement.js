import Configuration from "../Configuration"
import IElement from "./IElement"
import Utility from "../Utility"

/**
 * @typedef {import("../template/IDraggableTemplate").default} IDraggableTemplate
 * @typedef {import("../entity/IEntity").default} IEntity
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

    /**
     * @param {T} entity
     * @param {U} template
     */
    constructor(entity, template) {
        super(entity, template)
        this.locationX = 0
        this.locationY = 0
        this.sizeX ??= 0 // It may be set in the template already
        this.sizeY ??= 0 // It may be set in the template already
    }

    computeSizes() {
        const scaleCorrection = 1 / this.blueprint.getScale()
        const bounding = this.getBoundingClientRect()
        this.sizeX = bounding.width * scaleCorrection
        this.sizeY = bounding.height * scaleCorrection
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.computeSizes()
    }

    /** @param {Number[]} param0 */
    setLocation([x, y], acknowledge = true) {
        const d = [x - this.locationX, y - this.locationY]
        this.locationX = x
        this.locationY = y
        if (this.blueprint && acknowledge) {
            // @ts-expect-error
            const dragLocalEvent = new CustomEvent(this.constructor.dragEventName, {
                detail: {
                    value: d,
                },
                bubbles: false,
                cancelable: true,
            })
            this.dispatchEvent(dragLocalEvent)
        }
    }

    /** @param {Number[]} param0 */
    addLocation([x, y], acknowledge = true) {
        this.setLocation([this.locationX + x, this.locationY + y], acknowledge)
    }

    /** @param {Number[]} value */
    acknowledgeDrag(value) {
        // @ts-expect-error
        const dragEvent = new CustomEvent(this.constructor.dragGeneralEventName, {
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

    topBoundary() {
        return this.locationY
    }

    rightBoundary() {
        return this.locationX + this.sizeX
    }

    bottomBoundary() {
        return this.locationY + this.sizeY
    }

    leftBoundary() {
        return this.locationX
    }
}
