import IPointing from "./IPointing.js"

/**
 * @typedef {import("./IPointing.js").Options & {
 *     consumeEvent?: Boolean,
 *     strictTarget?: Boolean,
* }} Options
*/

/**
 * @template {HTMLElement} T
 * @extends {IPointing<T>}
 */
export default class MouseDbClick extends IPointing {

    /** @param {Coordinates} location */
    static ignoreDbClick = location => { }

    /** @param {MouseEvent} e */
    #mouseDbClickHandler = e => {
        if (!this.options.strictTarget || e.target === e.currentTarget) {
            if (this.consumeEvent) {
                e.stopImmediatePropagation() // Captured, don't call anyone else
            }
            this.clickedPosition = this.setLocationFromEvent(e)
            this.blueprint.mousePosition = [...this.clickedPosition]
            this.dbclicked(this.clickedPosition)
        }
    }

    #onDbClick
    get onDbClick() {
        return this.#onDbClick
    }
    set onDbClick(value) {
        this.#onDbClick = value
    }

    clickedPosition = /** @type {Coordinates} */([0, 0])

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}, onDbClick = MouseDbClick.ignoreDbClick) {
        options.consumeEvent ??= true
        options.strictTarget ??= false
        super(target, blueprint, options)
        this.#onDbClick = onDbClick
        this.listenEvents()
    }

    listenEvents() {
        this.target.addEventListener("dblclick", this.#mouseDbClickHandler)
    }

    unlistenEvents() {
        this.target.removeEventListener("dblclick", this.#mouseDbClickHandler)
    }

    /* Subclasses will override the following method */
    /** @param {Coordinates} location */
    dbclicked(location) {
        this.onDbClick(location)
    }
}
