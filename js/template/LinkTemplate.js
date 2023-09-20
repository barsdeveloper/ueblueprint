import { html, nothing } from "lit"
import Configuration from "../Configuration.js"
import ElementFactory from "../element/ElementFactory.js"
import IFromToPositionedTemplate from "./IFromToPositionedTemplate.js"
import KeyboardShortcut from "../input/keyboard/KeyboardShortcut.js"
import KnotEntity from "../entity/objects/KnotEntity.js"
import MouseClick from "../input/mouse/MouseClick.js"
import MouseDbClick from "../input/mouse/MouseDbClick.js"
import Shortcuts from "../Shortcuts.js"
import Utility from "../Utility.js"

/** @extends {IFromToPositionedTemplate<LinkElement>} */
export default class LinkTemplate extends IFromToPositionedTemplate {

    /**
     * Returns a function providing the inverse multiplication y = a / x + q. The value of a and q are calculated using
     * the derivative of that function y' = -a / x^2 at the point p (x = p[0] and y = p[1]). This means
     * y'(p[0]) = m => -a / p[0]^2 = m => a = -m * p[0]^2. Now, in order to determine q we can use the starting
     * function: p[1] = a / p[0] + q => q = p[1] - a / p[0]
     * @param {Number} m slope
     * @param {Number[]} p reference point
     */
    static decreasingValue(m, p) {
        const a = -m * p[0] ** 2
        const q = p[1] - a / p[0]
        /** @param {Number} x */
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

    static c2DecreasingValue = LinkTemplate.decreasingValue(-0.05, [500, 130])

    static c2Clamped = LinkTemplate.clampedLine([0, 80], [200, 40])

    #uniqueId = `ueb-id-${Math.floor(Math.random() * 1E12)}`

    /** @param {[Number, Number]} location */
    #createKnot = location => {
        const knotEntity = new KnotEntity({}, this.element.source.entity)
        const knot = /** @type {NodeElementConstructor} */(ElementFactory.getConstructor("ueb-node"))
            .newObject(knotEntity)
        knot.setLocation(...this.blueprint.snapToGrid(...location))
        const knotTemplate = /** @type {KnotNodeTemplate} */(knot.template)
        this.blueprint.addGraphElement(knot) // Important: keep it before changing existing links
        const inputPin = this.element.getInputPin()
        const outputPin = this.element.getOutputPin()
        this.element.source = null
        this.element.destination = null
        const link = /** @type {LinkElementConstructor} */(ElementFactory.getConstructor("ueb-link"))
            .newObject(outputPin, knotTemplate.inputPin)
        this.blueprint.addGraphElement(link)
        this.element.source = knotTemplate.outputPin
        this.element.destination = inputPin
    }

    createInputObjects() {
        const linkArea = this.element.querySelector(".ueb-link-area")
        return [
            ...super.createInputObjects(),
            new MouseDbClick(
                linkArea,
                this.blueprint,
                undefined,
                /** @param {[Number, Number]} location */
                location => {
                    location[0] += Configuration.knotOffset[0]
                    location[1] += Configuration.knotOffset[1]
                    location = Utility.snapToGrid(location[0], location[1], Configuration.gridSize)
                    this.#createKnot(location)
                },
            ),
            new MouseClick(
                linkArea,
                this.blueprint,
                {
                    enablerKey: new KeyboardShortcut(this.blueprint, this.blueprint, {
                        activationKeys: Shortcuts.enableLinkDelete,
                    })
                },
                () => this.blueprint.removeGraphElement(this.element),
            ),
        ]
    }

    /** @param {PropertyValues} changedProperties */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties)
        const sourcePin = this.element.source
        const destinationPin = this.element.destination
        if (changedProperties.has("fromX") || changedProperties.has("toX")) {
            const from = this.element.fromX
            const to = this.element.toX
            const isSourceAKnot = sourcePin?.nodeElement.getType() == Configuration.paths.knot
            const isDestinationAKnot = destinationPin?.nodeElement.getType() == Configuration.paths.knot
            if (isSourceAKnot && (!destinationPin || isDestinationAKnot)) {
                if (sourcePin?.isInput() && to > from + Configuration.distanceThreshold) {
                    this.element.source = /** @type {KnotNodeTemplate} */(sourcePin.nodeElement.template).outputPin
                } else if (sourcePin?.isOutput() && to < from - Configuration.distanceThreshold) {
                    this.element.source = /** @type {KnotNodeTemplate} */(sourcePin.nodeElement.template).inputPin
                }
            }
            if (isDestinationAKnot && (!sourcePin || isSourceAKnot)) {
                if (destinationPin?.isInput() && to < from - Configuration.distanceThreshold) {
                    this.element.destination =
                        /** @type {KnotNodeTemplate} */(destinationPin.nodeElement.template).outputPin
                } else if (destinationPin?.isOutput() && to > from + Configuration.distanceThreshold) {
                    this.element.destination =
                        /** @type {KnotNodeTemplate} */(destinationPin.nodeElement.template).inputPin
                }
            }
        }
        const dx = Math.max(Math.abs(this.element.fromX - this.element.toX), 1)
        const dy = Math.max(Math.abs(this.element.fromY - this.element.toY), 1)
        const width = Math.max(dx, Configuration.linkMinWidth)
        // const height = Math.max(Math.abs(link.fromY - link.toY), 1)
        const fillRatio = dx / width
        const xInverted = this.element.originatesFromInput
            ? this.element.fromX < this.element.toX
            : this.element.toX < this.element.fromX
        this.element.startPixels = dx < width // If under minimum width
            ? (width - dx) / 2 // Start from half the empty space
            : 0 // Otherwise start from the beginning
        this.element.startPercentage = xInverted ? this.element.startPixels + fillRatio * 100 : this.element.startPixels
        const c1 =
            this.element.startPercentage
            + (xInverted
                ? LinkTemplate.c1DecreasingValue(width)
                : 10
            )
            * fillRatio
        const aspectRatio = dy / Math.max(30, dx)
        const c2 =
            LinkTemplate.c2Clamped(dx)
            * Utility.sigmoidPositive(fillRatio * 1.2 + aspectRatio * 0.5, 1.5, 1.8)
            + this.element.startPercentage
        this.element.svgPathD = Configuration.linkRightSVGPath(this.element.startPercentage, c1, c2)
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        if (changedProperties.has("originatesFromInput")) {
            this.element.style.setProperty("--ueb-from-input", this.element.originatesFromInput ? "1" : "0")
        }
        const referencePin = this.element.source ?? this.element.destination
        if (referencePin) {
            this.element.style.setProperty("--ueb-link-color-rgb", Utility.printLinearColor(referencePin.color))
        }
        this.element.style.setProperty("--ueb-y-reflected", `${this.element.fromY > this.element.toY ? 1 : 0}`)
        this.element.style.setProperty("--ueb-start-percentage", `${Math.round(this.element.startPercentage)}%`)
        this.element.style.setProperty("--ueb-link-start", `${Math.round(this.element.startPixels)}`)
    }

    render() {
        return html`
            <svg version="1.2" baseProfile="tiny" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path id="${this.#uniqueId}" fill="none" vector-effect="non-scaling-stroke" d="${this.element.svgPathD}" />
                <use href="#${this.#uniqueId}" class="ueb-link-area" pointer-events="all" />
                <use href="#${this.#uniqueId}" class="ueb-link-path" pointer-events="none" />
            </svg>
            ${this.element.linkMessageIcon || this.element.linkMessageText ? html`
                <div class="ueb-link-message">
                    ${this.element.linkMessageIcon !== nothing ? html`
                        <span class="ueb-link-message-icon">${this.element.linkMessageIcon}</span>
                    ` : nothing}
                    ${this.element.linkMessageText !== nothing ? html`
                        <span class="ueb-link-message-text">${this.element.linkMessageText}</span>
                    ` : nothing}
                </div>
            ` : nothing}
        `
    }
}
