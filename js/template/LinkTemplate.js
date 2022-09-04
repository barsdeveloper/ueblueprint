import { css, html } from "lit"
import Configuration from "../Configuration"
import Utility from "../Utility"
import IFromToPositionedTemplate from "./IFromToPositionedTemplate"

/**
 * @typedef {import("../element/LinkElement").default} LinkElement
 */


/**
 * @extends {IFromToPositionedTemplate<LinkElement>}
 */
export default class LinkTemplate extends IFromToPositionedTemplate {

    /**
     * Returns a function performing the inverse multiplication y = a / x + q. The value of a and q are calculated using
     * the derivative of that function y' = -a / x^2 at the point p (x = p[0] and y = p[1]). This means
     * y'(p[0]) = m => -a / p[0]^2 = m => a = -m * p[0]^2. Now, in order to determine q we can use the starting
     * function: p[1] = a / p[0] + q => q = p[1] - a / p[0]
     * @param {Number} m slope
     * @param {Number[]} p reference point
     * @returns Maximum value
     */
    static decreasingValue(m, p) {
        const a = -m * p[0] ** 2
        const q = p[1] - a / p[0]
        return x => a / x + q
    }

    /**
     * Returns a function performing a clamped line passing through two points. It is clamped after and before the
     * points. It is easier explained with an example.
     *            b ______
     *             /
     *            /
     *           /
     *          /
     *         /
     *  ______/ a
     */
    static clampedLine(a, b) {
        if (a[0] > b[0]) {
            const temp = a
            a = b
            b = temp
        }
        const m = (b[1] - a[1]) / (b[0] - a[0])
        const q = a[1] - m * a[0]
        return x => x < a[0]
            ? a[1]
            : x > b[0]
                ? b[1]
                : m * x + q
    }

    static c1DecreasingValue = LinkTemplate.decreasingValue(-0.15, [100, 15])

    static c2DecreasingValue = LinkTemplate.decreasingValue(-0.06, [500, 130])

    static c2Clamped = LinkTemplate.clampedLine([0, 100], [200, 30])

    /**
     * @param {LinkElement} link
     * @param {Map} changedProperties
     */
    willUpdate(link, changedProperties) {
        super.willUpdate(link, changedProperties)
        const dx = Math.max(Math.abs(link.initialPositionX - link.finaPositionX), 1)
        const width = Math.max(dx, Configuration.linkMinWidth)
        // const height = Math.max(Math.abs(link.initialPositionY - link.finaPositionY), 1)
        const fillRatio = dx / width
        // const aspectRatio = width / height
        const xInverted = link.originatesFromInput
            ? link.initialPositionX < link.finaPositionX
            : link.finaPositionX < link.initialPositionX
        link.startPixels = dx < width // If under minimum width
            ? (width - dx) / 2 // Start from half the empty space
            : 0 // Otherwise start from the beginning
        link.startPercentage = xInverted ? link.startPixels + fillRatio * 100 : link.startPixels
        const c1
            = link.startPercentage
            + (xInverted
                ? LinkTemplate.c1DecreasingValue(width)
                : 10
            )
            * fillRatio
        let c2 = LinkTemplate.c2Clamped(xInverted ? -dx : dx) + link.startPercentage
        c2 = Math.min(c2, LinkTemplate.c2DecreasingValue(width))
        link.svgPathD = Configuration.linkRightSVGPath(link.startPercentage, c1, c2)
    }

    /**
     * @param {LinkElement} link
     * @param {Map} changedProperties
     */
    update(link, changedProperties) {
        super.update(link, changedProperties)
        if (changedProperties.has("originatesFromInput")) {
            link.style.setProperty("--ueb-from-input", link.originatesFromInput ? "1" : "0")
        }
        const referencePin = link.sourcePin ?? link.destinationPin
        if (referencePin) {
            link.style.setProperty("--ueb-link-color-rgb", Utility.printLinearColor(referencePin.color))
        }
        link.style.setProperty("--ueb-link-start", `${Math.round(link.startPixels)}`)
        link.style.setProperty("--ueb-start-percentage", `${Math.round(link.startPercentage)}%`)
    }

    /**
     * @param {LinkElement} link
     */
    render(link) {
        const uniqueId = "ueb-id-" + Math.floor(Math.random() * 1E12)
        return html`
            <svg version="1.2" baseProfile="tiny" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <g>
                    <path id="${uniqueId}" fill="none" vector-effect="non-scaling-stroke" d="${link.svgPathD}" />
                    <use href="#${uniqueId}" pointer-events="stroke" stroke-width="10" />
                </g>
            </svg>
            ${link.linkMessageIcon != "" || link.linkMessageText != "" ? html`
                <div class="ueb-link-message">
                    <span class="${link.linkMessageIcon}"></span>
                    <span class="ueb-link-message-text">${link.linkMessageText}</span>
                </div>
            ` : html``}
        `
    }
}
