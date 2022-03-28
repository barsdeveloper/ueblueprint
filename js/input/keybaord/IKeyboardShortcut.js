// @ts-check

import Configuration from "../../Configuration"
import IContext from "../IContext"
import ISerializer from "../../serialization/ISerializer"
import KeyBindingEntity from "../../entity/KeyBindingEntity"
export default class IKeyboardShortcut extends IContext {

    /** @type {KeyBindingEntity} */
    #activationKeys

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true
        options.activationKeys ??= []
        if (!(options.activationKeys instanceof Array)) {
            options.activationKeys = [options.activationKeys]
        }
        options.activationKeys = options.activationKeys.map(v => {
            if (v instanceof KeyBindingEntity) {
                return v
            }
            if (v.constructor === String) {
                const parsed = ISerializer.grammar.KeyBinding.parse(v)
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
                self.#activationKeys.some(keyEntry =>
                    wantsShift(keyEntry) == e.shiftKey
                    && wantsCtrl(keyEntry) == e.ctrlKey
                    && wantsAlt(keyEntry) == e.altKey
                    && Configuration.Keys[keyEntry.Key] == e.code
                )) {
                self.fire()
                document.removeEventListener("keydown", self.keyDownHandler)
                document.addEventListener("keyup", self.keyUpHandler)
            }
        }

        /** @param {KeyboardEvent} e */
        this.keyUpHandler = e => {
            if (
                self.#activationKeys.some(keyEntry =>
                    keyEntry.bShift && e.key == "Shift"
                    || keyEntry.bCtrl && e.key == "Control"
                    || keyEntry.bAlt && e.key == "Alt"
                    || keyEntry.bCmd && e.key == "Meta" // Unsure about this, what key is that?
                    || Configuration.Keys[keyEntry.Key] == e.code

                )) {
                self.unfire()
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
