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
            this.element.style.setProperty("--ueb-from-x", `${Math.round(this.element.initialPositionX)}`)
        }
        if (changedProperties.has("initialPositionY")) {
            this.element.style.setProperty("--ueb-from-y", `${Math.round(this.element.initialPositionY)}`)
        }
        if (changedProperties.has("finaPositionX")) {
            this.element.style.setProperty("--ueb-to-x", `${Math.round(this.element.finaPositionX)}`)
        }
        if (changedProperties.has("finaPositionY")) {
            this.element.style.setProperty("--ueb-to-y", `${Math.round(this.element.finaPositionY)}`)
        }
    }

}
