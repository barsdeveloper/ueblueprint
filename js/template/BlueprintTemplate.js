// @ts-check

import { css, html } from "lit"
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
import Zoom from "../input/mouse/Zoom"

/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 */

export default class BlueprintTemplate extends ITemplate {

    static styles = css`
        :host {
            --ueb-font-size: ${Configuration.fontSize};
            --ueb-grid-size: ${Configuration.gridSize}px;
            --ueb-grid-expand: ${Configuration.expandGridSize}px;
            --ueb-grid-line-width: ${Configuration.gridLineWidth}px;
            --ueb-grid-line-color: ${Configuration.gridLineColor};
            --ueb-grid-set: ${Configuration.gridSet};
            --ueb-grid-set-line-color: ${Configuration.gridSetLineColor};
            --ueb-grid-axis-line-color: ${Configuration.gridAxisLineColor};
            --ueb-node-radius: ${Configuration.nodeRadius}px;
            --ueb-link-min-width: ${Configuration.linkMinWidth};
        }
    `

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
     * Computes the html content of the target element.
     * @param {Blueprint} element Target element
     * @returns The computed html
     */
    render(element) {
        return html`
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">1:1</div>
            </div>
            <div class="ueb-viewport-overlay"></div>
            <div class="ueb-viewport-body">
                <div class="ueb-grid" style="
                    --ueb-translate-x: ${element.translateX};
                    --ueb-translate-y: ${element.translateY};
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
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    setup(blueprint) {
        super.setup(blueprint)
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
        blueprint.viewportElement.scroll(Configuration.expandGridSize, Configuration.expandGridSize)
    }


    /**
     * @param {Blueprint} blueprint
     * @param {Map} changedProperties
     */
    updated(blueprint, changedProperties) {
        super.updated(blueprint, changedProperties)
        if (changedProperties.has(scrollX) || changedProperties.has(scrollY)) {
            blueprint.viewportElement.scroll(blueprint.scrollX, blueprint.scrollY)
        }
    }

    /**
     * @param {Blueprint} blueprint
     * @param {PinReferenceEntity} pinReference
     * @returns {PinElement}
     */
    getPin(blueprint, pinReference) {
        return blueprint.querySelector(
            `.ueb-node[data-name="${pinReference.objectName}"] .ueb-pin[data-id="${pinReference.pinGuid}"]`
        )
    }
}
