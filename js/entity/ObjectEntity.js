import Entity from "./Entity"
import FunctionReferenceEntity from "./FunctionReferenceEntity"
import GuidEntity from "./GuidEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"
import PinEntity from "./PinEntity"
import TypeInitialization from "./TypeInitialization"
import VariableReferenceEntity from "./VariableReferenceEntity"

export default class ObjectEntity extends Entity {

    static attributes = {
        Class: ObjectReferenceEntity,
        Name: "",
        bIsPureFunc: new TypeInitialization(Boolean, false, false),
        VariableReference: new TypeInitialization(VariableReferenceEntity, false, null),
        FunctionReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        TargetType: new TypeInitialization(ObjectReferenceEntity, false, null),
        NodePosX: 0,
        NodePosY: 0,
        NodeGuid: GuidEntity,
        CustomProperties: [PinEntity]
    }

    getAttributes() {
        return ObjectEntity.attributes
    }

    /**
     * 
     * @returns {String} The name of the node
     */
    getNodeDisplayName() {
        return this.Name
    }
}
