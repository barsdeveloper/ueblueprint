import html from "./html"
import sanitizeText from "./sanitizeText"
import Template from "./Template"

/**
 * @typedef {import("../graph/GraphLink").default} GraphLink
 */
export default class LinkTemplate extends Template {

    /**
     * Computes the html content of the target element.
     * @param {GraphLink} link Link connecting two graph nodes 
     * @returns The result html 
     */
    render(link) {
        return html`
            <svg version="1.2" baseProfile="tiny" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 0 C 20 0, 30 0, 50 50 S 70 100, 100 100" stroke="black" stroke-width="2" fill="none" vector-effect="non-scaling-stroke" />
            </svg>
        `
    }

    /**
     * Applies the style to the element.
     * @param {GraphLink} link Element of the graph
     */
    apply(link) {
        super.apply(link)
    }

    /**
     * Applies the style relative to the source pin location.
     * @param {GraphLink} link Link element
     */
    applySourceLocation(link, initialPosition) {
        link.style.setProperty("--ueb-from-input", link.originatesFromInput ? "1" : "0")
        // Set initial position
        link.style.setProperty("--ueb-from-x", sanitizeText(initialPosition[0]))
        link.style.setProperty("--ueb-from-y", sanitizeText(initialPosition[1]))
    }

    /**
     * Applies the style relative to the destination pin location.
     * @param {GraphLink} link Link element
     */
    applyDestinationLocation(link, finalPosition) {
        link.style.setProperty("--ueb-to-x", sanitizeText(finalPosition[0]))
        link.style.setProperty("--ueb-to-y", sanitizeText(finalPosition[1]))
    }
}
