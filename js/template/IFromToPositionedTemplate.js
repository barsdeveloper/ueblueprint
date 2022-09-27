import ITemplate from "./ITemplate"

/** @typedef {import("../element/IFromToPositionedElement").default} IFromToPositionedElement */

/**
 * @template {IFromToPositionedElement} T
 * @extends {ITemplate<T>}
 */
export default class IFromToPositionedTemplate extends ITemplate {

    /** @param {Map} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        if (changedProperties.has("initialPositionX")) {
            this.element.style.setProperty("--ueb-from-x", `${this.element.initialPositionX}`)
        }
        if (changedProperties.has("initialPositionY")) {
            this.element.style.setProperty("--ueb-from-y", `${this.element.initialPositionY}`)
        }
        if (changedProperties.has("finaPositionX")) {
            this.element.style.setProperty("--ueb-to-x", `${this.element.finaPositionX}`)
        }
        if (changedProperties.has("finaPositionY")) {
            this.element.style.setProperty("--ueb-to-y", `${this.element.finaPositionY}`)
        }
    }

}
