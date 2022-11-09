import IKeyboardShortcut from "./IKeyboardShortcut"

/** @typedef {import("../../Blueprint").default} Blueprint */

/**
 * @template {HTMLElement} T
 * @extends IKeyboardShortcut<T>
 */
export default class KeyboardShortcutAction extends IKeyboardShortcut {

    static #ignoreEvent =
        /** @param {KeyboardShortcutAction} self */
        self => { }

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     * @param {(self: KeyboardShortcutAction<T>) => void} onKeyDown
     * @param {(self: KeyboardShortcutAction<T>) => void} onKeyUp
     */
    constructor(
        target,
        blueprint,
        options,
        onKeyDown = KeyboardShortcutAction.#ignoreEvent,
        onKeyUp = KeyboardShortcutAction.#ignoreEvent
    ) {
        super(target, blueprint, options)
        this.onKeyDown = onKeyDown
        this.onKeyUp = onKeyUp
    }

    fire() {
        this.onKeyDown(this)
    }

    unfire() {
        this.onKeyUp(this)
    }
}