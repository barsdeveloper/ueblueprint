import Context from "./Context"

export default class KeyboardShortcut extends Context {

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true
        super(target, blueprint, options)

        /** @type {String[]} */
        this.key = this.options.key
        this.ctrlKey = options.ctrlKey ?? false
        this.shiftKey = options.shiftKey ?? false
        this.altKey = options.altKey ?? false
        this.metaKey = options.metaKey ?? false

        let self = this
        this.keyDownHandler = e => {
            if (
                e.code == self.key
                && e.ctrlKey === self.ctrlKey
                && e.shiftKey === self.shiftKey
                && e.altKey === self.altKey
                && e.metaKey === self.metaKey
            ) {
                self.fire()
            }
        }
    }

    blueprintFocused() {
        document.addEventListener("keydown", this.keyDownHandler)
    }

    blueprintUnfocused() {
        document.removeEventListener("keydown", this.keyDownHandler)
    }

    fire() {
    }
}
