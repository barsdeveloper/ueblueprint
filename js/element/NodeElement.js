import Configuration from "../Configuration"
import IdentifierEntity from "../entity/IdentifierEntity"
import ISelectableDraggableElement from "./ISelectableDraggableElement"
import NodeTemplate from "../template/NodeTemplate"
import ObjectEntity from "../entity/ObjectEntity"
import PinElement from "./PinElement"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import SerializerFactory from "../serialization/SerializerFactory"
import Utility from "../Utility"

/** @typedef {import("./IElement").default} IElement */

/** @extends {ISelectableDraggableElement<ObjectEntity, NodeTemplate>} */
export default class NodeElement extends ISelectableDraggableElement {

    static properties = {
        ...ISelectableDraggableElement.properties,
        name: {
            type: String,
            attribute: "data-name",
            reflect: true,
        },
        advancedPinDisplay: {
            type: String,
            attribute: "data-advanced-display",
            converter: IdentifierEntity.attributeConverter,
            reflect: true,
        },
        enabledState: {
            type: String,
            attribute: "data-enabled-state",
            reflect: true,
        },
        nodeDisplayName: {
            type: String,
            attribute: false,
        },
        pureFunction: {
            type: Boolean,
            converter: Utility.booleanConverter,
            attribute: "data-pure-function",
            reflect: true,
        }
    }
    static dragEventName = Configuration.nodeDragEventName
    static dragGeneralEventName = Configuration.nodeDragGeneralEventName

    get blueprint() {
        return super.blueprint
    }
    set blueprint(v) {
        super.blueprint = v
        this.#pins.forEach(p => p.blueprint = v)
    }

    /** @type {HTMLElement} */
    #nodeNameElement
    get nodeNameElement() {
        return this.#nodeNameElement
    }
    set nodeNameElement(value) {
        this.#nodeNameElement = value
    }

    #pins

    /** @param {ObjectEntity} entity */
    constructor(entity) {
        super(entity, new NodeTemplate())
        this.#pins = this.getPinEntities().filter(v => !v.isHidden()).map(v => new PinElement(v))
        this.#pins.forEach(pin => pin.nodeElement = this)
        this.name = entity.getObjectName()
        this.advancedPinDisplay = entity.AdvancedPinDisplay?.toString()
        this.enabledState = entity.EnabledState
        this.nodeDisplayName = entity.getDisplayName()
        this.pureFunction = entity.bIsPureFunc
        this.dragLinkObjects = []
        super.setLocation([this.entity.NodePosX.value, this.entity.NodePosY.value])
        this.entity.subscribe("AdvancedPinDisplay", value => this.advancedPinDisplay = value)
        this.entity.subscribe("Name", value => this.name = value)
    }

    /** @param {String} str */
    static fromSerializedObject(str) {
        str = str.trim()
        let entity = SerializerFactory.getSerializer(ObjectEntity).deserialize(str)
        // @ts-expect-error
        return new NodeElement(entity)
    }

    connectedCallback() {
        const type = this.getAttribute("type")?.trim()
        super.connectedCallback()
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.dispatchDeleteEvent()
    }

    getNodeName() {
        return this.entity.getObjectName()
    }

    getNodeDisplayName() {
        return this.entity.getDisplayName()
    }

    /** @param  {IElement[]} nodesWhitelist */
    sanitizeLinks(nodesWhitelist = []) {
        this.getPinElements().forEach(pin => pin.sanitizeLinks(nodesWhitelist))
    }

    /** @param {String} name */
    rename(name) {
        if (this.entity.Name == name) {
            return false
        }
        for (let sourcePinElement of this.getPinElements()) {
            for (let targetPinReference of sourcePinElement.getLinks()) {
                this.blueprint.getPin(targetPinReference).redirectLink(sourcePinElement, new PinReferenceEntity({
                    objectName: name,
                    pinGuid: sourcePinElement.entity.PinId,
                }))
            }
        }
        this.entity.Name = name
    }

    getPinElements() {
        return this.#pins
    }

    /** @returns {PinEntity[]} */
    getPinEntities() {
        return this.entity.CustomProperties.filter(v => v instanceof PinEntity)
    }

    setLocation(value = [0, 0]) {
        let nodeType = this.entity.NodePosX.constructor
        // @ts-expect-error
        this.entity.NodePosX = new nodeType(value[0])
        // @ts-expect-error
        this.entity.NodePosY = new nodeType(value[1])
        super.setLocation(value)
    }

    dispatchDeleteEvent() {
        let deleteEvent = new CustomEvent(Configuration.nodeDeleteEventName)
        this.dispatchEvent(deleteEvent)
    }

    dispatchReflowEvent() {
        let reflowEvent = new CustomEvent(Configuration.nodeReflowEventName)
        this.dispatchEvent(reflowEvent)
    }

    setShowAdvancedPinDisplay(value) {
        this.entity.AdvancedPinDisplay = new IdentifierEntity(value ? "Shown" : "Hidden")
    }

    toggleShowAdvancedPinDisplay() {
        this.setShowAdvancedPinDisplay(this.entity.AdvancedPinDisplay?.toString() != "Shown")
    }
}

customElements.define("ueb-node", NodeElement)
