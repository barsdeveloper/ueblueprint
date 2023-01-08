import Configuration from "../Configuration"
import FunctionReferenceEntity from "./FunctionReferenceEntity"
import GuidEntity from "./GuidEntity"
import IdentifierEntity from "./IdentifierEntity"
import IEntity from "./IEntity"
import IntegerEntity from "./IntegerEntity"
import LinearColorEntity from "./LinearColorEntity"
import MacroGraphReferenceEntity from "./MacroGraphReferenceEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"
import PinEntity from "./PinEntity"
import SymbolEntity from "./SymbolEntity"
import VariableReferenceEntity from "./VariableReferenceEntity"

export default class ObjectEntity extends IEntity {

    static attributes = {
        Class: {
            type: ObjectReferenceEntity,
        },
        Name: "",
        bIsPureFunc: {
            value: false,
            showDefault: false,
        },
        bIsConstFunc: {
            value: false,
            showDefault: false,
        },
        VariableReference: {
            type: VariableReferenceEntity,
            value: null,
            showDefault: false,
        },
        SelfContextInfo: {
            type: SymbolEntity,
            value: null,
            showDefault: false,
        },
        FunctionReference: {
            type: FunctionReferenceEntity,
            value: null,
            showDefault: false,
        },
        EventReference: {
            type: FunctionReferenceEntity,
            value: null,
            showDefault: false,
        },
        TargetType: {
            type: ObjectReferenceEntity,
            value: null,
            showDefault: false,
        },
        MacroGraphReference: {
            type: MacroGraphReferenceEntity,
            value: null,
            showDefault: false,
        },
        Enum: {
            type: ObjectReferenceEntity,
            showDefault: false,
        },
        CommentColor: {
            type: LinearColorEntity,
            showDefault: false,
        },
        bCommentBubbleVisible_InDetailsPanel: {
            type: Boolean,
            showDefault: false,
        },
        bColorCommentBubble: {
            type: Boolean,
            value: false,
            showDefault: false,
        },
        MoveMode: {
            type: SymbolEntity,
            showDefault: false,
        },
        NodePosX: {
            type: IntegerEntity,
        },
        NodePosY: {
            type: IntegerEntity,
        },
        NodeWidth: {
            type: IntegerEntity,
            showDefault: false,
        },
        NodeHeight: {
            type: IntegerEntity,
            showDefault: false,
        },
        bCommentBubblePinned: {
            type: Boolean,
            showDefault: false,
        },
        bCommentBubbleVisible: {
            type: Boolean,
            showDefault: false,
        },
        NodeComment: {
            type: String,
            showDefault: false,
        },
        AdvancedPinDisplay: {
            type: IdentifierEntity,
            value: null,
            showDefault: false,
        },
        EnabledState: {
            type: IdentifierEntity,
            value: null,
            showDefault: false,
        },
        NodeGuid: {
            type: GuidEntity,
        },
        ErrorType: {
            type: IntegerEntity,
            showDefault: false,
        },
        ErrorMsg: {
            type: String,
            value: "",
            showDefault: false,
        },
        CustomProperties: {
            type: [PinEntity]
        },
    }

    static nameRegex = /^(\w+?)(?:_(\d+))?$/
    static sequencerScriptingNameRegex = /\/Script\/SequencerScripting\.MovieSceneScripting(.+)Channel/

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values, suppressWarns = false) {
        super(values, suppressWarns)
        /** @type {ObjectReferenceEntity} */ this.Class
        /** @type {String} */ this.Name
        /** @type {Boolean?} */ this.bIsPureFunc
        /** @type {VariableReferenceEntity?} */ this.VariableReference
        /** @type {FunctionReferenceEntity?} */ this.FunctionReference
        /** @type {FunctionReferenceEntity?} */ this.EventReference
        /** @type {ObjectReferenceEntity?} */ this.TargetType
        /** @type {MacroGraphReferenceEntity?} */ this.MacroGraphReference
        /** @type {ObjectReferenceEntity?} */ this.Enum
        /** @type {LinearColorEntity?} */ this.CommentColor
        /** @type {Boolean?} */ this.bCommentBubbleVisible_InDetailsPanel
        /** @type {IntegerEntity} */ this.NodePosX
        /** @type {IntegerEntity} */ this.NodePosY
        /** @type {IntegerEntity?} */ this.NodeWidth
        /** @type {IntegerEntity?} */ this.NodeHeight
        /** @type {Boolean?} */ this.bCommentBubblePinned
        /** @type {Boolean?} */ this.bCommentBubbleVisible
        /** @type {String?} */ this.NodeComment
        /** @type {IdentifierEntity?} */ this.AdvancedPinDisplay
        /** @type {IdentifierEntity?} */ this.EnabledState
        /** @type {GuidEntity} */ this.NodeGuid
        /** @type {IntegerEntity?} */ this.ErrorType
        /** @type {String?} */ this.ErrorMsg
        /** @type {PinEntity[]} */ this.CustomProperties
    }

    getClass() {
        return this.Class.path
    }

    getType() {
        let classValue = this.getClass()
        if (classValue === Configuration.nodeType.macro) {
            return this.MacroGraphReference.MacroGraph.path
        }
        return classValue
    }

    getObjectName(dropCounter = false) {
        if (dropCounter) {
            return this.getNameAndCounter()[0]
        }
        return this.Name
    }

    /** @returns {[String, Number]} */
    getNameAndCounter() {
        const result = this.getObjectName(false).match(ObjectEntity.nameRegex)
        let name = ""
        let counter = null
        if (result) {
            if (result.length > 1) {
                name = result[1]
            }
            if (result.length > 2) {
                counter = parseInt(result[2])
            }
            return [name, counter]
        }
        return ["", 0]
    }

    getCounter() {
        return this.getNameAndCounter()[1]
    }

    getNodeWidth() {
        return this.NodeWidth ??
            this.getType() == Configuration.nodeType.comment ? Configuration.defaultCommentWidth : undefined
    }

    /** @param {Number} value */
    setNodeWidth(value) {
        if (!this.NodeWidth) {
            this.NodeWidth = new IntegerEntity()
        }
        this.NodeWidth.value = value
    }

    getNodeHeight() {
        return this.NodeHeight ??
            this.getType() == Configuration.nodeType.comment ? Configuration.defaultCommentHeight : undefined
    }

    /** @param {Number} value */
    setNodeHeight(value) {
        if (!this.NodeHeight) {
            this.NodeHeight = new IntegerEntity()
        }
        this.NodeHeight.value = value
    }
}
