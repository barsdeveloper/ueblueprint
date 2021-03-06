// @ts-check

import Configuration from "../Configuration"
import Copy from "../input/common/Copy"
import html from "./html"
import ITemplate from "./ITemplate"
import KeyboardCanc from "../input/keybaord/KeyboardCanc"
import KeyboardEnableZoom from "../input/keybaord/KeyboardEnableZoom"
import KeyboardSelectAll from "../input/keybaord/KeyboardSelectAll"
import MouseScrollGraph from "../input/mouse/MouseScrollGraph"
import MouseTracking from "../input/mouse/MouseTracking"
import Paste from "../input/common/Paste"
import sanitizeText from "./sanitizeText"
import Select from "../input/mouse/Select"
import SelectorElement from "../element/SelectorElement"
import Unfocus from "../input/mouse/Unfocus"
import Zoom from "../input/mouse/Zoom"

/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 */

export default class BlueprintTemplate extends ITemplate {

    /**
     * @param {Blueprint} blueprint
     */
    createInputObjects(blueprint) {
        return [
            new Copy(blueprint.getGridDOMElement(), blueprint),
            new Paste(blueprint.getGridDOMElement(), blueprint),
            new KeyboardCanc(blueprint.getGridDOMElement(), blueprint),
            new KeyboardSelectAll(blueprint.getGridDOMElement(), blueprint),
            new Zoom(blueprint.getGridDOMElement(), blueprint, {
                looseTarget: true,
            }),
            new Select(blueprint.getGridDOMElement(), blueprint, {
                clickButton: 0,
                exitAnyButton: true,
                looseTarget: true,
                moveEverywhere: true,
            }),
            new MouseScrollGraph(blueprint.getGridDOMElement(), blueprint, {
                clickButton: 2,
                exitAnyButton: false,
                looseTarget: true,
                moveEverywhere: true,
            }),
            new Unfocus(blueprint.getGridDOMElement(), blueprint),
            new MouseTracking(blueprint.getGridDOMElement(), blueprint),
            new KeyboardEnableZoom(blueprint.getGridDOMElement(), blueprint),
        ]
    }

    /**
     * @param {Blueprint} element
     */
    header(element) {
        return html`
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">1:1</div>
            </div>
        `
    }

    /**
     * @param {Blueprint} element
     */
    overlay(element) {
        return html`
            <div class="ueb-viewport-overlay"></div>
        `
    }

    /**
     * @param {Blueprint} element
     */
    viewport(element) {
        return html`
            <div class="ueb-viewport-body">
                <div class="ueb-grid" style="
                    --ueb-additional-x:${sanitizeText(element.additional[0])};
                    --ueb-additional-y:${sanitizeText(element.additional[1])};
                    --ueb-translate-x:${sanitizeText(element.translateValue[0])};
                    --ueb-translate-y:${sanitizeText(element.translateValue[1])};
                ">
                    <div class="ueb-grid-content">
                        <div data-links></div>
                        <div data-nodes></div>
                    </div>
                </div>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {Blueprint} element Target element
     * @returns The computed html
     */
    render(element) {
        return html`
            ${this.header(element)}
            ${this.overlay(element)}
            ${this.viewport(element)}
        `
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    setup(blueprint) {
        super.setup(blueprint)
        blueprint.classList.add("ueb", `ueb-zoom-${blueprint.zoom}`)
        Object.entries({
            "--ueb-font-size": sanitizeText(Configuration.fontSize),
            "--ueb-grid-size": `${sanitizeText(Configuration.gridSize)}px`,
            "--ueb-grid-line-width": `${sanitizeText(Configuration.gridLineWidth)}px`,
            "--ueb-grid-line-color": sanitizeText(Configuration.gridLineColor),
            "--ueb-grid-set": sanitizeText(Configuration.gridSet),
            "--ueb-grid-set-line-color": sanitizeText(Configuration.gridSetLineColor),
            "--ueb-grid-axis-line-color": sanitizeText(Configuration.gridAxisLineColor),
            "--ueb-node-radius": `${sanitizeText(Configuration.nodeRadius)}px`,
            "--ueb-link-min-width": sanitizeText(Configuration.linkMinWidth)
        }).forEach(entry => blueprint.style.setProperty(entry[0], entry[1]))
        blueprint.headerElement = blueprint.querySelector('.ueb-viewport-header')
        blueprint.overlayElement = blueprint.querySelector('.ueb-viewport-overlay')
        blueprint.viewportElement = blueprint.querySelector('.ueb-viewport-body')
        blueprint.selectorElement = new SelectorElement()
        blueprint.gridElement = blueprint.viewportElement.querySelector(".ueb-grid")
        blueprint.querySelector(".ueb-grid-content").append(blueprint.selectorElement)
        blueprint.linksContainerElement = blueprint.querySelector("[data-links]")
        blueprint.linksContainerElement.append(...blueprint.getLinks())
        blueprint.nodesContainerElement = blueprint.querySelector("[data-nodes]")
        blueprint.nodesContainerElement.append(...blueprint.getNodes())
        this.applyEndDragScrolling(blueprint)
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyZoom(blueprint, newZoom) {
        blueprint.classList.remove("ueb-zoom-" + sanitizeText(blueprint.zoom))
        blueprint.classList.add("ueb-zoom-" + sanitizeText(newZoom))
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyExpand(blueprint) {
        blueprint.gridElement.style.setProperty("--ueb-additional-x", sanitizeText(blueprint.additional[0]))
        blueprint.gridElement.style.setProperty("--ueb-additional-y", sanitizeText(blueprint.additional[1]))
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyTranlate(blueprint) {
        blueprint.gridElement.style.setProperty("--ueb-translate-x", sanitizeText(blueprint.translateValue[0]))
        blueprint.gridElement.style.setProperty("--ueb-translate-y", sanitizeText(blueprint.translateValue[1]))
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyStartDragScrolling(blueprint) {
        blueprint.dataset.dragScrolling = "true"
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyEndDragScrolling(blueprint) {
        blueprint.dataset.dragScrolling = "false"
    }

    /**
     * @param {Blueprint} blueprint
     * @param {PinReferenceEntity} pinReference
     * @returns {PinElement}
     */
    getPin(blueprint, pinReference) {
        return blueprint.querySelector(
            `ueb-node[data-name="${pinReference.objectName}"] ueb-pin[data-id="${pinReference.pinGuid}"]`
        )
    }
}
