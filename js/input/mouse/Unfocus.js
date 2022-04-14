// @ts-check

import IInput from "../IInput"

export default class Unfocus extends IInput {

    /** @type {(e: MouseEvent) => void} */
    #clickHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true
        super(target, blueprint, options)

        let self = this
        this.#clickHandler = e => self.clickedSomewhere(/** @type {HTMLElement} */(e.target))
        if (this.blueprint.focus) {
            document.addEventListener("click", this.#clickHandler)
        }
    }

    /**
     * @param {HTMLElement} target
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
