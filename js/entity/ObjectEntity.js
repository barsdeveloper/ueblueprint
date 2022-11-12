import FunctionReferenceEntity from "./FunctionReferenceEntity"
import GuidEntity from "./GuidEntity"
import IdentifierEntity from "./IdentifierEntity"
import IEntity from "./IEntity"
import IntegerEntity from "./IntegerEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"
import PinEntity from "./PinEntity"
import TypeInitialization from "./TypeInitialization"
import Utility from "../Utility"
import VariableReferenceEntity from "./VariableReferenceEntity"

export default class ObjectEntity extends IEntity {

    static attributes = {
        Class: ObjectReferenceEntity,
        Name: "",
        bIsPureFunc: new TypeInitialization(Boolean, false, false),
        VariableReference: new TypeInitialization(VariableReferenceEntity, false, null),
        FunctionReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        EventReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        TargetType: new TypeInitialization(ObjectReferenceEntity, false, null),
        NodePosX: IntegerEntity,
        NodePosY: IntegerEntity,
        AdvancedPinDisplay: new TypeInitialization(IdentifierEntity, false, null),
        EnabledState: new TypeInitialization(IdentifierEntity, false, null),
        NodeGuid: GuidEntity,
        ErrorType: new TypeInitialization(IntegerEntity, false),
        ErrorMsg: new TypeInitialization(String, false, ""),
        CustomProperties: [PinEntity],
    }

    static nameRegex = /(\w+)_(\d+)/

    constructor(options = {}) {
        super(options)
        /** @type {ObjectReferenceEntity} */ this.Class
        /** @type {String} */ this.Name
        /** @type {Boolean?} */ this.bIsPureFunc
        /** @type {VariableReferenceEntity?} */ this.VariableReference
        /** @type {FunctionReferenceEntity?} */ this.FunctionReference
        /** @type {FunctionReferenceEntity?} */ this.EventReference
        /** @type {ObjectReferenceEntity?} */ this.TargetType
        /** @type {IntegerEntity} */ this.NodePosX
        /** @type {IntegerEntity} */ this.NodePosY
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

    getObjectName(dropCounter = false) {
        if (dropCounter) {
            return this.getNameAndCounter()[0]
        }
        return this.Name
    }

    /** @returns {[String, Number]} */
    getNameAndCounter() {
        const result = this.getObjectName(false).match(ObjectEntity.nameRegex)
        if (result && result.length == 3) {
            return [result[1], parseInt(result[2])]
        }
        return ["", 0]
    }

    getDisplayName() {
        let name = this.FunctionReference?.MemberName
        if (name) {
            name = Utility.formatStringName(name)
            return name
        }
        name = Utility.formatStringName(this.getNameAndCounter()[0])
        return name
    }

    getCounter() {
        return this.getNameAndCounter()[1]
    }
}
