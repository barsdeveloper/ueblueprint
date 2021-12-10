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
        selector.classList.add("ueb-selector")
        selector.dataset.selecting = "false"
    }

    /**
     * Applies the style relative to selection beginning.
     * @param {GraphSelector} selector Selector element
     */
    applyStartSelecting(selector, initialPosition) {
        // Set initial position
        selector.style.setProperty("--ueb-select-from-x", initialPosition[0])
        selector.style.setProperty("--ueb-select-from-y", initialPosition[1])
        // Final position coincide with the initial position, at the beginning of selection
        selector.style.setProperty("--ueb-select-to-x", initialPosition[0])
        selector.style.setProperty("--ueb-select-to-y", initialPosition[1])
        selector.dataset.selecting = "true"
    }

    /**
     * Applies the style relative to selection.
     * @param {GraphSelector} selector Selector element
     */
    applyDoSelecting(selector, finalPosition) {
        selector.style.setProperty("--ueb-select-to-x", finalPosition[0])
        selector.style.setProperty("--ueb-select-to-y", finalPosition[1])
    }

    /**
     * Applies the style relative to selection finishing.
     * @param {GraphSelector} selector Selector element
     */
    applyFinishSelecting(selector, finalPosition) {
        selector.dataset.selecting = "false"
    }
}
