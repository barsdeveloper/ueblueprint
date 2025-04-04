import { html } from "lit"
import Configuration from "../Configuration.js"
import Shortcuts from "../Shortcuts.js"
import Utility from "../Utility.js"
import Copy from "../input/common/Copy.js"
import Cut from "../input/common/Cut.js"
import Paste from "../input/common/Paste.js"
import KeyboardEnableZoom from "../input/keyboard/KeyboardEnableZoom.js"
import KeyboardShortcut from "../input/keyboard/KeyboardShortcut.js"
import MouseScrollGraph from "../input/mouse/MouseScrollGraph.js"
import MouseTracking from "../input/mouse/MouseTracking.js"
import Select from "../input/mouse/Select.js"
import Unfocus from "../input/mouse/Unfocus.js"
import Zoom from "../input/mouse/Zoom.js"
import ITemplate from "./ITemplate.js"

/** @extends ITemplate<Blueprint> */
export default class BlueprintTemplate extends ITemplate {

    static styleVariables = {
        "--ueb-font-size": `${Configuration.fontSize}`,
        "--ueb-grid-expand": `${Configuration.expandGridSize}px`,
        "--ueb-grid-line-width": `${Configuration.gridLineWidth}px`,
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

    /** @type {Copy} */
    #copyInputObject

    /** @type {Paste} */
    #pasteInputObject

    /** @type {Zoom} */
    #zoomInputObject

    /** @type {HTMLElement} */ headerElement
    /** @type {HTMLElement} */ overlayElement
    /** @type {HTMLElement} */ viewportElement
    /** @type {SelectorElement} */ selectorElement
    /** @type {HTMLElement} */ gridElement
    /** @type {HTMLElement} */ linksContainerElement
    /** @type {HTMLElement} */ nodesContainerElement
    viewportSize = [0, 0]
    #removeZoomChanged = () => this.headerElement.classList.remove("ueb-zoom-changed")

    /** @param {Blueprint} element */
    initialize(element) {
        super.initialize(element)
        this.element.style.cssText = Object.entries(BlueprintTemplate.styleVariables)
            .map(([k, v]) => `${k}:${v};`).join("")
        const htmlTemplate =  /** @type {HTMLTemplateElement} */(
            this.element.querySelector(":scope > template")
        )?.content.textContent
        if (htmlTemplate) {
            this.element.requestUpdate()
            this.element.updateComplete.then(() => {
                this.blueprint.mousePosition = [
                    Math.round(this.viewportSize[0] / 2),
                    Math.round(this.viewportSize[1] / 2),
                ]
                this.getPasteInputObject().pasted(htmlTemplate)
                this.blueprint.unselectAll()
            })
        }
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
        const gridElement = this.element.getGridDOMElement()
        this.#copyInputObject = new Copy(gridElement, this.blueprint)
        this.#pasteInputObject = new Paste(gridElement, this.blueprint)
        this.#zoomInputObject = new Zoom(gridElement, this.blueprint)
        return [
            ...super.createInputObjects(),
            this.#copyInputObject,
            this.#pasteInputObject,
            this.#zoomInputObject,
            new Cut(gridElement, this.blueprint),
            new KeyboardShortcut(gridElement, this.blueprint, {
                activationKeys: Shortcuts.duplicateNodes
            }, () =>
                this.blueprint.template.getPasteInputObject().pasted(
                    this.blueprint.template.getCopyInputObject().copied()
                )
            ),
            new KeyboardShortcut(gridElement, this.blueprint, {
                activationKeys: Shortcuts.deleteNodes
            }, () => this.blueprint.removeGraphElement(...this.blueprint.getNodes(true))),
            new KeyboardShortcut(gridElement, this.blueprint, {
                activationKeys: Shortcuts.selectAllNodes
            }, () => this.blueprint.selectAll()),
            new Select(gridElement, this.blueprint, {
                clickButton: Configuration.mouseClickButton,
                exitAnyButton: true,
                moveEverywhere: true,
            }),
            new MouseScrollGraph(gridElement, this.blueprint, {
                clickButton: Configuration.mouseRightClickButton,
                exitAnyButton: false,
                moveEverywhere: true,
            }),
            new Unfocus(gridElement, this.blueprint),
            new MouseTracking(gridElement, this.blueprint),
            new KeyboardEnableZoom(gridElement, this.blueprint),
        ]
    }

    render() {
        return html`
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-about">
                    <a @click="${e => e.target.closest("ueb-blueprint").querySelector(".ueb-info-dialog").showModal()}">
                        ⓘ
                    </a>
                </div>
                <div class="ueb-viewport-zoom">
                    Zoom ${this.blueprint.zoom == 0 ? "1:1" : (this.blueprint.zoom > 0 ? "+" : "") + this.blueprint.zoom}
                </div>
            </div>
            <div class="ueb-viewport-type">${this.blueprint.blueprintType}</div>
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
            <dialog class="ueb-info-dialog" @click="${e => e.target.closest(".ueb-info-dialog").close()}">
                <h2>UEBlueprint</h2>
                <p>A stand alone implementation of the UE's Blueprint visual language editor.</p>
                <p>
                    Version: ${Configuration.VERSION}<br />
                    Author: barsdeveloper<br />
                    License: MIT<br />

                    <a target="_blank" href="https://github.com/barsdeveloper/ueblueprint">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#e3b341" style="vertical-align: bottom">
                            <path d="M 12 0.587 L 16 8 L 24 9 L 18 15 L 20 24 L 12 19 L 4 24 L 6 15 L 0 9 L 8 8 Z M 0 0"></path>
                        </svg>
                        https://github.com/barsdeveloper/ueblueprint
                    </a>
                </p>
            </dialog>
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
            if (this.headerElement.classList.contains("ueb-zoom-changed")) {
                this.headerElement.classList.remove("ueb-zoom-changed")
                void this.headerElement.offsetWidth // To trigger the reflow
            }
            this.headerElement.classList.add("ueb-zoom-changed")
            this.headerElement.addEventListener("animationend", this.#removeZoomChanged, { once: true })
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
            + `, ueb-node[data-type="${Configuration.paths.materialGraphNodeComment}"]${justSelected ? '[data-selected="true"]' : ''}`
        )
    }

    /** @param {PinReferenceEntity} pinReference */
    getPin(pinReference) {
        return /** @type {PinElement} */(this.blueprint.querySelector(
            `ueb-node[data-title="${pinReference.objectName}"] ueb-pin[data-id="${pinReference.pinGuid}"]`
        ))
    }

    getCopyInputObject() {
        return this.#copyInputObject
    }

    getPasteInputObject() {
        return this.#pasteInputObject
    }

    getZoomInputObject() {
        return this.#zoomInputObject
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
        let minX = Number.MAX_SAFE_INTEGER
        let maxX = Number.MIN_SAFE_INTEGER
        let minY = Number.MAX_SAFE_INTEGER
        let maxY = Number.MIN_SAFE_INTEGER
        const nodes = this.blueprint.getNodes()
        for (const node of nodes) {
            avgX += node.leftBoundary() + node.rightBoundary()
            avgY += node.topBoundary() + node.bottomBoundary()
            minX = Math.min(minX, node.leftBoundary())
            maxX = Math.max(maxX, node.rightBoundary())
            minY = Math.min(minY, node.topBoundary())
            maxY = Math.max(maxY, node.bottomBoundary())
        }
        avgX = Math.round(maxX - minX <= this.viewportSize[0]
            ? (maxX + minX) / 2
            : avgX / (2 * nodes.length)
        )
        avgY = Math.round(maxY - minY <= this.viewportSize[1]
            ? (maxY + minY) / 2
            : avgY / (2 * nodes.length)
        )
        this.centerViewport(avgX, avgY, smooth)
    }
}
