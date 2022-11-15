import { html, nothing } from "lit"
import Configuration from "../Configuration"
import ElementFactory from "../element/ElementFactory"
import IFromToPositionedTemplate from "./IFromToPositionedTemplate"
import KnotEntity from "../entity/objects/KnotEntity"
import MouseDbClick from "../input/mouse/MouseDbClick"
import Utility from "../Utility"

/**
 * @typedef {import("../element/LinkElement").default} LinkElement
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("../template/KnotNodeTemplate").default} KnotNodeTemplate
 */


/** @extends {IFromToPositionedTemplate<LinkElement>} */
export default class LinkTemplate extends IFromToPositionedTemplate {

    /**
     * Returns a function providing the inverse multiplication y = a / x + q. The value of a and q are calculated using
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
     * Returns a function providing a clamped line passing through two points. It is clamped after and before the
     * points. It is easier explained with the following ascii draw.
     *          b ______
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

    #createKnot =
        /** @param {Number[]} location */
        location => {
            const knot = /** @type {NodeElement} */(new (ElementFactory.getConstructor("ueb-node"))(new KnotEntity()))
            knot.setLocation(this.element.blueprint.snapToGrid(location))
            const link = new (ElementFactory.getConstructor("ueb-link"))(
                /** @type {KnotNodeTemplate} */(knot.template).outputPin,
                this.element.destinationPin
            )
            this.element.destinationPin = /** @type {KnotNodeTemplate} */(knot.template).inputPin
            this.element.blueprint.addGraphElement(knot, link)
        }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new MouseDbClick(
                this.element.querySelector(".ueb-link-area"),
                this.element.blueprint,
                undefined,
                (location) => this.#createKnot(location)
            )
        ]
    }

    /**
     * @param {Map} changedProperties
     */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties)
        const sourcePin = this.element.sourcePin
        const destinationPin = this.element.destinationPin
        if (changedProperties.has("fromX") || changedProperties.has("toX")) {
            const isSourceAKnot = sourcePin?.nodeElement.getType() == Configuration.knotNodeTypeName
            const isDestinationAKnot = destinationPin?.nodeElement.getType() == Configuration.knotNodeTypeName
            if (isSourceAKnot && (!destinationPin || isDestinationAKnot)) {
                if (sourcePin?.isInput() && this.element.toX > this.element.fromX + Configuration.distanceThreshold) {
                    // @ts-expect-error
                    this.element.sourcePin = /** @type {KnotNodeTemplate} */(sourcePin.nodeElement.template).outputPin
                } else if (sourcePin?.isOutput() && this.element.toX < this.element.fromX - Configuration.distanceThreshold) {
                    // @ts-expect-error
                    this.element.sourcePin = /** @type {KnotNodeTemplate} */(sourcePin.nodeElement.template).inputPin
                }
            }
            if (isDestinationAKnot && (!isSourceAKnot || isSourceAKnot)) {
                if (destinationPin?.isInput() && this.element.toX < this.element.fromX + Configuration.distanceThreshold) {
                    // @ts-expect-error
                    this.element.destinationPin = /** @type {KnotNodeTemplate} */(destinationPin.nodeElement.template).outputPin
                } else if (destinationPin?.isOutput() && this.element.toX > this.element.fromX - Configuration.distanceThreshold) {
                    // @ts-expect-error
                    this.element.destinationPin = /** @type {KnotNodeTemplate} */(destinationPin.nodeElement.template).inputPin
                }
            }
        }
        const dx = Math.max(Math.abs(this.element.fromX - this.element.toX), 1)
        const width = Math.max(dx, Configuration.linkMinWidth)
        // const height = Math.max(Math.abs(link.fromY - link.toY), 1)
        const fillRatio = dx / width
        // const aspectRatio = width / height
        const xInverted = this.element.originatesFromInput
            ? this.element.fromX < this.element.toX
            : this.element.toX < this.element.fromX
        this.element.startPixels = dx < width // If under minimum width
            ? (width - dx) / 2 // Start from half the empty space
            : 0 // Otherwise start from the beginning
        this.element.startPercentage = xInverted ? this.element.startPixels + fillRatio * 100 : this.element.startPixels
        const c1
            = this.element.startPercentage
            + (xInverted
                ? LinkTemplate.c1DecreasingValue(width)
                : 10
            )
            * fillRatio
        let c2 = LinkTemplate.c2Clamped(xInverted ? -dx : dx) + this.element.startPercentage
        c2 = Math.min(c2, LinkTemplate.c2DecreasingValue(width))
        this.element.svgPathD = Configuration.linkRightSVGPath(this.element.startPercentage, c1, c2)
    }

    /** @param {Map} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        if (changedProperties.has("originatesFromInput")) {
            this.element.style.setProperty("--ueb-from-input", this.element.originatesFromInput ? "1" : "0")
        }
        const referencePin = this.element.sourcePin ?? this.element.destinationPin
        if (referencePin) {
            this.element.style.setProperty("--ueb-link-color-rgb", Utility.printLinearColor(referencePin.color))
        }
        this.element.style.setProperty("--ueb-y-reflected", `${this.element.fromY > this.element.toY ? 1 : 0}`)
        this.element.style.setProperty("--ueb-start-percentage", `${Math.round(this.element.startPercentage)}%`)
        this.element.style.setProperty("--ueb-link-start", `${Math.round(this.element.startPixels)}`)
    }

    render() {
        const uniqueId = `ueb-id-${Math.floor(Math.random() * 1E12)}`
        return html`
            <svg version="1.2" baseProfile="tiny" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <g class="ueb-link-area">
                    <path id="${uniqueId}" fill="none" vector-effect="non-scaling-stroke" d="${this.element.svgPathD}" />
                    <use href="#${uniqueId}" pointer-events="stroke" stroke-width="20" />
                </g>
            </svg>
            ${this.element.linkMessageIcon != "" || this.element.linkMessageText != "" ? html`
                <div class="ueb-link-message">
                    <span class="${this.element.linkMessageIcon}"></span>
                    <span class="ueb-link-message-text">${this.element.linkMessageText}</span>
                </div>
            ` : nothing}
        `
    }
}
