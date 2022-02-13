import html from "./html"
import sanitizeText from "./sanitizeText"
import Template from "./Template"
import Configuration from "../Configuration"
import Utility from "../Utility"

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
                <path stroke="green" fill="none" vector-effect="non-scaling-stroke" />
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
        link.style.setProperty("--ueb-from-input", link.originatesFromInput ? "0" : "1")
        link.style.setProperty("--ueb-from-x", sanitizeText(link.sourceLocation[0]))
        link.style.setProperty("--ueb-from-y", sanitizeText(link.sourceLocation[1]))
    }

    /**
     * Applies the style relative to the destination pin location.
     * @param {GraphLink} link Link element
     */
    applyFullLocation(link) {
        const dx = Math.max(Math.abs(link.sourceLocation[0] - link.destinationLocation[0]), 1)
        const width = Math.max(dx, Configuration.linkMinWidth)
        const height = Math.max(Math.abs(link.sourceLocation[1] - link.destinationLocation[1]), 1)
        const fillRatio = dx / width
        const aspectRatio = width / height
        let start = dx < width
            ? (width - dx) / width * 100 / 2
            : 0
        {
            link.style.setProperty("--ueb-from-x", sanitizeText(link.sourceLocation[0]))
            link.style.setProperty("--ueb-from-y", sanitizeText(link.sourceLocation[1]))
            link.style.setProperty("--ueb-to-x", sanitizeText(link.destinationLocation[0]))
            link.style.setProperty("--ueb-to-y", sanitizeText(link.destinationLocation[1]))
            link.style.setProperty("margin-left", `-${start}px`)
        }
        let c1 = 15
        const xInverted = link.originatesFromInput
            ? link.sourceLocation[0] < link.destinationLocation[0]
            : link.destinationLocation[0] < link.sourceLocation[0]
        if (!xInverted) {
            c1 = start + c1 * fillRatio
        } else {
            start = start + fillRatio * 100
            c1 = start + c1 * fillRatio * 100 / width
        }
        let c2 = Math.max(40 / aspectRatio, 30) + start * 1.4
        const d = Configuration.linkRightSVGPath(start, c1, c2)
        // TODO move to CSS when Firefox will support property d
        link.pathElement.setAttribute("d", d)
    }
}
