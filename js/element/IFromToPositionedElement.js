import IElement from "./IElement.js"

/**
 * @template {IEntity} EntityT
 * @template {ITemplate} TemplateT
 * @extends {IElement<EntityT, TemplateT>}
 */
export default class IFromToPositionedElement extends IElement {

    static properties = {
        ...super.properties,
        fromX: {
            type: Number,
            attribute: false,
        },
        fromY: {
            type: Number,
            attribute: false,
        },
        toX: {
            type: Number,
            attribute: false,
        },
        toY: {
            type: Number,
            attribute: false,
        },
    }

    constructor() {
        super()
        this.fromX = 0
        this.fromY = 0
        this.toX = 0
        this.toY = 0
    }

    /** @param {Coordinates} param0 */
    setBothLocations([x, y]) {
        this.fromX = x
        this.fromY = y
        this.toX = x
        this.toY = y
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    addOriginLocation(x, y) {
        this.fromX += x
        this.fromY += y
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    addTargetLocation(x, y) {
        this.toX += x
        this.toY += y
    }
}
