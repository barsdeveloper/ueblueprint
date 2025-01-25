import IElement from "./IElement.js"

/**
 * @template {IEntity} EntityT
 * @template {ITemplate} TemplateT
 * @extends {IElement<EntityT, TemplateT>}
 */
export default class IFromToPositionedElement extends IElement {

    static properties = {
        ...super.properties,
        originX: {
            type: Number,
            attribute: false,
        },
        fromY: {
            type: Number,
            attribute: false,
        },
        targetX: {
            type: Number,
            attribute: false,
        },
        targetY: {
            type: Number,
            attribute: false,
        },
    }

    constructor() {
        super()
        this.originX = 0
        this.originY = 0
        this.targetX = 0
        this.targetY = 0
    }

    /** @param {Coordinates} param0 */
    setBothLocations([x, y]) {
        this.originX = x
        this.originY = y
        this.targetX = x
        this.targetY = y
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    addOriginLocation(x, y) {
        this.originX += x
        this.originY += y
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    addTargetLocation(x, y) {
        this.targetX += x
        this.targetY += y
    }
}
