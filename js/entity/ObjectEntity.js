import Entity from "./Entity"
import FunctionReferenceEntity from "./FunctionReferenceEntity"
import Guid from "./primitive/Guid"
import ObjectReference from "./primitive/ObjectReference"
import PinEntity from "./PinEntity"
import TypeInitialization from "./TypeInitialization"
import VariableReferenceEntity from "./VariableReferenceEntity"

export default class ObjectEntity extends Entity {

    static attributes = {
        Class: ObjectReference,
        Name: "",
        bIsPureFunc: new TypeInitialization(Boolean, false, false),
        VariableReference: new TypeInitialization(VariableReferenceEntity, false, null),
        FunctionReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        TargetType: new TypeInitialization(ObjectReference, false, null),
        NodePosX: 0,
        NodePosY: 0,
        NodeGuid: Guid,
        CustomProperties: [PinEntity]
    }

    getAttributes() {
        return ObjectEntity.attributes
    }
}
