import html from "./html"
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
            <svg viewBox="0 0 100 100">
                <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
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
        // Set initial position
        link.style.setProperty("--ueb-link-from-x", sanitizeText(initialPosition[0]))
        link.style.setProperty("--ueb-link-from-y", sanitizeText(initialPosition[1]))
    }

    /**
     * Applies the style relative to the destination pin location.
     * @param {GraphLink} link Link element
     */
    applyDestinationLocation(link, finalPosition) {
        link.style.setProperty("--ueb-link-to-x", sanitizeText(finalPosition[0]))
        link.style.setProperty("--ueb-link-to-y", sanitizeText(finalPosition[1]))
    }
}
