import Configuration from "../../Configuration.js"
import Grammar from "../../serialization/Grammar.js"
import IInput from "../IInput.js"
import KeyBindingEntity from "../../entity/KeyBindingEntity.js"

/** @typedef {import("../../Blueprint").default} Blueprint */

/**
 * @template {HTMLElement} T
 * @extends IInput<T>
 */
export default class IKeyboardShortcut extends IInput {

    /** @type {KeyBindingEntity[]} */
    #activationKeys

    pressedKey = ""

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activateAnyKey ??= false
        options.activationKeys ??= []
        options.consumeEvent ??= true
        options.listenOnFocus ??= true
        options.unlistenOnTextEdit ??= true // No shortcuts when inside of a text field
        if (!(options.activationKeys instanceof Array)) {
            options.activationKeys = [options.activationKeys]
        }
        options.activationKeys = options.activationKeys.map(v => {
            if (v instanceof KeyBindingEntity) {
                return v
            }
            if (typeof v === "string") {
                const parsed = Grammar.keyBindingEntity.parse(v)
                if (parsed.status) {
                    return parsed.value
                }
            }
            throw new Error("Unexpected key value")
        })

        super(target, blueprint, options)

        this.#activationKeys = this.options.activationKeys ?? []

        const wantsShift = keyEntry => keyEntry.bShift || keyEntry.Key == "LeftShift" || keyEntry.Key == "RightShift"
        const wantsCtrl = keyEntry => keyEntry.bCtrl || keyEntry.Key == "LeftControl" || keyEntry.Key == "RightControl"
        const wantsAlt = keyEntry => keyEntry.bAlt || keyEntry.Key == "LeftAlt" || keyEntry.Key == "RightAlt"

        let self = this
        /** @param {KeyboardEvent} e */
        this.keyDownHandler = e => {
            if (
                this.options.activateAnyKey
                || self.#activationKeys.some(keyEntry =>
                    wantsShift(keyEntry) == e.shiftKey
                    && wantsCtrl(keyEntry) == e.ctrlKey
                    && wantsAlt(keyEntry) == e.altKey
                    && Configuration.Keys[keyEntry.Key] == e.code
                )
            ) {
                if (options.consumeEvent) {
                    e.preventDefault()
                    e.stopImmediatePropagation()
                }
                this.pressedKey = e.code
                self.fire()
                document.removeEventListener("keydown", self.keyDownHandler)
                document.addEventListener("keyup", self.keyUpHandler)
            }
        }

        /** @param {KeyboardEvent} e */
        this.keyUpHandler = e => {
            if (
                this.options.activateAnyKey
                || self.#activationKeys.some(keyEntry =>
                    keyEntry.bShift && e.key == "Shift"
                    || keyEntry.bCtrl && e.key == "Control"
                    || keyEntry.bAlt && e.key == "Alt"
                    || keyEntry.bCmd && e.key == "Meta"
                    || Configuration.Keys[keyEntry.Key] == e.code
                )
            ) {
                if (options.consumeEvent) {
                    e.stopImmediatePropagation()
                }
                self.unfire()
                this.pressedKey = ""
                document.removeEventListener("keyup", this.keyUpHandler)
                document.addEventListener("keydown", this.keyDownHandler)
            }
        }
    }

    listenEvents() {
        document.addEventListener("keydown", this.keyDownHandler)
    }

    unlistenEvents() {
        document.removeEventListener("keydown", this.keyDownHandler)
    }

    // Subclasses will want to override

    fire() {
    }

    unfire() {
    }
}
