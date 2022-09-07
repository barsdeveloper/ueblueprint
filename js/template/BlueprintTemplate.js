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
import Zoom from "../input/mouse/Zoom"

/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 */

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
        "--ueb-pin-bool-color": `${Configuration.pinColor["bool"]}`,
        "--ueb-pin-default-color": `${Configuration.pinColor["default"]}`,
        "--ueb-pin-exec-color": `${Configuration.pinColor["exec"]}`,
        "--ueb-pin-name-color": `${Configuration.pinColor["name"]}`,
        "--ueb-pin-real-color": `${Configuration.pinColor["real"]}`,
        "--ueb-pin-string-color": `${Configuration.pinColor["string"]}`,
        "--ueb-pin-linear-color": `${Configuration.pinColor["/Script/CoreUObject.LinearColor"]}`,
    }

    /**
    * @param {Blueprint} blueprint
    */
    constructed(blueprint) {
        blueprint.style.cssText = Object.entries(BlueprintTemplate.styleVariables).map(([k, v]) => `${k}:${v};`).join("")
    }

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
                    --ueb-additional-x: ${element};
                    --ueb-additional-y: ${element.translateY};
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
     * @param {Blueprint} blueprint
     * @param {Map} changedProperties
     */
    firstUpdated(blueprint, changedProperties) {
        super.firstUpdated(blueprint, changedProperties)
        blueprint.headerElement = /** @type {HTMLElement} */(blueprint.querySelector('.ueb-viewport-header'))
        blueprint.overlayElement = /** @type {HTMLElement} */(blueprint.querySelector('.ueb-viewport-overlay'))
        blueprint.viewportElement = /** @type {HTMLElement} */(blueprint.querySelector('.ueb-viewport-body'))
        blueprint.selectorElement = new SelectorElement()
        blueprint.querySelector(".ueb-grid-content")?.append(blueprint.selectorElement)
        blueprint.gridElement = /** @type {HTMLElement} */(blueprint.viewportElement.querySelector(".ueb-grid"))
        blueprint.linksContainerElement = /** @type {HTMLElement} */(blueprint.querySelector("[data-links]"))
        blueprint.linksContainerElement.append(...blueprint.getLinks())
        blueprint.nodesContainerElement = /** @type {HTMLElement} */(blueprint.querySelector("[data-nodes]"))
        blueprint.nodesContainerElement.append(...blueprint.getNodes())
        blueprint.viewportElement.scroll(Configuration.expandGridSize, Configuration.expandGridSize)
    }


    /**
     * @param {Blueprint} blueprint
     * @param {Map} changedProperties
     */
    updated(blueprint, changedProperties) {
        super.updated(blueprint, changedProperties)
        if (changedProperties.has("scrollX") || changedProperties.has("scrollY")) {
            blueprint.viewportElement.scroll(blueprint.scrollX, blueprint.scrollY)
        }
    }

    /**
     * @param {Blueprint} blueprint
     * @param {PinReferenceEntity} pinReference
     */
    getPin(blueprint, pinReference) {
        return /** @type {PinElement} */(blueprint.querySelector(
            `ueb-node[data-name="${pinReference.objectName}"] ueb-pin[data-id="${pinReference.pinGuid}"]`
        ))
    }
}
