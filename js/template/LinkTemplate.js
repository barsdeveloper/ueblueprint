import Configuration from "../Configuration"
import html from "./html"
import ITemplate from "./ITemplate"
import sanitizeText from "./sanitizeText"

/**
 * @typedef {import("../element/LinkElement").default} LinkElement
 * @typedef {import("../element/LinkMessageElement").default} LinkMessageElement
 */
export default class LinkTemplate extends ITemplate {

    static c1DecreasingSpeed = -0.1
    static c1ControlPoint = [100, 15]
    static c2DecreasingSpeed = -0.07
    static c2ControlPoint = [500, 130]

    /**
     * Returns the value of inverse multiplication function y = a / x + q. The value of a and q are calculated using
     * the derivative of that function y' = -a / x^2 at the point p (x = p[0] and y = p[1]). This means
     * y'(p[0]) = m => -a / p[0]^2 = m => a = -m * p[0]^2. Now, in order to determine q we can use the starting
     * function: p[1] = a / p[0] + q => q = p[1] - a / p[0]
     * @param {Number} m slope
     * @param {Number[]} p reference point
     * @returns Maximum value
     */
    static decreasingValue = (m, p) => {
        const a = -m * p[0] ** 2
        const q = p[1] - a / p[0]
        return x => a / x + q
    }

    /**
     * Computes the html content of the target element.
     * @param {LinkElement} link connecting two graph nodes 
     * @returns The result html 
     */
    render(link) {
        const uniqueId = crypto.randomUUID()
        return html`
            <svg version="1.2" baseProfile="tiny" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <g>
                    <path id="${uniqueId}" fill="none" vector-effect="non-scaling-stroke" />
                    <use href="#${uniqueId}" pointer-events="stroke" stroke-width="10" />
                </g>
            </svg>
        `
    }

    /**
     * Applies the style to the element.
     * @param {LinkElement} link Element of the graph
     */
    apply(link) {
        super.apply(link)
        if (link.linkMessageElement) {
            link.appendChild(link.linkMessageElement)
        }
        link.classList.add("ueb-positioned")
        link.pathElement = link.querySelector("path")
    }

    /**
     * 
     * @param {LinkElement} link element
     */
    applyStartDragging(link) {
        link.blueprint.dataset.creatingLink = true
        const referencePin = link.getSourcePin() ?? link.getDestinationPin()
        if (referencePin) {
            link.style.setProperty("--ueb-node-value-color", referencePin.getColor())
        }
        link.classList.add("ueb-link-dragging")
    }

    /**
     * 
     * @param {LinkElement} link element
     */
    applyFinishDragging(link) {
        link.blueprint.dataset.creatingLink = false
        link.classList.remove("ueb-link-dragging")
    }

    /**
     * Applies the style relative to the source pin location.
     * @param {LinkElement} link element
     */
    applySourceLocation(link) {
        link.style.setProperty("--ueb-from-input", link.originatesFromInput ? "1" : "0")
        link.style.setProperty("--ueb-from-x", sanitizeText(link.sourceLocation[0]))
        link.style.setProperty("--ueb-from-y", sanitizeText(link.sourceLocation[1]))
    }

    /**
     * Applies the style relative to the destination pin location.
     * @param {LinkElement} link Link element
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

        link.style.setProperty("--ueb-from-x", sanitizeText(link.sourceLocation[0]))
        link.style.setProperty("--ueb-from-y", sanitizeText(link.sourceLocation[1]))
        link.style.setProperty("--ueb-to-x", sanitizeText(link.destinationLocation[0]))
        link.style.setProperty("--ueb-to-y", sanitizeText(link.destinationLocation[1]))
        link.style.setProperty("margin-left", `-${start}px`)
        if (xInverted) {
            start += fillRatio * 100
        }
        link.style.setProperty("--ueb-start-percentage", `${start}%`)
        const c1
            = start
            + (xInverted
                ? LinkTemplate.decreasingValue(
                    LinkTemplate.c1DecreasingSpeed,
                    LinkTemplate.c1ControlPoint
                )(width)
                : 15
            )
            * fillRatio
        let c2 = Math.max(25 / aspectRatio, 30) + start
        c2 = Math.min(
            c2,
            LinkTemplate.decreasingValue(
                LinkTemplate.c2DecreasingSpeed,
                LinkTemplate.c2ControlPoint
            )(dx)
        )
        const d = Configuration.linkRightSVGPath(start, c1, c2)
        // TODO move to CSS when Firefox will support property d
        link.pathElement.setAttribute("d", d)
    }

    /**
     * 
     * @param {LinkElement} link element
     * @param {LinkMessageElement} linkMessage 
     */
    applyLinkMessage(link, linkMessage) {
        link.querySelectorAll(linkMessage.constructor.tagName).forEach(element => element.remove())
        link.appendChild(linkMessage)
        link.linkMessageElement = linkMessage
    }
}
