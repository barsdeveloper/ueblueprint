import IMouseClick from "./IMouseClick"
import WindowElement from "../../element/WindowElement"

/**
 * @template {HTMLElement} T
 * @extends {IMouseClick<T>}
 */
export default class MouseOpenWindow extends IMouseClick {

    #window

    constructor(target, blueprint, options = {}) {
        options.windowType ??= "window"
        super(target, blueprint, options)
    }

    clicked(location) {
    }

    unclicked(location) {
        this.#window = new WindowElement({
            type: this.options.windowType
        })
        this.blueprint.append(this.#window)
    }
}
