import IMouseClick from "./IMouseClick"

export default class MouseClickAction extends IMouseClick {

    static #ignoreEvent =
        /** @param {MouseClickAction} self */
        self => { }

    constructor(
        target,
        blueprint,
        options,
        onMouseDown = MouseClickAction.#ignoreEvent,
        onMouseUp = MouseClickAction.#ignoreEvent
    ) {
        super(target, blueprint, options)
        this.onMouseDown = onMouseDown
        this.onMouseUp = onMouseUp
    }

    clicked() {
        this.onMouseDown(this)
    }

    unclicked() {
        this.onMouseUp(this)
    }
}