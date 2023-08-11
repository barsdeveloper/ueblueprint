import IPointing from "./IPointing.js"

/**
 * @template {HTMLElement} T
 * @extends {IPointing<T>}
 */
export default class MouseDbClick extends IPointing {

    /** @param {Number[]} location */
    static ignoreDbClick = location => { }

    /** @param {MouseEvent} e */
    #mouseDbClickHandler = e => {
        if (!this.options.strictTarget || e.target === e.currentTarget) {
            if (this.consumeEvent) {
                e.stopImmediatePropagation() // Captured, don't call anyone else
            }
            this.clickedPosition = this.setLocationFromEvent(e)
            this.blueprint.mousePosition[0] = this.clickedPosition[0]
            this.blueprint.mousePosition[1] = this.clickedPosition[1]
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

    clickedPosition = [0, 0]

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
    dbclicked(location) {
        this.onDbClick(location)
    }
}
