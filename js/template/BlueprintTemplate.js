import Blueprint from "../Blueprint"
import html from "./html"
import sanitizeText from "./sanitizeText"
import Template from "./Template"
import GraphSelector from "../graph/GraphSelector"

/** @typedef {import("../Blueprint").default} Blueprint */
export default class BlueprintTemplate extends Template {
    header(element) {
        return html`
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">1:1</div>
            </div>
        `
    }

    overlay() {
        return html`
            <div class="ueb-viewport-overlay"></div>
        `
    }

    /**
     * 
     * @param {Blueprint} element 
     * @returns 
     */
    viewport(element) {
        return html`
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="
                        --ueb-additional-x:${sanitizeText(element.additional[0])};
                        --ueb-additional-y:${sanitizeText(element.additional[1])};
                        --ueb-translate-x:${sanitizeText(element.translateValue[0])};
                        --ueb-translate-y:${sanitizeText(element.translateValue[1])};
                    ">
                    <div class="ueb-grid-content" data-nodes></div>
                </div>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {HTMLElement} element Target element 
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
     * @param {Blueprint} brueprint The blueprint element
     */
    apply(blueprint) {
        super.apply(blueprint)
        blueprint.classList.add("ueb", `ueb-zoom-${blueprint.zoom}`)
        blueprint.headerElement = blueprint.querySelector('.ueb-viewport-header')
        blueprint.overlayElement = blueprint.querySelector('.ueb-viewport-overlay')
        blueprint.viewportElement = blueprint.querySelector('.ueb-viewport-body')
        blueprint.gridElement = blueprint.viewportElement.querySelector(".ueb-grid")
        blueprint.nodesContainerElement = blueprint.querySelector("[data-nodes]")
        blueprint.selectorElement = new GraphSelector()
        blueprint.nodesContainerElement.append(blueprint.selectorElement, ...blueprint.nodes)
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} brueprint The blueprint element
     */
    applyZoom(blueprint, newZoom) {
        blueprint.classList.remove(`ueb-zoom-${blueprint.zoom}`)
        blueprint.classList.add(`ueb-zoom-${newZoom}`)
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} brueprint The blueprint element
     */
    applyExpand(blueprint) {
        blueprint.gridElement.style.setProperty("--ueb-additional-x", blueprint.additional[0])
        blueprint.gridElement.style.setProperty("--ueb-additional-y", blueprint.additional[1])
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} brueprint The blueprint element
     */
    applyTranlate(blueprint) {
        blueprint.gridElement.style.setProperty("--ueb-translate-x", blueprint.translateValue[0])
        blueprint.gridElement.style.setProperty("--ueb-translate-y", blueprint.translateValue[1])
    }
}
