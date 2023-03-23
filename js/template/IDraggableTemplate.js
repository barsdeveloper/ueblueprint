import ITemplate from "./ITemplate.js"
import MouseMoveDraggable from "../input/mouse/MouseMoveDraggable.js"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../element/IDraggableElement").default} IDraggableElement
 */

/**
 * @template {IDraggableElement} T
 * @extends {ITemplate<T>}
 */
export default class IDraggableTemplate extends ITemplate {

    getDraggableElement() {
        return /** @type {Element} */(this.element)
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.blueprint, {
            draggableElement: this.getDraggableElement(),
        })
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            this.createDraggableObject(),
        ]
    }

    topBoundary(justSelectableArea = false) {
        return this.element.locationY
    }

    rightBoundary(justSelectableArea = false) {
        return this.element.locationX + this.element.sizeX
    }

    bottomBoundary(justSelectableArea = false) {
        return this.element.locationY + this.element.sizeY
    }

    leftBoundary(justSelectableArea = false) {
        return this.element.locationX
    }

    centerInViewport() {
        const minMargin = Math.min(
            this.blueprint.template.viewportSize[0] / 10,
            this.blueprint.template.viewportSize[1] / 10
        )
        const dl = this.leftBoundary() - this.blueprint.template.gridLeftVisibilityBoundary()
        const dr = this.blueprint.template.gridRightVisibilityBoundary() - this.rightBoundary()
        let avgX = Math.max((dl + dr) / 2, minMargin)
        const dt = this.topBoundary() - this.blueprint.template.gridTopVisibilityBoundary()
        const db = this.blueprint.template.gridBottomVisibilityBoundary() - this.bottomBoundary()
        let avgY = Math.max((dt + db) / 2, minMargin)
        this.blueprint.scrollDelta(dl - avgX, dt - avgY, true)
    }
}
