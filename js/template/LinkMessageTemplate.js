// @ts-check

import html from "./html"
import ITemplate from "./ITemplate"
import sanitizeText from "./sanitizeText"

/**
 * @typedef {import("../element/LinkMessageElement").default} LinkMessageElement
 */

export default class LinkMessageTemplate extends ITemplate {

    /**
     * @param {LinkMessageElement} linkMessage
     */
    render(linkMessage) {
        return html`
            <span class="${sanitizeText(linkMessage.icon)}"></span>
            <span class="ueb-link-message"></span>
        `
    }

    /**
     * Applies the style to the element.
     * @param {LinkMessageElement} linkMessage
     */
    setup(linkMessage) {
        const a = super.setup(linkMessage)
        const linkMessageSetup = _ =>
            /** @type {HTMLElement} */(linkMessage.querySelector(".ueb-link-message")).innerText = linkMessage.message(
            linkMessage.linkElement.sourcePin,
            linkMessage.linkElement.destinationPin
        )
        linkMessage.linkElement = linkMessage.closest("ueb-link")
        if (linkMessage.linkElement) {
            linkMessageSetup()
        } else {
            window.customElements.whenDefined("ueb-link-message").then(linkMessageSetup)
        }
    }

}
