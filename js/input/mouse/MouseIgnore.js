import IMouseClickDrag from "./IMouseClickDrag.js"

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
