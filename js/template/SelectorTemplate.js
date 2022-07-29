// @ts-check

import { html } from "lit"
import ITemplate from "./ITemplate"

/**
 * @typedef {import("../element/SelectorElement").default} SelectorElement
 */

export default class SelectorTemplate extends ITemplate {

    /**
     * @param {SelectorElement} selector
     * @param {Map} changedProperties
     */
    update(selector, changedProperties) {
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
