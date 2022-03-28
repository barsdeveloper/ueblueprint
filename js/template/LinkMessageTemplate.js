// @ts-check

import html from "./html"
import ITemplate from "./ITemplate"
import LinkElement from "../element/LinkElement"
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
    apply(linkMessage) {
        const a = super.apply(linkMessage)
        const linkMessageSetup = _ => linkMessage.querySelector(".ueb-link-message").innerText = linkMessage.message(
            linkMessage.linkElement.getSourcePin(),
            linkMessage.linkElement.getDestinationPin()
        )
        linkMessage.linkElement = linkMessage.closest(LinkElement.tagName)
        if (linkMessage.linkElement) {
            linkMessageSetup()
        } else {
            window.customElements.whenDefined(linkMessage.constructor.tagName).then(linkMessage)
        }
    }

}
