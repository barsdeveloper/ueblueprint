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
        VariableReference: new TypeInitialization(new VariableReferenceEntity(), false),
        FunctionReference: new TypeInitialization(new FunctionReferenceEntity(), false),
        TargetType: new TypeInitialization(new ObjectReferenceEntity(), false),
        NodePosX: Integer,
        NodePosY: Integer,
        NodeGuid: GuidEntity,
        CustomProperties: [PinEntity]
    }

    getAttributes() {
        return ObjectEntity.attributes
    }
}