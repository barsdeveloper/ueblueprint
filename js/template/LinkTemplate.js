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
}
