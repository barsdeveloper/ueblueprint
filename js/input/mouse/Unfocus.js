import IContext from "../IContext"

export default class Unfocus extends IContext {

    /** @type {(e: WheelEvent) => void} */
    #clickHandler

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true
        super(target, blueprint, options)

        let self = this
        this.#clickHandler = e => self.clickedSomewhere(e.target)
        if (this.blueprint.focuse) {
            document.addEventListener("click", this.#clickHandler)
        }
    }

    /**
     * 
     * @param {HTMLElement} e 
     */
    clickedSomewhere(target) {
        // If target is outside the blueprint grid
        if (!target.closest("ueb-blueprint")) {
            this.blueprint.setFocused(false)
        }
    }

    listenEvents() {
        document.addEventListener("click", this.#clickHandler)
    }

    unlistenEvents() {
        document.removeEventListener("click", this.#clickHandler)
    }
}
