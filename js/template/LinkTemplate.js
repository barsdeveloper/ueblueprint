import { html, nothing } from "lit"
import Configuration from "../Configuration.js"
import ElementFactory from "../element/ElementFactory.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import KnotEntity from "../entity/objects/KnotEntity.js"
import KeyboardShortcut from "../input/keyboard/KeyboardShortcut.js"
import MouseClick from "../input/mouse/MouseClick.js"
import MouseDbClick from "../input/mouse/MouseDbClick.js"
import Shortcuts from "../Shortcuts.js"
import Utility from "../Utility.js"
import IFromToPositionedTemplate from "./IFromToPositionedTemplate.js"

/** @extends {IFromToPositionedTemplate<LinkElement>} */
export default class LinkTemplate extends IFromToPositionedTemplate {

    /** @param {Number} x */
    static sigmoidPositive(x, curvature = 3.7, length = 1.1) {
        return 1 - Math.exp(-((x / length) ** curvature))
    }

    /**
     * Returns a function providing the inverse multiplication y = a / x + q. The value of a and q are calculated using
     * the derivative of that function y' = -a / x^2 at the point p (x = p[0] and y = p[1]). This means
     * y'(p[0]) = m => -a / p[0]^2 = m => a = -m * p[0]^2. Now, in order to determine q we can use the starting
     * function: p[1] = a / p[0] + q => q = p[1] - a / p[0]
     * @param {Number} m slope
     * @param {Coordinates} p reference point
     */
    static decreasingValue(m, p) {
        const a = -m * p[0] ** 2
        const q = p[1] - a / p[0]
        /** @param {Number} x */
        return x => a / x + q
    }

    static clampedLine = x => Math.min(Math.max(0, x), 1)

    static c1DecreasingValue = LinkTemplate.decreasingValue(-0.15, [100, 15])

    static c2DecreasingValue = LinkTemplate.decreasingValue(-0.05, [500, 130])

    static c2Clamped = x => -40 * LinkTemplate.clampedLine(x / 200) + 80

    #uniqueId = `ueb-id-${Math.floor(Math.random() * 1E12)}`

    /** @param {Coordinates} location */
    #createKnot = location => {
        const knotEntity = new KnotEntity({}, this.element.origin.entity)
        const knot = /** @type {NodeElementConstructor} */(ElementFactory.getConstructor("ueb-node"))
            .newObject(knotEntity)
        knot.setLocation(...this.blueprint.snapToGrid(...location))
        const knotTemplate = /** @type {KnotNodeTemplate} */(knot.template)
        this.blueprint.addGraphElement(knot) // Important: keep it before changing existing links
        const inputPin = this.element.getInputPin()
        const outputPin = this.element.getOutputPin()
        this.element.origin = null
        this.element.target = null
        const link = /** @type {LinkElementConstructor} */(ElementFactory.getConstructor("ueb-link"))
            .newObject(outputPin, knotTemplate.inputPin)
        this.blueprint.addGraphElement(link)
        this.element.origin = knotTemplate.outputPin
        this.element.target = inputPin
    }

    /** @param {PropertyValues} changedProperties */
    #calculateSVGPath(changedProperties) {
        const originPin = this.element.origin
        const targetPin = this.element.target
        const isOriginAKnot = originPin?.isKnot()
        const isTargetAKnot = targetPin?.isKnot()
        const from = this.element.fromX
        const to = this.element.toX

        // Switch actual input/output pins if allowed and makes sense
        if (isOriginAKnot && (!targetPin || isTargetAKnot)) {
            if (originPin?.isInputLoosely() && to > from + Configuration.distanceThreshold) {
                this.element.origin = /** @type {KnotPinTemplate} */(originPin.template).oppositePin()
            } else if (originPin?.isOutputLoosely() && to < from - Configuration.distanceThreshold) {
                this.element.origin = /** @type {KnotPinTemplate} */(originPin.template).oppositePin()
            }
        }
        if (isTargetAKnot && (!originPin || isOriginAKnot)) {
            if (targetPin?.isInputLoosely() && to < from - Configuration.distanceThreshold) {
                this.element.target = /** @type {KnotPinTemplate} */(targetPin.template).oppositePin()
            } else if (targetPin?.isOutputLoosely() && to > from + Configuration.distanceThreshold) {
                this.element.target = /** @type {KnotPinTemplate} */(targetPin.template).oppositePin()
            }
        }

        // Switch visual input/output pins if allowed and makes sense
        let directionsCheckedKnot
        if (
            originPin?.isKnot()
            && !changedProperties.has("fromX")
            && changedProperties.has("toX")
        ) {
            // The target end has moved and origin end is a knot
            directionsCheckedKnot = originPin.nodeElement
        } else if (
            targetPin?.isKnot()
            && changedProperties.has("toX")
            && !changedProperties.has("fromX")
        ) {
            // The origin end has moved and target end is a knot
            directionsCheckedKnot = targetPin.nodeElement
        }
        if (directionsCheckedKnot) {
            let leftPinsLocation = 0
            let leftPinsCount = 0
            let rightPinsLocation = 0
            let rightPinsCount = 0
            const pins = directionsCheckedKnot.template
                .getAllConnectedLinks()
                .map(l => l.getOtherPin(directionsCheckedKnot))
            for (const pin of pins) {
                if (pin.isInput()) {
                    rightPinsLocation += pin.getLinkLocation()[0]
                    ++rightPinsCount
                } else if (pin.isOutput()) {
                    leftPinsLocation += pin.getLinkLocation()[0]
                    ++leftPinsCount
                }
            }
            leftPinsLocation /= leftPinsCount
            rightPinsLocation /= rightPinsCount
            const knotTemplate =  /** @type {KnotNodeTemplate} */(directionsCheckedKnot.template)
            if ((rightPinsLocation < leftPinsLocation) != knotTemplate.switchDirectionsVisually) {
                knotTemplate.switchDirectionsVisually = rightPinsLocation < leftPinsLocation
            }
        }
        let sameDirection = originPin?.isOutputVisually() == targetPin?.isOutputVisually()

        // Actual computation
        const dx = Math.max(Math.abs(this.element.fromX - this.element.toX), 1)
        const dy = Math.max(Math.abs(this.element.fromY - this.element.toY), 1)
        const width = Math.max(dx, Configuration.linkMinWidth)
        const fillRatio = dx / width
        const xInverted = this.element.originatesFromInput
            ? this.element.fromX < this.element.toX
            : this.element.toX < this.element.fromX
        this.element.startPixels = dx < width // If under minimum width
            ? (width - dx) / 2 // Start from half the empty space
            : 0 // Otherwise start from the beginning
        const startPercentage = xInverted ? this.element.startPixels + fillRatio * 100 : this.element.startPixels
        this.element.startPercentage = startPercentage
        const c1 = startPercentage + (sameDirection
            ? 5
            : (
                (xInverted
                    ? LinkTemplate.c1DecreasingValue(width)
                    : 10
                )
                * fillRatio
            )
        )
        const aspectRatio = dy / Math.max(30, dx)
        const c2 = sameDirection
            // ? 100 - Math.abs(100 - 2 * startPercentage) + 15
            ? 100 * LinkTemplate.clampedLine(startPercentage / 50) + 15
            : (
                LinkTemplate.c2Clamped(dx)
                * LinkTemplate.sigmoidPositive(fillRatio * 1.2 + aspectRatio * 0.5, 1.5, 1.8)
                + startPercentage
            )
        this.element.svgPathD = Configuration.linkRightSVGPath(startPercentage, c1, c2, sameDirection)
    }

    createInputObjects() {
        /** @type {HTMLElement} */
        const linkArea = this.element.querySelector(".ueb-link-area")
        return [
            ...super.createInputObjects(),
            new MouseDbClick(
                linkArea,
                this.blueprint,
                undefined,
                /** @param {Coordinates} location */
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
        if (changedProperties.has("fromX") || changedProperties.has("toX")) {
            this.#calculateSVGPath(changedProperties)
        }
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        const referencePin = this.element.getOutputPin(true)
        if (referencePin) {
            this.element.style.setProperty("--ueb-link-color-rgb", LinearColorEntity.printLinearColor(referencePin.color))
        }
        this.element.style.setProperty("--ueb-start-percentage", `${Math.round(this.element.startPercentage)}%`)
        this.element.style.setProperty("--ueb-link-start", `${Math.round(this.element.startPixels)}`)
        const mirrorV = (this.element.fromY > this.element.toY ? -1 : 1) // If from is below to => mirror
            * (this.element.originatesFromInput ? -1 : 1) // Unless fro refers to an input pin
            * (this.element.origin?.isInputVisually() && this.element.target?.isInputVisually() ? -1 : 1)
        const mirrorH = (this.element.origin?.isInputVisually() && this.element.target?.isInputVisually() ? -1 : 1)
        this.element.style.setProperty("--ueb-link-scale-y", `${mirrorV}`)
        this.element.style.setProperty("--ueb-link-scale-x", `${mirrorH}`)
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
