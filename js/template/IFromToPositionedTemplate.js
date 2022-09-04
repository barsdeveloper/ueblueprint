import ITemplate from "./ITemplate"

/**
 * @typedef {import("../element/IFromToPositionedElement").default} IFromToPositionedElement
 */

/**
 * @template {IFromToPositionedElement} T
 * @extends {ITemplate<T>}
 */
export default class IFromToPositionedTemplate extends ITemplate {

    /**
     * @param {T} selector
     * @param {Map} changedProperties
     */
    update(selector, changedProperties) {
        super.update(selector, changedProperties)
        if (changedProperties.has("initialPositionX")) {
            selector.style.setProperty("--ueb-from-x", `${selector.initialPositionX}`)
        }
        if (changedProperties.has("initialPositionY")) {
            selector.style.setProperty("--ueb-from-y", `${selector.initialPositionY}`)
        }
        if (changedProperties.has("finaPositionX")) {
            selector.style.setProperty("--ueb-to-x", `${selector.finaPositionX}`)
        }
        if (changedProperties.has("finaPositionY")) {
            selector.style.setProperty("--ueb-to-y", `${selector.finaPositionY}`)
        }
    }

}
