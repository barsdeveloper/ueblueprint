import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import nodeTemplateClass from "../decoding/nodeTemplate.js"
import nodeTitle from "../decoding/nodeTitle.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import SymbolEntity from "../entity/SymbolEntity.js"
import SerializerFactory from "../serialization/SerializerFactory.js"
import NodeTemplate from "../template/node/NodeTemplate.js"
import ISelectableDraggableElement from "./ISelectableDraggableElement.js"

/** @extends {ISelectableDraggableElement<ObjectEntity, NodeTemplate>} */
export default class NodeElement extends ISelectableDraggableElement {

    static properties = {
        ...ISelectableDraggableElement.properties,
        typePath: {
            type: String,
            attribute: "data-type",
            reflect: true,
        },
        nodeTitle: {
            type: String,
            attribute: "data-title",
            reflect: true,
        },
        advancedPinDisplay: {
            type: String,
            attribute: "data-advanced-display",
            converter: SymbolEntity.attributeConverter,
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
        },
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

    /** @type {PinElement[]} */
    #pins = []
    /** @type {NodeElement[]} */
    boundComments = []
    #commentDragged = false
    /** @param {UEBDragEvent} e */
    #commentDragHandler = e => {
        // If selected, it will already drag, also must check if under nested comments, it must drag just once
        if (!this.selected && !this.#commentDragged) {
            this.#commentDragged = true
            this.requestUpdate()
            this.updateComplete.then(() => this.#commentDragged = false)
            this.addLocation(...e.detail.value)
        }
    }

    /** @param {String} str */
    static fromSerializedObject(str) {
        str = str.trim()
        let entity = SerializerFactory.getSerializer(ObjectEntity).read(str)
        return NodeElement.newObject(/** @type {ObjectEntity} */(entity))
    }

    /**
     * @param {ObjectEntity} entity
     * @param {NodeTemplate} template
     */
    static newObject(entity = new ObjectEntity(), template = new (nodeTemplateClass(entity))()) {
        const result = new NodeElement()
        result.initialize(entity, template)
        return result
    }

    #redirectLinksAfterRename(name) {
        for (let sourcePinElement of this.getPinElements()) {
            for (let targetPinReference of sourcePinElement.getLinks()) {
                this.blueprint.getPin(targetPinReference).redirectLink(sourcePinElement, new PinReferenceEntity({
                    objectName: name,
                    pinGuid: sourcePinElement.entity.PinId,
                }))
            }
        }
    }

    initialize(entity = new ObjectEntity(), template = new (nodeTemplateClass(entity))()) {
        this.typePath = entity.getType()
        this.nodeTitle = entity.getObjectName()
        this.advancedPinDisplay = entity.AdvancedPinDisplay?.toString()
        this.enabledState = entity.EnabledState
        this.nodeDisplayName = nodeTitle(entity)
        this.pureFunction = entity.bIsPureFunc
        this.dragLinkObjects = []
        super.initialize(entity, template)
        this.#pins = this.template.createPinElements()
        super.setLocation(this.entity.getNodePosX(), this.entity.getNodePosY())
        if (this.entity.NodeWidth && this.entity.NodeHeight) {
            this.sizeX = this.entity.NodeWidth.value
            this.sizeY = this.entity.NodeHeight.value
        } else {
            this.updateComplete.then(() => this.computeSizes())
        }
        entity.listenAttribute("Name", name => {
            this.nodeTitle = entity.Name
            this.nodeDisplayName = nodeTitle(entity)
            this.#redirectLinksAfterRename(name)
        })
    }

    async getUpdateComplete() {
        let result = await super.getUpdateComplete()
        for (const pin of this.getPinElements()) {
            result &&= await pin.updateComplete
        }
        return result
    }

    /** @param {NodeElement} commentNode */
    bindToComment(commentNode) {
        if (commentNode != this && !this.boundComments.includes(commentNode)) {
            commentNode.addEventListener(Configuration.nodeDragEventName, this.#commentDragHandler)
            this.boundComments.push(commentNode)
        }
    }

    /** @param {NodeElement} commentNode */
    unbindFromComment(commentNode) {
        const commentIndex = this.boundComments.indexOf(commentNode)
        if (commentIndex >= 0) {
            commentNode.removeEventListener(Configuration.nodeDragEventName, this.#commentDragHandler)
            this.boundComments[commentIndex] = this.boundComments[this.boundComments.length - 1]
            this.boundComments.pop()
        }
    }

    /** @param {NodeElement} commentNode */
    isInsideComment(commentNode) {
        return this.topBoundary() >= commentNode.topBoundary()
            && this.rightBoundary() <= commentNode.rightBoundary()
            && this.bottomBoundary() <= commentNode.bottomBoundary()
            && this.leftBoundary() >= commentNode.leftBoundary()
    }

    getType() {
        return this.entity.getType()
    }

    getNodeName() {
        return this.entity.getObjectName()
    }

    computeNodeDisplayName() {
        this.nodeDisplayName = nodeTitle(this.entity)
    }

    /** @param {Number} value */
    setNodeWidth(value) {
        this.entity.setNodeWidth(value)
        this.sizeX = value
        this.acknowledgeReflow()
    }

    /** @param {Number} value */
    setNodeHeight(value) {
        this.entity.setNodeHeight(value)
        this.sizeY = value
        this.acknowledgeReflow()
    }

    /** @param  {IElement[]} nodesWhitelist */
    sanitizeLinks(nodesWhitelist = []) {
        this.getPinElements().forEach(pin => pin.sanitizeLinks(nodesWhitelist))
    }

    getPinElements() {
        return this.#pins
    }

    /** @returns {PinEntity[]} */
    getPinEntities() {
        return this.entity.getPinEntities()
    }

    setLocation(x = 0, y = 0, acknowledge = true) {
        this.entity.setNodePosX(x)
        this.entity.setNodePosY(y)
        super.setLocation(x, y, acknowledge)
    }

    acknowledgeReflow() {
        this.requestUpdate()
        this.updateComplete.then(() => this.computeSizes())
        let reflowEvent = new CustomEvent(Configuration.nodeReflowEventName)
        this.dispatchEvent(reflowEvent)
    }

    setShowAdvancedPinDisplay(value) {
        this.entity.AdvancedPinDisplay = new SymbolEntity(value ? "Shown" : "Hidden")
        this.advancedPinDisplay = this.entity.AdvancedPinDisplay
    }

    toggleShowAdvancedPinDisplay() {
        this.setShowAdvancedPinDisplay(this.entity.AdvancedPinDisplay?.toString() != "Shown")
    }
}
