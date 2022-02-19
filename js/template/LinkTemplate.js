import html from "./html"
import sanitizeText from "./sanitizeText"
import Template from "./Template"
import Configuration from "../Configuration"
import Utility from "../Utility"

/**
 * @typedef {import("../graph/GraphLink").default} GraphLink
 */
export default class LinkTemplate extends Template {

    static pixelToUnit(pixels, pixelFullSize) {
        return pixels * 100 / pixelFullSize
    }

    static unitToPixel(units, pixelFullSize) {
        return Math.round(units * pixelFullSize / 100)
    }

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
        const xInverted = link.originatesFromInput
            ? link.sourceLocation[0] < link.destinationLocation[0]
            : link.destinationLocation[0] < link.sourceLocation[0]
        let start = dx < width // If under minimum width
            ? (width - dx) / 2 // Start from half the empty space
            : 0 // Otherwise start from the beginning
        {
            link.style.setProperty("--ueb-from-x", sanitizeText(link.sourceLocation[0]))
            link.style.setProperty("--ueb-from-y", sanitizeText(link.sourceLocation[1]))
            link.style.setProperty("--ueb-to-x", sanitizeText(link.destinationLocation[0]))
            link.style.setProperty("--ueb-to-y", sanitizeText(link.destinationLocation[1]))
            link.style.setProperty("margin-left", `-${start}px`)
        }
        let c1 = 15
        if (!xInverted) {
            c1 = start + c1 * fillRatio
        } else {
            start = start + fillRatio * 100
            c1 = start + c1 * fillRatio
        }
        let c2 = Math.max(40 / aspectRatio, 30) + start
        const c2Decreasing = -0.05
        const getMaxC2 = (m, p) => {
            const a = -m * p[0] * p[0]
            const q = p[1] - a / p[0]
            return x => a / x + q
        }
        const controlPoint = [500, 140]
        if (xInverted) {
            c2 = Math.min(c2, getMaxC2(c2Decreasing, controlPoint)(width))
        }
        const d = Configuration.linkRightSVGPath(start, c1, c2)
        // TODO move to CSS when Firefox will support property d
        link.pathElement.setAttribute("d", d)
    }
}
