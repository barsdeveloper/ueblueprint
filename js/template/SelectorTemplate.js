import sanitizeText from "./sanitizeText"
import Template from "./Template"

/**
 * @typedef {import("../graph/GraphSelector").default} GraphSelector
 */
export default class SelectorTemplate extends Template {

    /**
     * Applies the style to the element.
     * @param {GraphSelector} selector Selector element
     */
    apply(selector) {
        super.apply(selector)
        selector.classList.add("ueb-positioned")
        this.applyFinishSelecting(selector)
    }

    /**
     * Applies the style relative to selection beginning.
     * @param {GraphSelector} selector Selector element
     */
    applyStartSelecting(selector, initialPosition) {
        // Set initial position
        selector.style.setProperty("--ueb-from-x", sanitizeText(initialPosition[0]))
        selector.style.setProperty("--ueb-from-y", sanitizeText(initialPosition[1]))
        // Final position coincide with the initial position, at the beginning of selection
        selector.style.setProperty("--ueb-to-x", sanitizeText(initialPosition[0]))
        selector.style.setProperty("--ueb-to-y", sanitizeText(initialPosition[1]))
        selector.blueprint.dataset.selecting = "true"
    }

    /**
     * Applies the style relative to selection.
     * @param {GraphSelector} selector Selector element
     */
    applyDoSelecting(selector, finalPosition) {
        selector.style.setProperty("--ueb-to-x", sanitizeText(finalPosition[0]))
        selector.style.setProperty("--ueb-to-y", sanitizeText(finalPosition[1]))
    }

    /**
     * Applies the style relative to selection finishing.
     * @param {GraphSelector} selector Selector element
     */
    applyFinishSelecting(selector) {
        selector.blueprint.dataset.selecting = "false"
    }
}
