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

    constructor(...args) {
        // @ts-expect-error
        super(...args)
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

    /** @param {Number[]} offset */
    addSourceLocation([offsetX, offsetY]) {
        this.fromX += offsetX
        this.fromY += offsetY
    }

    /** @param {Number[]} offset */
    addDestinationLocation([offsetX, offsetY]) {
        this.toX += offsetX
        this.toY += offsetY
    }
}
