export default class Context {

    constructor(target, blueprint, options) {
        /** @type {HTMLElement} */
        this.target = target
        /** @type {import("../Blueprint").default}" */
        this.blueprint = blueprint
        this.options = options
        if (options?.wantsFocusCallback ?? false) {
            let self = this
            this.blueprintfocusHandler = _ => self.blueprintFocused()
            this.blueprintunfocusHandler = _ => self.blueprintUnfocused()
            this.blueprint.addEventListener("blueprintfocus", this.blueprintfocusHandler)
            this.blueprint.addEventListener("blueprintunfocus", this.blueprintunfocusHandler)
        }
    }

    unlistenDOMElement() {
        this.blueprintUnfocused()
        this.blueprint.removeEventListener("blueprintfocus", this.blueprintfocusHandler)
        this.blueprint.removeEventListener("blueprintunfocus", this.blueprintunfocusHandler)
    }


    /* Subclasses will probabily override the following methods */
    blueprintFocused() {
    }

    blueprintUnfocused() {
    }
}
