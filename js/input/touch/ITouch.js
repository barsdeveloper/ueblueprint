import IInput from "../IInput.js"
import Utility from "../../Utility.js"

/** @typedef {{ [identifier: Number]: [Number, Number] }} TouchLocations */

/**
 * @template {HTMLElement} T
 * @extends {IInput<T>}
 */
export default class ITouch extends IInput {

    /** @type {Number[]} */
    static #capturedTouches = []

    /** @type {TouchLocations} */
    touchLocations = {}

    constructor(target, blueprint, options = {}) {
        options.ignoreTranslateCompensate ??= false
        options.ignoreScale ??= false
        options.movementSpace ??= blueprint.getGridDOMElement() ?? document.documentElement
        super(target, blueprint, options)
        /** @type {HTMLElement} */
        this.movementSpace = options.movementSpace
    }

    /** @param {Number} identifier */
    captureTouch(identifier) {
        const exists = ITouch.#capturedTouches.includes(identifier)
        if (!exists) {
            ITouch.#capturedTouches.push(identifier)
            this.touchLocations[identifier] = [0, 0]
        }
        return exists
    }

    /** @param {Number} identifier */
    releaseTouch(identifier) {
        const index = ITouch.#capturedTouches.indexOf(identifier)
        if (index < 0) {
            return false
        }
        ITouch.#capturedTouches.splice(index, 1)
        delete this.touchLocations[identifier]
        return true
    }

    releaseAllTouches() {
        const ids = Object.keys(this.touchLocations).map(Number)
        if (ids.length === 0) {
            return false
        }
        ids.forEach(id => this.releaseTouch(id))
        return true
    }

    /** @param {TouchEvent} event */
    availableTouches(event) {
        return [...event.touches].map(v => v.identifier).filter(id => !ITouch.#capturedTouches.includes(id))
    }

    /** @param {TouchEvent} event */
    locationsFromEvent(event) {
        for (const touch of event.touches) {
            if (!(touch.identifier in this.touchLocations)) {
                continue
            }
            this.touchLocations[touch.identifier] = Utility.convertLocation(
                [touch.clientX, touch.clientY],
                this.movementSpace,
                this.options.ignoreScale
            )
            if (!this.options.ignoreTranslateCompensate) {
                this.touchLocations[touch.identifier] = this.blueprint.compensateTranslation(location[0], location[1])
            }
        }
        return this.touchLocations
    }

    /** @param {TouchEvent} event */
    clientLocationsFromEvent(event) {
        for (const touch of event.touches) {
            if (!(touch.identifier in this.touchLocations)) {
                continue
            }
            this.touchLocations[touch.identifier] = [touch.clientX, touch.clientY]
        }
        return this.touchLocations
    }

    /** @param {TouchEvent} event */
    releaseMissingTouches(event) {
        let released = false
        const eventIds = [...event.touches].map(v => v.identifier)
        for (const id in this.touchLocations) {
            const identifier = Number(id)
            if (!eventIds.includes(identifier)) {
                this.releaseTouch(identifier)
                released = true
            }
        }
        return released
    }
}
