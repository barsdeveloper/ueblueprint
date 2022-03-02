import IElement from "./IElement"
import LinkMessageTemplate from "../template/LinkMessageTemplate"

/**
 * @typedef {import("./PinElement").default} PinElement
 * @typedef {import("./LinkElement").default} LinkElement
 * @typedef {(sourcePin: PinElement, sourcePin: PinElement) => String} LinkRetrieval
 */
export default class LinkMessageElement extends IElement {

    static tagName = "ueb-link-message"
    static convertType = _ => new LinkMessageElement(
        "ueb-icon-conver-type",
        /** @type {LinkRetrieval} */
        (s, d) => `Convert ${s.getType()} to ${d.getType()}.`
    )
    static correct = _ => new LinkMessageElement(
        "ueb-icon-correct",
        /** @type {LinkRetrieval} */
        (s, d) => ""
    )
    static directionsIncompatible = _ => new LinkMessageElement(
        "ueb-icon-directions-incompatible",
        /** @type {LinkRetrieval} */
        (s, d) => "Directions are not compatbile."
    )
    static placeNode = _ => new LinkMessageElement(
        "ueb-icon-place-node",
        /** @type {LinkRetrieval} */
        (s, d) => "Place a new node."
    )
    static replaceLink = _ => new LinkMessageElement(
        "ueb-icon-replace-link",
        /** @type {LinkRetrieval} */
        (s, d) => "Replace existing input connections."
    )
    static sameNode = _ => new LinkMessageElement(
        "ueb-icon-same-node",
        /** @type {LinkRetrieval} */
        (s, d) => "Both are on the same node."
    )
    static typesIncompatible = _ => new LinkMessageElement(
        "ueb-icon-types-incompatible",
        /** @type {LinkRetrieval} */
        (s, d) => `${s.getType()} is not compatible with ${d.getType()}.`
    )

    /** @type {String} */
    icon
    /** @type {String} */
    message
    /** @type {LinkElement} */
    linkElement

    constructor(icon, message) {
        super({}, new LinkMessageTemplate())
        this.icon = icon
        this.message = message
    }

}

customElements.define(LinkMessageElement.tagName, LinkMessageElement)
