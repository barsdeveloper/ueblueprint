import html from "./html"
import sanitizeText from "./sanitizeText"
import Template from "./Template"
import Configuration from "../Configuration"

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
                <path stroke="black" fill="none" vector-effect="non-scaling-stroke" />
            </svg>
        `
    }

    /**
     * Applies the style to the element.
     * @param {GraphLink} link Element of the graph
     */
    apply(link) {
        super.apply(link)
        link.classList.add("ueb-positioned")
        link.pathElement = link.querySelector("path")
    }

    /**
     * Applies the style relative to the source pin location.
     * @param {GraphLink} link Link element
     */
    applySourceLocation(link) {
        link.style.setProperty("--ueb-from-input", link.originatesFromInput ? "1" : "0")
        // Set initial position
        link.style.setProperty("--ueb-from-x", sanitizeText(link.sourceLocation[0]))
        link.style.setProperty("--ueb-from-y", sanitizeText(link.sourceLocation[1]))
    }

    /**
     * Applies the style relative to the destination pin location.
     * @param {GraphLink} link Link element
     */
    applyDestinationLocation(link) {
        link.style.setProperty("--ueb-to-x", sanitizeText(link.destinationLocation[0]))
        link.style.setProperty("--ueb-to-y", sanitizeText(link.destinationLocation[1]))
        const r = Math.max(Math.abs(link.sourceLocation[0] - link.destinationLocation[0]), 1)
            / Math.max(Math.abs(link.sourceLocation[1] - link.destinationLocation[1]), 1)
        const d = Configuration.linkRightSVGPath(20, Math.max(40 / r, 30))
        // TODO move to CSS when Firefox will support property d
        link.pathElement.setAttribute("d", d)
    }
}
