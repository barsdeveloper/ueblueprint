import Configuration from "../../Configuration.js"
import IPointing from "./IPointing.js"

/**
 * @typedef {import("../../Blueprint.js").default} Blueprint 
 * @typedef {import("../keyboard/KeyboardShortcut.js").default} KeyboardShortcut
 */

/**
 * @template {Element} T
 * @extends {IPointing<T>}
 */
export default class MouseClick extends IPointing {

    static #ignoreEvent =
        /** @param {MouseClick} self */
        self => { }

    /** @param {MouseEvent} e */
    #mouseDownHandler = e => {
        this.blueprint.setFocused(true)
        if (this.enablerKey && !this.enablerActivated) {
            return
        }
        switch (e.button) {
            case this.options.clickButton:
                // Either doesn't matter or consider the click only when clicking on the target, not descandants
                if (!this.options.strictTarget || e.target === e.currentTarget) {
                    if (this.consumeEvent) {
                        e.stopImmediatePropagation() // Captured, don't call anyone else
                    }
                    // Attach the listeners
                    document.addEventListener("mouseup", this.#mouseUpHandler)
                    this.setLocationFromEvent(e)
                    this.clickedPosition[0] = this.location[0]
                    this.clickedPosition[1] = this.location[1]
                    this.blueprint.mousePosition[0] = this.location[0]
                    this.blueprint.mousePosition[1] = this.location[1]
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

    /** @param {MouseEvent} e */
    #mouseUpHandler = e => {
        if (!this.options.exitAnyButton || e.button == this.options.clickButton) {
            if (this.consumeEvent) {
                e.stopImmediatePropagation() // Captured, don't call anyone else
            }
            // Remove the handlers of "mousemove" and "mouseup"
            document.removeEventListener("mouseup", this.#mouseUpHandler)
            this.unclicked()
        }
    }

    clickedPosition = [0, 0]

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(
        target,
        blueprint,
        options = {},
        onClick = MouseClick.#ignoreEvent,
        onUnclick = MouseClick.#ignoreEvent,
    ) {
        options.clickButton ??= Configuration.mouseClickButton
        options.consumeEvent ??= true
        options.exitAnyButton ??= true
        options.strictTarget ??= false
        super(target, blueprint, options)
        this.onClick = onClick
        this.onUnclick = onUnclick
        this.listenEvents()
    }

    listenEvents() {
        this.target.addEventListener("mousedown", this.#mouseDownHandler)
        if (this.options.clickButton === Configuration.mouseRightClickButton) {
            this.target.addEventListener("contextmenu", e => e.preventDefault())
        }
    }

    unlistenEvents() {
        this.target.removeEventListener("mousedown", this.#mouseDownHandler)
    }

    /* Subclasses will override the following methods */
    clicked(location) {
        this.onClick(this)
    }

    unclicked(location) {
        this.onUnclick(this)
    }
}
