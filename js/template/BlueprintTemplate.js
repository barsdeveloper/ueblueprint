import { html } from "lit"
import Configuration from "../Configuration"
import Copy from "../input/common/Copy"
import ITemplate from "./ITemplate"
import KeyboardCanc from "../input/keybaord/KeyboardCanc"
import KeyboardEnableZoom from "../input/keybaord/KeyboardEnableZoom"
import KeyboardSelectAll from "../input/keybaord/KeyboardSelectAll"
import MouseScrollGraph from "../input/mouse/MouseScrollGraph"
import MouseTracking from "../input/mouse/MouseTracking"
import Paste from "../input/common/Paste"
import Select from "../input/mouse/Select"
import SelectorElement from "../element/SelectorElement"
import Unfocus from "../input/mouse/Unfocus"
import Utility from "../Utility"
import Zoom from "../input/mouse/Zoom"

/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
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

    /** @param {Blueprint} element */
    constructed(element) {
        super.constructed(element)
        this.element.style.cssText = Object.entries(BlueprintTemplate.styleVariables).map(([k, v]) => `${k}:${v};`).join("")
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new Copy(this.element.getGridDOMElement(), this.element),
            new Paste(this.element.getGridDOMElement(), this.element),
            new KeyboardCanc(this.element.getGridDOMElement(), this.element),
            new KeyboardSelectAll(this.element.getGridDOMElement(), this.element),
            new Zoom(this.element.getGridDOMElement(), this.element),
            new Select(this.element.getGridDOMElement(), this.element, {
                clickButton: 0,
                exitAnyButton: true,
                moveEverywhere: true,
            }),
            new MouseScrollGraph(this.element.getGridDOMElement(), this.element, {
                clickButton: 2,
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
                <div class="ueb-viewport-zoom">${this.element.zoom == 0 ? "1:1" : this.element.zoom}</div>
            </div>
            <div class="ueb-viewport-overlay"></div>
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="--ueb-additional-x: ${Math.round(this.element.translateX)}; --ueb-additional-y: ${Math.round(this.element.translateY)}; --ueb-translate-x: ${Math.round(this.element.translateX)}; --ueb-translate-y: ${Math.round(this.element.translateY)};">
                    <div class="ueb-grid-content">
                        <div data-links></div>
                        <div data-nodes></div>
                    </div>
                </div>
            </div>
        `
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.element.headerElement = /** @type {HTMLElement} */(this.element.querySelector('.ueb-viewport-header'))
        this.element.overlayElement = /** @type {HTMLElement} */(this.element.querySelector('.ueb-viewport-overlay'))
        this.element.viewportElement = /** @type {HTMLElement} */(this.element.querySelector('.ueb-viewport-body'))
        this.element.selectorElement = new SelectorElement()
        this.element.querySelector(".ueb-grid-content")?.append(this.element.selectorElement)
        this.element.gridElement = /** @type {HTMLElement} */(this.element.viewportElement.querySelector(".ueb-grid"))
        this.element.linksContainerElement = /** @type {HTMLElement} */(this.element.querySelector("[data-links]"))
        this.element.linksContainerElement.append(...this.element.getLinks())
        this.element.nodesContainerElement = /** @type {HTMLElement} */(this.element.querySelector("[data-nodes]"))
        this.element.nodesContainerElement.append(...this.element.getNodes())
        this.element.viewportElement.scroll(Configuration.expandGridSize, Configuration.expandGridSize)
    }


    /** @param {Map} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties)
        if (changedProperties.has("scrollX") || changedProperties.has("scrollY")) {
            this.element.viewportElement.scroll(this.element.scrollX, this.element.scrollY)
        }
        if (changedProperties.has("zoom")) {
            const previousZoom = changedProperties.get("zoom")
            const minZoom = Math.min(previousZoom, this.element.zoom)
            const maxZoom = Math.max(previousZoom, this.element.zoom)
            const classes = Utility.range(minZoom, maxZoom)
            const getClassName = v => `ueb-zoom-${v}`
            if (previousZoom < this.element.zoom) {
                this.element.classList.remove(...classes.filter(v => v < 0).map(getClassName))
                this.element.classList.add(...classes.filter(v => v > 0).map(getClassName))
            } else {
                this.element.classList.remove(...classes.filter(v => v > 0).map(getClassName))
                this.element.classList.add(...classes.filter(v => v < 0).map(getClassName))
            }
        }
    }

    /** @param {PinReferenceEntity} pinReference */
    getPin(pinReference) {
        return /** @type {PinElement} */(this.element.querySelector(
            `ueb-node[data-name="${pinReference.objectName}"] ueb-pin[data-id="${pinReference.pinGuid}"]`
        ))
    }
}
