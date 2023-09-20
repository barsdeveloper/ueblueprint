import IInput from "../IInput.js"
import Utility from "../../Utility.js"

/**
 * @template {Element} T
 * @extends {IInput<T>}
 */
export default class IPointing extends IInput {

    #location = [0, 0]
    get location() {
        return this.#location
    }

    /** @type {KeyboardShortcut?} */
    #enablerKey
    get enablerKey() {
        return this.#enablerKey
    }
    #enablerActivated = true
    get enablerActivated() {
        return this.#enablerActivated
    }

    constructor(target, blueprint, options = {}) {
        options.ignoreTranslateCompensate ??= false
        options.ignoreScale ??= false
        options.movementSpace ??= blueprint.getGridDOMElement() ?? document.documentElement
        super(target, blueprint, options)
        /** @type {HTMLElement} */
        this.movementSpace = options.movementSpace
        if (options.enablerKey) {
            this.#enablerKey = options.enablerKey
            this.#enablerKey.onKeyDown = () => this.#enablerActivated = true
            this.#enablerKey.onKeyUp = () => this.#enablerActivated = false
            this.#enablerKey.consumeEvent = false
            this.#enablerKey.listenEvents()
            this.#enablerActivated = false
        }
    }

    /** @param {MouseEvent} mouseEvent */
    setLocationFromEvent(mouseEvent) {
        let location = Utility.convertLocation(
            [mouseEvent.clientX, mouseEvent.clientY],
            this.movementSpace,
            this.options.ignoreScale
        )
        location = this.options.ignoreTranslateCompensate
            ? location
            : this.blueprint.compensateTranslation(location[0], location[1])
        this.#location[0] = location[0]
        this.#location[1] = location[1]
        return this.#location
    }
}
