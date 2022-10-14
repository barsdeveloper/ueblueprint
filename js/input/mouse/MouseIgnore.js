import IMouseClickDrag from "./IMouseClickDrag"

/**
 * @typedef {import("../../element/IDraggableElement").default} IDraggableElement
 */

/**
* @template {IDraggableElement} T
* @extends {IMouseClickDrag<T>}
*/
export default class MouseIgnore extends IMouseClickDrag {

    constructor(target, blueprint, options = {}) {
        options.consumeEvent = true
        super(target, blueprint, options)
    }
}