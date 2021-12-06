import html from "./html"
import Template from "./Template"

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
     * @param {import("../Blueprint").Blueprint} element 
     * @returns 
     */
    viewport(element) {
        return html`
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="--ueb-additional-x:${element.additional[0]}; --ueb-additional-y:${element.additional[1]}; --ueb-translate-x:${element.translateValue[0]}; --ueb-translate-y:${element.translateValue[1]}">
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
}
