// @ts-check

import ITemplate from "./ITemplate"
import sanitizeText from "./sanitizeText"

/**
 * @typedef {import("../element/SelectorElement").default} SelectorElement
 */

export default class SelectorTemplate extends ITemplate {

    /**
     * Applies the style to the element.
     * @param {SelectorElement} selector Selector element
     */
    setup(selector) {
        super.setup(selector)
        selector.blueprint.dataset.selecting = "false"
    }

    /**
     * Applies the style relative to selection beginning.
     * @param {SelectorElement} selector Selector element
     */
    applyStartSelecting(selector, initialPosition) {
        requestAnimationFrame(_ => {
            // Set initial position
            selector.style.setProperty("--ueb-from-x", sanitizeText(initialPosition[0]))
            selector.style.setProperty("--ueb-from-y", sanitizeText(initialPosition[1]))
            // Final position coincide with the initial position, at the beginning of selection
            selector.style.setProperty("--ueb-to-x", sanitizeText(initialPosition[0]))
            selector.style.setProperty("--ueb-to-y", sanitizeText(initialPosition[1]))
            selector.blueprint.dataset.selecting = "true"
        })
    }

    /**
     * Applies the style relative to selection.
     * @param {SelectorElement} selector Selector element
     */
    applyDoSelecting(selector, finalPosition) {
        requestAnimationFrame(_ => {
            selector.style.setProperty("--ueb-to-x", sanitizeText(finalPosition[0]))
            selector.style.setProperty("--ueb-to-y", sanitizeText(finalPosition[1]))
        })
    }

    /**
     * Applies the style relative to selection finishing.
     * @param {SelectorElement} selector Selector element
     */
    applyFinishSelecting(selector) {
        requestAnimationFrame(_ => {
            selector.blueprint.dataset.selecting = "false"
        })
    }
}
