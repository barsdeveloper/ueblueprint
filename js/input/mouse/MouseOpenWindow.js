import IMouseClick from "./IMouseClick"
import WindowElement from "../../element/WindowElement"

/**
 * @template {HTMLElement} T
 * @extends {IMouseClick<T>}
 */
export default class MouseOpenWindow extends IMouseClick {

    #window

    clicked(location) {
    }

    unclicked(location) {
        this.#window = new WindowElement({
            type: this.options.windowType,
            windowOptions: this.options.windowOptions,
        })
        this.blueprint.append(this.#window)
    }
}
