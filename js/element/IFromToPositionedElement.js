import IElement from "./IElement"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../template/ITemplate").default} ITemplate
 */

/**
 * @template {IEntity} T
 * @template {ITemplate} U
 * @extends {IElement<T, U>}
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

    /** @param {Number[]} param0 */
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
    addSourceLocation(x, y) {
        this.fromX += x
        this.fromY += y
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    addDestinationLocation(x, y) {
        this.toX += x
        this.toY += y
    }
}
