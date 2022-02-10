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
        link.style.setProperty("--ueb-from-output", link.originatesFromOutput ? "0" : "1")
        link.style.setProperty("--ueb-from-x", sanitizeText(link.sourceLocation[0]))
        link.style.setProperty("--ueb-from-y", sanitizeText(link.sourceLocation[1]))
    }

    /**
     * Applies the style relative to the destination pin location.
     * @param {GraphLink} link Link element
     */
    applyDestinationLocation(link) {
        const dx = Math.abs(link.sourceLocation[0] - link.destinationLocation[0])
        const width = Math.max(dx, Configuration.linkMinWidth)
        const height = Math.abs(link.sourceLocation[1] - link.destinationLocation[1])
        const ratio = Math.max(width, 1) / Math.max(height, 1)
        let start = dx < width ? (width - dx) / width * 100 / 2 : 0
        link.style.setProperty("--ueb-to-x", sanitizeText(link.destinationLocation[0]))
        link.style.setProperty("--ueb-to-y", sanitizeText(link.destinationLocation[1]))
        link.style.setProperty("margin-left", `-${start}px`)
        const xInverted = link.destinationLocation[0] < link.sourceLocation[0]
        if (xInverted) {
            if (dx < width) {
                start = start + dx / width * 100
            } else {
                start = 100
            }
        }
        const c1 = start + 20
        const c2 = Math.max(40 / ratio, 30) + start * 1.5
        const d = Configuration.linkRightSVGPath(start, c1, c2)
        // TODO move to CSS when Firefox will support property d
        link.pathElement.setAttribute("d", d)
    }
}
