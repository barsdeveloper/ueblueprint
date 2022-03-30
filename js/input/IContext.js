// @ts-check

/**
 * @typedef {import("../Blueprint").default} Blueprint
 */
export default class IContext {

    /** @type {HTMLElement} */
    target

    /** @type {Blueprint} */
    blueprint

    /** @type {Object} */
    options

    #hasFocus = false

    get hasFocus() {
        return this.#hasFocus
    }

    set hasFocus(_) {
    }

    constructor(target, blueprint, options) {
        this.target = target
        this.blueprint = blueprint
        this.options = options
        let self = this
        this.blueprintFocusHandler = _ => {
            this.#hasFocus = true
            self.listenEvents()
        }
        this.blueprintUnfocusHandler = _ => {
            self.unlistenEvents()
            this.#hasFocus = false
        }
        if (options?.wantsFocusCallback ?? false) {
            this.blueprint.addEventListener("blueprint-focus", this.blueprintFocusHandler)
            this.blueprint.addEventListener("blueprint-unfocus", this.blueprintUnfocusHandler)
        }
    }

    unlistenDOMElement() {
        this.unlistenEvents()
        this.blueprint.removeEventListener("blueprint-focus", this.blueprintFocusHandler)
        this.blueprint.removeEventListener("blueprint-unfocus", this.blueprintUnfocusHandler)
    }

    /* Subclasses will probabily override the following methods */
    listenEvents() {
    }

    unlistenEvents() {
    }
}
