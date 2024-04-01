import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import IdentifierEntity from "../entity/IdentifierEntity.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import SerializerFactory from "../serialization/SerializerFactory.js"
import CommentNodeTemplate from "../template/node/CommentNodeTemplate.js"
import EventNodeTemplate from "../template/node/EventNodeTemplate.js"
import KnotNodeTemplate from "../template/node/KnotNodeTemplate.js"
import NodeTemplate from "../template/node/NodeTemplate.js"
import VariableAccessNodeTemplate from "../template/node/VariableAccessNodeTemplate.js"
import VariableConversionNodeTemplate from "../template/node/VariableConversionNodeTemplate.js"
import VariableOperationNodeTemplate from "../template/node/VariableOperationNodeTemplate.js"
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

    /**
     * @param {ObjectEntity} nodeEntity
     * @return {new () => NodeTemplate}
     */
    static getTypeTemplate(nodeEntity) {
        if (
            nodeEntity.getClass() === Configuration.paths.callFunction
            || nodeEntity.getClass() === Configuration.paths.commutativeAssociativeBinaryOperator
            || nodeEntity.getClass() === Configuration.paths.callArrayFunction
        ) {
            const memberParent = nodeEntity.FunctionReference?.MemberParent?.path ?? ""
            const memberName = nodeEntity.FunctionReference?.MemberName
            if (
                memberName && (
                    memberParent === Configuration.paths.kismetMathLibrary
                    || memberParent === Configuration.paths.kismetArrayLibrary
                )) {
                if (memberName.startsWith("Conv_")) {
                    return VariableConversionNodeTemplate
                }
                if (
                    memberName.startsWith("And_")
                    || memberName.startsWith("Boolean") // Boolean logic operations
                    || memberName.startsWith("Cross_")
                    || memberName.startsWith("Dot_")
                    || memberName.startsWith("Not_")
                    || memberName.startsWith("Or_")
                    || memberName.startsWith("Percent_")
                    || memberName.startsWith("Xor_")
                ) {
                    return VariableOperationNodeTemplate
                }
                switch (memberName) {
                    case "Abs":
                    case "Array_Add":
                    case "Array_AddUnique":
                    case "Array_Identical":
                    case "BMax":
                    case "BMin":
                    case "CrossProduct2D":
                    case "DotProduct2D":
                    case "Exp":
                    case "FMax":
                    case "FMin":
                    case "GetPI":
                    case "Max":
                    case "MaxInt64":
                    case "Min":
                    case "MinInt64":
                    case "Sqrt":
                    case "Square":
                    case "Vector4_CrossProduct3":
                    case "Vector4_DotProduct":
                    case "Vector4_DotProduct3":
                    // Trigonometry
                    case "Acos":
                    case "Asin":
                    case "Cos":
                    case "DegAcos":
                    case "DegCos":
                    case "DegSin":
                    case "DegTan":
                    case "Sin":
                    case "Tan":
                        return VariableOperationNodeTemplate
                }
            }
            if (memberParent === Configuration.paths.blueprintSetLibrary) {
                return VariableOperationNodeTemplate
            }
            if (memberParent === Configuration.paths.blueprintMapLibrary) {
                return VariableOperationNodeTemplate
            }
        }
        switch (nodeEntity.getClass()) {
            case Configuration.paths.comment:
            case Configuration.paths.materialGraphNodeComment:
                return CommentNodeTemplate
            case Configuration.paths.createDelegate:
                return NodeTemplate
            case Configuration.paths.promotableOperator:
                return VariableOperationNodeTemplate
            case Configuration.paths.knot:
                return KnotNodeTemplate
            case Configuration.paths.literal:
            case Configuration.paths.variableGet:
            case Configuration.paths.variableSet:
                return VariableAccessNodeTemplate
        }
        if (nodeEntity.isEvent()) {
            return EventNodeTemplate
        }
        return NodeTemplate
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
    static newObject(entity = new ObjectEntity(), template = new (NodeElement.getTypeTemplate(entity))()) {
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

    initialize(entity = new ObjectEntity(), template = new (NodeElement.getTypeTemplate(entity))()) {
        this.typePath = entity.getType()
        this.nodeTitle = entity.getObjectName()
        this.advancedPinDisplay = entity.AdvancedPinDisplay?.toString()
        this.enabledState = entity.EnabledState
        this.nodeDisplayName = entity.nodeDisplayName()
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
            this.nodeDisplayName = entity.nodeDisplayName()
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
        this.nodeDisplayName = this.entity.nodeDisplayName()
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
        this.entity.AdvancedPinDisplay = new IdentifierEntity(value ? "Shown" : "Hidden")
        this.advancedPinDisplay = this.entity.AdvancedPinDisplay
    }

    toggleShowAdvancedPinDisplay() {
        this.setShowAdvancedPinDisplay(this.entity.AdvancedPinDisplay?.toString() != "Shown")
    }
}
