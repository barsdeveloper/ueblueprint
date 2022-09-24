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
        initialPositionX: {
            type: Number,
            attribute: false,
        },
        initialPositionY: {
            type: Number,
            attribute: false,
        },
        finaPositionX: {
            type: Number,
            attribute: false,
        },
        finaPositionY: {
            type: Number,
            attribute: false,
        },
    }

    constructor(...args) {
        super(...args)
        this.initialPositionX = 0
        this.initialPositionY = 0
        this.finaPositionX = 0
        this.finaPositionY = 0
    }

    /** @param {Number[]} param0 */
    setBothLocations([x, y]) {
        this.initialPositionX = x
        this.initialPositionY = y
        this.finaPositionX = x
        this.finaPositionY = y
    }

    /** @param {Number[]} offset */
    addSourceLocation([offsetX, offsetY]) {
        this.initialPositionX += offsetX
        this.initialPositionY += offsetY
    }

    /** @param {Number[]} offset */
    addDestinationLocation([offsetX, offsetY]) {
        this.finaPositionX += offsetX
        this.finaPositionY += offsetY
    }
}