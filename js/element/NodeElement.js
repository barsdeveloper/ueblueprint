import Configuration from "../Configuration.js"
import nodeTemplateClass from "../decoding/nodeTemplate.js"
import nodeTitle from "../decoding/nodeTitle.js"
import BooleanEntity from "../entity/BooleanEntity.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import SymbolEntity from "../entity/SymbolEntity.js"
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
            converter: BooleanEntity.booleanConverter,
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
        let entity = ObjectEntity.grammar.parse(str)
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

    /** @param {String} name */
    #redirectLinksBeforeRename(name) {
        for (let originPinElement of this.getPinElements()) {
            for (let targetPinReference of originPinElement.getLinks()) {
                this.blueprint.getPin(targetPinReference).redirectLink(
                    originPinElement,
                    new PinReferenceEntity(
                        new SymbolEntity(name),
                        originPinElement.entity.PinId,
                    )
                )
            }
        }
    }

    initialize(entity = new ObjectEntity(), template = new (nodeTemplateClass(entity))()) {
        this.typePath = entity.getType()
        this.nodeTitle = entity.getObjectName()
        this.advancedPinDisplay = entity.AdvancedPinDisplay?.toString()
        this.enabledState = entity.EnabledState
        this.nodeDisplayName = nodeTitle(entity)
        this.pureFunction = entity.bIsPureFunc?.valueOf()
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
        entity.listenAttribute(
            "Name",
            /** @param {InstanceType<typeof ObjectEntity.attributes.Name>} newName */
            newName => {
                this.#redirectLinksBeforeRename(newName?.toString())
                this.nodeTitle = newName?.toString()
                this.nodeDisplayName = nodeTitle(entity)
                this.acknowledgeUpdate()
            }
        )
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
        this.acknowledgeUpdate(true)
    }

    /** @param {Number} value */
    setNodeHeight(value) {
        this.entity.setNodeHeight(value)
        this.sizeY = value
        this.acknowledgeUpdate(true)
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

    acknowledgeUpdate(resize = false) {
        const event = new CustomEvent(Configuration.nodeUpdateEventName)
        if (resize) {
            this.requestUpdate()
            this.updateComplete.then(() => this.computeSizes())
        }
        this.dispatchEvent(event)
    }

    setShowAdvancedPinDisplay(value) {
        this.entity.AdvancedPinDisplay = new SymbolEntity(value ? "Shown" : "Hidden")
        this.advancedPinDisplay = this.entity.AdvancedPinDisplay
    }

    toggleShowAdvancedPinDisplay() {
        this.setShowAdvancedPinDisplay(this.entity.AdvancedPinDisplay?.toString() != "Shown")
    }
}
