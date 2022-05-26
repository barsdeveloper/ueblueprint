// @ts-check

import { html } from "lit"
import ITemplate from "./ITemplate"

/**
 * @typedef {import("../element/SelectorElement").default} SelectorElement
 */

export default class SelectorTemplate extends ITemplate {

    /**
     * @param {SelectorElement} element
     */
    render(element) {
        return html`
            <style>
                :host {
                    --ueb-from-x: ${element.initialPositionX};
                    --ueb-from-y: ${element.initialPositionY};
                    --ueb-to-x: ${element.finaPositionX};
                    --ueb-to-y: ${element.finaPositionY};
                }
            </style>
        `
    }

    setup(element) {
        super.setup(element)
        element.classList.add("ueb-selector")
    }
}
