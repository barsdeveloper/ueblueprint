import IMouseClickDrag from "./IMouseClickDrag"

/**
 * @typedef {import("../../element/PinElement").default} PinElement
 */

/**
 * @extends IMouseClickDrag<PinElement>
 */
export default class MouseIgnore extends IMouseClickDrag {

    constructor(target, blueprint, options = {}) {
        options.consumeEvent = true
        super(target, blueprint, options)
    }
}