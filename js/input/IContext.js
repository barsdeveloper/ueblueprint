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

    constructor(target, blueprint, options) {
        this.target = target
        this.blueprint = blueprint
        this.options = options
        let self = this
        this.listenHandler = _ => {
            self.listenEvents()
        }
        this.unlistenHandler = _ => {
            self.unlistenEvents()
        }
        if (options?.listenOnFocus ?? false) {
            this.blueprint.addEventListener("blueprint-focus", this.listenHandler)
            this.blueprint.addEventListener("blueprint-unfocus", this.unlistenHandler)
        }
        if (options?.unlistenOnEditText ?? false) {
            this.blueprint.addEventListener(this.blueprint.settings.editTextEventName.begin, this.unlistenHandler)
            this.blueprint.addEventListener(this.blueprint.settings.editTextEventName.end, this.listenHandler)
        }
    }

    unlistenDOMElement() {
        this.unlistenEvents()
        this.blueprint.removeEventListener("blueprint-focus", this.listenHandler)
        this.blueprint.removeEventListener("blueprint-unfocus", this.unlistenHandler)
        this.blueprint.removeEventListener(this.blueprint.settings.editTextEventName.begin, this.unlistenHandler)
        this.blueprint.removeEventListener(this.blueprint.settings.editTextEventName.end, this.listenHandler)
    }

    /* Subclasses will probabily override the following methods */
    listenEvents() {
    }

    unlistenEvents() {
    }
}
