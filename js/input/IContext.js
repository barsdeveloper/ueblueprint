// @ts-check

/**
 * @typedef {import("../Blueprint").default} Blueprint
 */
export default class IContext {

    /** @type {HTMLElement} */
    #target
    get target() {
        return this.#target
    }

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }

    /** @type {Object} */
    options

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options) {
        this.#target = target
        this.#blueprint = blueprint
        this.options = options
        this.options.listenOnFocus = this.options?.listenOnFocus ?? false
        this.options.unlistenOnTextEdit = this.options?.unlistenOnTextEdit ?? false
        let self = this
        this.listenHandler = _ => self.listenEvents()
        this.unlistenHandler = _ => self.unlistenEvents()
        if (this.options.listenOnFocus) {
            this.blueprint.addEventListener(this.blueprint.settings.focusEventName.begin, this.listenHandler)
            this.blueprint.addEventListener(this.blueprint.settings.focusEventName.end, this.unlistenHandler)
        }
        if (options?.unlistenOnTextEdit ?? false) {
            this.blueprint.addEventListener(this.blueprint.settings.editTextEventName.begin, this.unlistenHandler)
            this.blueprint.addEventListener(this.blueprint.settings.editTextEventName.end, this.listenHandler)
        }
    }

    unlistenDOMElement() {
        this.unlistenEvents()
        this.blueprint.removeEventListener(this.blueprint.settings.focusEventName.begin, this.listenHandler)
        this.blueprint.removeEventListener(this.blueprint.settings.focusEventName.end, this.unlistenHandler)
        this.blueprint.removeEventListener(this.blueprint.settings.editTextEventName.begin, this.unlistenHandler)
        this.blueprint.removeEventListener(this.blueprint.settings.editTextEventName.end, this.listenHandler)
    }

    /* Subclasses will probabily override the following methods */
    listenEvents() {
    }

    unlistenEvents() {
    }
}
