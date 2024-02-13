import IInput from "../IInput.js"

/**
 * @typedef {import("../IInput.js").Options & {
 *     listenOnFocus?: Boolean,
 * }} Options
 */

export default class Unfocus extends IInput {

    /** @param {MouseEvent} e */
    #clickHandler = e => this.clickedSomewhere(/** @type {HTMLElement} */(e.target))

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true
        super(target, blueprint, options)
        if (this.blueprint.focus) {
            document.addEventListener("click", this.#clickHandler)
        }
    }

    /** @param {HTMLElement} target */
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
