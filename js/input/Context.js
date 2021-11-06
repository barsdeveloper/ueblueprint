export default class Context {

    constructor(target, blueprint, options) {
        /** @type {HTMLElement} */
        this.target = target
        /** @type {import("../Blueprint").default}" */
        this.blueprint = blueprint
        this.options = options
        if (options?.wantsFocusCallback ?? false) {
            let self = this
            this.blueprint.addEventListener("blueprintfocus", _ => self.blueprintFocused())
            this.blueprint.addEventListener("blueprintunfocus", _ => self.blueprintUnfocused())
        }
    }

    blueprintFocused() {
        console.log("focused")
    }

    blueprintUnfocused() {
    }

}
