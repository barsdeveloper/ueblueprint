export default class Context {

    constructor(target, blueprint, options) {
        /** @type {HTMLElement} */
        this.target = target
        /** @type {import("../Blueprint").default}" */
        this.blueprint = blueprint
        this.options = options
        let self = this
        this.blueprintFocusHandler = _ => self.listenEvents()
        this.blueprintUnfocusHandler = _ => self.unlistenEvents()
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
