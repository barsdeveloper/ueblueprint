import { html } from "lit"
import Configuration from "../Configuration.js"
import Copy from "../input/common/Copy.js"
import Cut from "../input/common/Cut.js"
import ITemplate from "./ITemplate.js"
import KeyboardCanc from "../input/keybaord/KeyboardCanc.js"
import KeyboardEnableZoom from "../input/keybaord/KeyboardEnableZoom.js"
import KeyboardSelectAll from "../input/keybaord/KeyboardSelectAll.js"
import KeyboardShortcutAction from "../input/keybaord/KeyboardShortcutAction.js"
import MouseScrollGraph from "../input/mouse/MouseScrollGraph.js"
import MouseTracking from "../input/mouse/MouseTracking.js"
import Paste from "../input/common/Paste.js"
import Select from "../input/mouse/Select.js"
import Shortcut from "../Shortcut.js"
import Unfocus from "../input/mouse/Unfocus.js"
import Utility from "../Utility.js"
import Zoom from "../input/mouse/Zoom.js"

/**
 * @typedef {import("../Blueprint.js").default} Blueprint
 * @typedef {import("../element/PinElement.js").default} PinElement
 * @typedef {import("../element/SelectorElement.js").default} SelectorElement
 * @typedef {import("../entity/PinReferenceEntity.js").default} PinReferenceEntity
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

/** @extends ITemplate<Blueprint> */
export default class BlueprintTemplate extends ITemplate {

    static styleVariables = {
        "--ueb-font-size": `${Configuration.fontSize}`,
        "--ueb-grid-axis-line-color": `${Configuration.gridAxisLineColor}`,
        "--ueb-grid-expand": `${Configuration.expandGridSize}px`,
        "--ueb-grid-line-color": `${Configuration.gridLineColor}`,
        "--ueb-grid-line-width": `${Configuration.gridLineWidth}px`,
        "--ueb-grid-set-line-color": `${Configuration.gridSetLineColor}`,
        "--ueb-grid-set": `${Configuration.gridSet}`,
        "--ueb-grid-size": `${Configuration.gridSize}px`,
        "--ueb-link-min-width": `${Configuration.linkMinWidth}`,
        "--ueb-node-radius": `${Configuration.nodeRadius}px`,
    }

    #resizeObserver = new ResizeObserver(entries => {
        const size = entries.find(entry => entry.target === this.viewportElement)?.devicePixelContentBoxSize?.[0]
        if (size) {
            this.viewportSize[0] = size.inlineSize
            this.viewportSize[1] = size.blockSize
        }
    })

    /** @type {HTMLElement} */ headerElement
    /** @type {HTMLElement} */ overlayElement
    /** @type {HTMLElement} */ viewportElement
    /** @type {SelectorElement} */ selectorElement
    /** @type {HTMLElement} */ gridElement
    /** @type {HTMLElement} */ linksContainerElement
    /** @type {HTMLElement} */ nodesContainerElement
    viewportSize = [0, 0]

    /** @param {Blueprint} element */
    initialize(element) {
        super.initialize(element)
        this.element.style.cssText = Object.entries(BlueprintTemplate.styleVariables)
            .map(([k, v]) => `${k}:${v};`).join("")
    }

    setup() {
        super.setup()
        this.#resizeObserver.observe(this.viewportElement, {
            box: "device-pixel-content-box",
        })
        const bounding = this.viewportElement.getBoundingClientRect()
        this.viewportSize[0] = bounding.width
        this.viewportSize[1] = bounding.height
        if (this.blueprint.nodes.length > 0) {
            this.blueprint.requestUpdate()
            this.blueprint.updateComplete.then(() => this.centerContentInViewport())
        }
    }

    cleanup() {
        super.cleanup()
        this.#resizeObserver.unobserve(this.viewportElement)
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new Copy(this.element.getGridDOMElement(), this.element),
            new Paste(this.element.getGridDOMElement(), this.element),
            new Cut(this.element.getGridDOMElement(), this.element),
            new KeyboardShortcutAction(this.element.getGridDOMElement(), this.element, {
                activationKeys: Shortcut.duplicateNodes
            }, () =>
                this.blueprint.template.getPasteInputObject().pasted(
                    this.blueprint.template.getCopyInputObject().copied()
                )
            ),
            new KeyboardCanc(this.element.getGridDOMElement(), this.element),
            new KeyboardSelectAll(this.element.getGridDOMElement(), this.element),
            new Zoom(this.element.getGridDOMElement(), this.element),
            new Select(this.element.getGridDOMElement(), this.element, {
                clickButton: Configuration.mouseClickButton,
                exitAnyButton: true,
                moveEverywhere: true,
            }),
            new MouseScrollGraph(this.element.getGridDOMElement(), this.element, {
                clickButton: Configuration.mouseRightClickButton,
                exitAnyButton: false,
                moveEverywhere: true,
            }),
            new Unfocus(this.element.getGridDOMElement(), this.element),
            new MouseTracking(this.element.getGridDOMElement(), this.element),
            new KeyboardEnableZoom(this.element.getGridDOMElement(), this.element),
        ]
    }

    render() {
        return html`
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">
                    Zoom ${this.blueprint.zoom == 0 ? "1:1" : (this.blueprint.zoom > 0 ? "+" : "") + this.blueprint.zoom}
                </div>
            </div>
            <div class="ueb-viewport-overlay"></div>
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="--ueb-additional-x: ${Math.round(this.blueprint.translateX)}; --ueb-additional-y: ${Math.round(this.blueprint.translateY)}; --ueb-translate-x: ${Math.round(this.blueprint.translateX)}; --ueb-translate-y: ${Math.round(this.blueprint.translateY)};">
                    <div class="ueb-grid-content">
                        <div data-links></div>
                        <div data-nodes></div>
                        <ueb-selector></ueb-selector>
                    </div>
                </div>
            </div>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.headerElement = this.blueprint.querySelector('.ueb-viewport-header')
        this.overlayElement = this.blueprint.querySelector('.ueb-viewport-overlay')
        this.viewportElement = this.blueprint.querySelector('.ueb-viewport-body')
        this.selectorElement = this.blueprint.querySelector('ueb-selector')
        this.gridElement = this.viewportElement.querySelector(".ueb-grid")
        this.linksContainerElement = this.blueprint.querySelector("[data-links]")
        this.linksContainerElement.append(...this.blueprint.getLinks())
        this.nodesContainerElement = this.blueprint.querySelector("[data-nodes]")
        this.nodesContainerElement.append(...this.blueprint.getNodes())
        this.viewportElement.scroll(Configuration.expandGridSize, Configuration.expandGridSize)
    }

    /** @param {PropertyValues} changedProperties */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties)
        if (this.headerElement && changedProperties.has("zoom")) {
            this.headerElement.classList.add("ueb-zoom-changed")
            this.headerElement.addEventListener(
                "animationend",
                () => this.headerElement.classList.remove("ueb-zoom-changed")
            )
        }
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties)
        if (changedProperties.has("scrollX") || changedProperties.has("scrollY")) {
            this.viewportElement.scroll(this.blueprint.scrollX, this.blueprint.scrollY)
        }
        if (changedProperties.has("zoom")) {
            this.blueprint.style.setProperty("--ueb-scale", this.blueprint.getScale())
            const previousZoom = changedProperties.get("zoom")
            const minZoom = Math.min(previousZoom, this.blueprint.zoom)
            const maxZoom = Math.max(previousZoom, this.blueprint.zoom)
            const classes = Utility.range(minZoom, maxZoom)
            const getClassName = v => `ueb-zoom-${v}`
            if (previousZoom < this.blueprint.zoom) {
                this.blueprint.classList.remove(...classes.filter(v => v < 0).map(getClassName))
                this.blueprint.classList.add(...classes.filter(v => v > 0).map(getClassName))
            } else {
                this.blueprint.classList.remove(...classes.filter(v => v > 0).map(getClassName))
                this.blueprint.classList.add(...classes.filter(v => v < 0).map(getClassName))
            }
        }
    }

    getCommentNodes(justSelected = false) {
        return this.blueprint.querySelectorAll(
            `ueb-node[data-type="${Configuration.paths.comment}"]${justSelected ? '[data-selected="true"]' : ''}`
        )
    }

    /** @param {PinReferenceEntity} pinReference */
    getPin(pinReference) {
        return /** @type {PinElement} */(this.blueprint.querySelector(
            `ueb-node[data-name="${pinReference.objectName}"] ueb-pin[data-id="${pinReference.pinGuid}"]`
        ))
    }

    getCopyInputObject() {
        return this.getInputObject(Copy)
    }

    getPasteInputObject() {
        return this.getInputObject(Paste)
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    isPointVisible(x, y) {
        return false
    }

    gridTopVisibilityBoundary() {
        return this.blueprint.scaleCorrect(this.blueprint.scrollY) - this.blueprint.translateY
    }

    gridRightVisibilityBoundary() {
        return this.gridLeftVisibilityBoundary() + this.blueprint.scaleCorrect(this.viewportSize[0])
    }

    gridBottomVisibilityBoundary() {
        return this.gridTopVisibilityBoundary() + this.blueprint.scaleCorrect(this.viewportSize[1])
    }

    gridLeftVisibilityBoundary() {
        return this.blueprint.scaleCorrect(this.blueprint.scrollX) - this.blueprint.translateX
    }

    centerViewport(x = 0, y = 0, smooth = true) {
        const centerX = this.gridLeftVisibilityBoundary() + this.blueprint.scaleCorrect(this.viewportSize[0] / 2)
        const centerY = this.gridTopVisibilityBoundary() + this.blueprint.scaleCorrect(this.viewportSize[1] / 2)
        this.blueprint.scrollDelta(
            this.blueprint.scaleCorrectReverse(x - centerX),
            this.blueprint.scaleCorrectReverse(y - centerY),
            smooth
        )
    }

    centerContentInViewport(smooth = true) {
        let avgX = 0
        let avgY = 0
        const nodes = this.blueprint.getNodes()
        for (const node of nodes) {
            avgX += node.leftBoundary() + node.rightBoundary()
            avgY += node.topBoundary() + node.bottomBoundary()
        }
        avgX = nodes.length > 0 ? Math.round(avgX / (2 * nodes.length)) : 0
        avgY = nodes.length > 0 ? Math.round(avgY / (2 * nodes.length)) : 0
        this.centerViewport(avgX, avgY, smooth)
    }
}
