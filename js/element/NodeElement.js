import CommentNodeTemplate from "../template/node/CommentNodeTemplate"
import Configuration from "../Configuration"
import EventNodeTemplate from "../template/node/EventNodeTemplate"
import IdentifierEntity from "../entity/IdentifierEntity"
import ISelectableDraggableElement from "./ISelectableDraggableElement"
import KnotNodeTemplate from "../template/node/KnotNodeTemplate"
import NodeTemplate from "../template/node/NodeTemplate"
import ObjectEntity from "../entity/ObjectEntity"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import SerializerFactory from "../serialization/SerializerFactory"
import Utility from "../Utility"
import VariableAccessNodeTemplate from "../template/node/VariableAccessNodeTemplate"
import VariableConversionNodeTemplate from "../template/node/VariableConversionNodeTemplate"
import VariableOperationNodeTemplate from "../template/node/VariableOperationNodeTemplate"

/**
 * @typedef {import("./IDraggableElement").DragEvent} DragEvent
 * @typedef {import("./IElement").default} IElement
 * @typedef {import("./PinElement").default} PinElement
 * @typedef {typeof NodeElement} NodeElementConstructor
 */

/** @extends {ISelectableDraggableElement<ObjectEntity, NodeTemplate>} */
export default class NodeElement extends ISelectableDraggableElement {

    static properties = {
        ...ISelectableDraggableElement.properties,
        typePath: {
            type: String,
            attribute: "data-type",
            reflect: true,
        },
        nodeName: {
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
    /** @param {DragEvent} e */
    #commentDragHandler = e => {
        // If selected, it will already drag, also must check if under nested comments, it must drag just once
        if (!this.selected && !this.#commentDragged) {
            this.#commentDragged = true
            this.addNextUpdatedCallbacks(() => this.#commentDragged = false)
            this.addLocation(...e.detail.value)
        }
    }

    /**
     * @param {ObjectEntity} nodeEntity
     * @return {new () => NodeTemplate}
     */
    static getTypeTemplate(nodeEntity) {
        if (
            nodeEntity.getClass() === Configuration.nodeType.callFunction
            || nodeEntity.getClass() === Configuration.nodeType.commutativeAssociativeBinaryOperator
        ) {
            const memberParent = nodeEntity.FunctionReference.MemberParent?.path ?? ""
            if (memberParent === "/Script/Engine.KismetMathLibrary") {
                if (nodeEntity.FunctionReference.MemberName?.startsWith("Conv_")) {
                    return VariableConversionNodeTemplate
                }
                if (nodeEntity.FunctionReference.MemberName?.startsWith("Percent_")) {
                    return VariableOperationNodeTemplate
                }
                switch (nodeEntity.FunctionReference.MemberName) {
                    case "Abs":
                    case "BMax":
                    case "BMin":
                    case "Exp":
                    case "FMax":
                    case "FMin":
                    case "Max":
                    case "MaxInt64":
                    case "Min":
                    case "MinInt64":
                        return VariableOperationNodeTemplate
                }
            }
            if (memberParent === "/Script/Engine.BlueprintSetLibrary") {
                return VariableOperationNodeTemplate
            }
            if (memberParent === "/Script/Engine.BlueprintMapLibrary") {
                return VariableOperationNodeTemplate
            }
        }
        switch (nodeEntity.getClass()) {
            case Configuration.nodeType.comment:
            case Configuration.nodeType.customEvent:
                return CommentNodeTemplate
            case Configuration.nodeType.event: return EventNodeTemplate
            case Configuration.nodeType.knot: return KnotNodeTemplate
            case Configuration.nodeType.variableGet: return VariableAccessNodeTemplate
            case Configuration.nodeType.variableSet: return VariableAccessNodeTemplate
        }
        return NodeTemplate
    }

    /** @param {String} str */
    static fromSerializedObject(str) {
        str = str.trim()
        let entity = SerializerFactory.getSerializer(ObjectEntity).deserialize(str)
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

    initialize(entity = new ObjectEntity(), template = new (NodeElement.getTypeTemplate(entity))()) {
        super.initialize(entity, template)
        this.#pins = this.template.createPinElements()
        this.typePath = this.entity.getType()
        this.nodeName = this.entity.getObjectName()
        this.advancedPinDisplay = this.entity.AdvancedPinDisplay?.toString()
        this.enabledState = this.entity.EnabledState
        this.nodeDisplayName = this.getNodeDisplayName()
        this.pureFunction = this.entity.bIsPureFunc
        this.dragLinkObjects = []
        super.setLocation(this.entity.getNodePosX(), this.entity.getNodePosY())
        if (this.entity.NodeWidth && this.entity.NodeHeight) {
            this.sizeX = this.entity.NodeWidth.value
            this.sizeY = this.entity.NodeHeight.value
        } else {
            this.updateComplete.then(() => this.computeSizes())
        }
    }

    getUpdateComplete() {
        return Promise.all([
            super.getUpdateComplete(),
            ...this.getPinElements().map(pin => pin.updateComplete)
        ]).then(() => true)
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

    getNodeDisplayName() {
        return Configuration.nodeDisplayName(this)
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
        this.nodeName = this.entity.Name
    }

    getPinElements() {
        return this.#pins
    }

    /** @returns {PinEntity[]} */
    getPinEntities() {
        return this.entity.CustomProperties.filter(v => v instanceof PinEntity)
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
