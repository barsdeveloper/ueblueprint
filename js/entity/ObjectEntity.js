import Entity from "./Entity"
import FunctionReferenceEntity from "./FunctionReferenceEntity"
import GuidEntity from "./GuidEntity"
import Integer from "./Integer"
import ObjectReferenceEntity from "./ObjectReferenceEntity"
import PinEntity from "./PinEntity"
import TypeInitialization from "./TypeInitialization"
import VariableReferenceEntity from "./VariableReferenceEntity"

export default class ObjectEntity extends Entity {

    static attributes = {
        Class: ObjectReferenceEntity,
        Name: "",
        bIsPureFunc: new TypeInitialization(false, false),
        VariableReference: new TypeInitialization(null, false, VariableReferenceEntity),
        FunctionReference: new TypeInitialization(null, false, FunctionReferenceEntity),
        TargetType: new TypeInitialization(null, false, ObjectReferenceEntity),
        NodePosX: 0,
        NodePosY: 0,
        NodeGuid: GuidEntity,
        CustomProperties: [new TypeInitialization(null, false, PinEntity)]
    }

    getAttributes() {
        return ObjectEntity.attributes
    }
}