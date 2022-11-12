import IPointing from "./IPointing"

/** @typedef {import("../../Blueprint").default} Blueprint */

/**
 * @template {HTMLElement} T
 * @extends {IPointing<T>}
 */
export default class IMouseClick extends IPointing {

    #mouseDownHandler =
        /** @param {MouseEvent} e */
        e => {
            this.blueprint.setFocused(true)
            switch (e.button) {
                case this.options.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the target, not descandants
                    if (!this.options.strictTarget || e.target == e.currentTarget) {
                        if (this.options.consumeEvent) {
                            e.stopImmediatePropagation() // Captured, don't call anyone else
                        }
                        // Attach the listeners
                        document.addEventListener("mouseup", this.#mouseUpHandler)
                        this.clickedPosition = this.locationFromEvent(e)
                        this.blueprint.mousePosition[0] = this.clickedPosition[0]
                        this.blueprint.mousePosition[1] = this.clickedPosition[1]
                        this.clicked(this.clickedPosition)
                    }
                    break
                default:
                    if (!this.options.exitAnyButton) {
                        this.#mouseUpHandler(e)
                    }
                    break
            }
        }

    #mouseUpHandler =
        /** @param {MouseEvent} e */
        e => {
            if (!this.options.exitAnyButton || e.button == this.options.clickButton) {
                if (this.options.consumeEvent) {
                    e.stopImmediatePropagation() // Captured, don't call anyone else
                }
                // Remove the handlers of "mousemove" and "mouseup"
                document.removeEventListener("mouseup", this.#mouseUpHandler)
                this.unclicked()
            }
        }

    clickedPosition = [0, 0]

    constructor(target, blueprint, options = {}) {
        options.clickButton ??= 0
        options.consumeEvent ??= true
        options.exitAnyButton ??= true
        options.strictTarget ??= false
        super(target, blueprint, options)
        this.listenEvents()
    }

    listenEvents() {
        this.target.addEventListener("mousedown", this.#mouseDownHandler)
        if (this.options.clickButton == 2) {
            this.target.addEventListener("contextmenu", e => e.preventDefault())
        }
    }

    unlistenEvents() {
        this.target.removeEventListener("mousedown", this.#mouseDownHandler)
    }

    /* Subclasses will override the following methods */
    clicked(location) {
    }

    unclicked(location) {
    }
}
