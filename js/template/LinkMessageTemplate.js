import GraphLink from "../graph/GraphLink"
import html from "./html"
import Template from "./Template"

/**
 * @typedef {import("../graph/GraphLinkMessage").default} GraphLinkMessage
 */
export default class LinkMessageTemplate extends Template {

    /**
     * Computes the html content of the target element.
     * @param {GraphLinkMessage} linkMessage attached to link destination
     * @returns The result html 
     */
    render(linkMessage) {
        return html`
            <span class="${linkMessage.icon}"></span>
            <span class="ueb-link-message"></span>
        `
    }

    /**
     * Applies the style to the element.
     * @param {GraphLinkMessage} linkMessage element
     */
    apply(linkMessage) {
        super.apply(linkMessage)
        linkMessage.linkElement = linkMessage.closest(GraphLink.tagName)
        linkMessage.querySelector(".ueb-link-message").innerText = linkMessage.message(
            linkMessage.linkElement.getSourcePin(),
            linkMessage.linkElement.getDestinationPin()
        )
    }

}