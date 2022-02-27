import LinkMessageTemplate from "../template/LinkMessageTemplate";
import GraphElement from "./GraphElement";

/**
 * @typedef {import("./GraphPin").default} GraphPin
 * @typedef {import("./GraphLink").default} GraphLink
 * @typedef {(sourcePin: GraphPin, sourcePin: GraphPin) => String} LinkRetrieval
 */
export default class GraphLinkMessage extends GraphElement {

    static tagName = "ueb-link-message"
    static CONVERT_TYPE = _ => new GraphLinkMessage(
        "ueb-icon-conver-type",
        /** @type {LinkRetrieval} */
        (s, d) => `Convert ${s.getType()} to ${d.getType()}.`
    )
    static DIRECTIONS_INCOMPATIBLE = _ => new GraphLinkMessage(
        "ueb-icon-directions-incompatible",
        /** @type {LinkRetrieval} */
        (s, d) => "Directions are not compatbile."
    )
    static PLACE_NODE = _ => new GraphLinkMessage(
        "ueb-icon-place-node",
        /** @type {LinkRetrieval} */
        (s, d) => "Place a new node."
    )
    static REPLACE_LiNK = _ => new GraphLinkMessage(
        "ueb-icon-replace-link",
        /** @type {LinkRetrieval} */
        (s, d) => "Replace existing input connections."
    )
    static SAME_NODE = _ => new GraphLinkMessage(
        "ueb-icon-same-node",
        /** @type {LinkRetrieval} */
        (s, d) => "Both are on the same node."
    )
    static TYPES_INCOMPATIBLE = _ => new GraphLinkMessage(
        "ueb-icon-types-incompatible",
        /** @type {LinkRetrieval} */
        (s, d) => `${s.getType()} is not compatible with ${d.getType()}.`
    )

    /** @type {String} */
    icon
    /** @type {String} */
    message
    /** @type {GraphLink} */
    linkElement

    constructor(icon, message) {
        super({}, new LinkMessageTemplate())
        this.icon = icon
        this.message = message
    }

}

customElements.define(GraphLinkMessage.tagName, GraphLinkMessage)
