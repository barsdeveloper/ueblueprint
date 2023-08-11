import Configuration from "../Configuration.js"

/** @typedef {import("../Blueprint.js").default} Blueprint */

/** @template {Element} T */
export default class IInput {

    /** @type {T} */
    #target
    get target() {
        return this.#target
    }

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }

    consumeEvent = true

    /** @type {Object} */
    options


    listenHandler = () => this.listenEvents()
    unlistenHandler = () => this.unlistenEvents()

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.consumeEvent ??= false
        options.listenOnFocus ??= false
        options.unlistenOnTextEdit ??= false
        this.#target = target
        this.#blueprint = blueprint
        this.consumeEvent = options.consumeEvent
        this.options = options
    }

    setup() {
        if (this.options.listenOnFocus) {
            this.blueprint.addEventListener(Configuration.focusEventName.begin, this.listenHandler)
            this.blueprint.addEventListener(Configuration.focusEventName.end, this.unlistenHandler)
        }
        if (this.options.unlistenOnTextEdit) {
            this.blueprint.addEventListener(Configuration.editTextEventName.begin, this.unlistenHandler)
            this.blueprint.addEventListener(Configuration.editTextEventName.end, this.listenHandler)
        }
        if (this.blueprint.focused) {
            this.listenEvents()
        }
    }

    cleanup() {
        this.unlistenEvents()
        this.blueprint.removeEventListener(Configuration.focusEventName.begin, this.listenHandler)
        this.blueprint.removeEventListener(Configuration.focusEventName.end, this.unlistenHandler)
        this.blueprint.removeEventListener(Configuration.editTextEventName.begin, this.unlistenHandler)
        this.blueprint.removeEventListener(Configuration.editTextEventName.end, this.listenHandler)
    }

    /* Subclasses will probabily override the following methods */
    listenEvents() {
    }

    unlistenEvents() {
    }
}
