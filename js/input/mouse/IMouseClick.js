import IPointing from "./IPointing"

/** @typedef {import("../../Blueprint").default} Blueprint */

/**
 * @template {HTMLElement} T
 * @extends {IPointing<T>}
 */
export default class IMouseClick extends IPointing {

    /** @type {(e: MouseEvent) => void} */
    #mouseDownHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseUpHandler

    constructor(target, blueprint, options = {}) {
        options.clickButton ??= 0
        options.consumeEvent ??= true
        options.exitAnyButton ??= true
        options.strictTarget ??= false
        super(target, blueprint, options)
        this.clickedPosition = [0, 0]
        let self = this

        this.#mouseDownHandler = e => {
            self.blueprint.setFocused(true)
            switch (e.button) {
                case self.options.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the target, not descandants
                    if (!self.options.strictTarget || e.target == e.currentTarget) {
                        if (self.options.consumeEvent) {
                            e.stopImmediatePropagation() // Captured, don't call anyone else
                        }
                        // Attach the listeners
                        document.addEventListener("mouseup", self.#mouseUpHandler)
                        self.clickedPosition = self.locationFromEvent(e)
                        self.clicked(self.clickedPosition)
                    }
                    break
                default:
                    if (!self.options.exitAnyButton) {
                        self.#mouseUpHandler(e)
                    }
                    break
            }
        }

        this.#mouseUpHandler = e => {
            if (!self.options.exitAnyButton || e.button == self.options.clickButton) {
                if (self.options.consumeEvent) {
                    e.stopImmediatePropagation() // Captured, don't call anyone else
                }
                // Remove the handlers of "mousemove" and "mouseup"
                document.removeEventListener("mouseup", self.#mouseUpHandler)
                self.unclicked()
            }
        }

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
