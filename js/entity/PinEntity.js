import Entity from "./Entity"
import GuidEntity from "./GuidEntity"
import LocalizedTextEntity from "./LocalizedTextEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"
import PinReferenceEntity from "./PinReferenceEntity"
import TypeInitialization from "./TypeInitialization"

export default class PinEntity extends Entity {

    static attributes = {
        PinId: GuidEntity,
        PinName: "",
        PinFriendlyName: new TypeInitialization(LocalizedTextEntity, false, null),
        PinToolTip: "",
        Direction: new TypeInitialization(String, false, ""),
        PinType: {
            PinCategory: "",
            PinSubCategory: "",
            PinSubCategoryObject: ObjectReferenceEntity,
            PinSubCategoryMemberReference: null,
            PinValueType: null,
            ContainerType: ObjectReferenceEntity,
            bIsReference: false,
            bIsConst: false,
            bIsWeakPointer: false,
            bIsUObjectWrapper: false
        },
        LinkedTo: [PinReferenceEntity],
        DefaultValue: "",
        AutogeneratedDefaultValue: "",
        PersistentGuid: GuidEntity,
        bHidden: false,
        bNotConnectable: false,
        bDefaultValueIsReadOnly: false,
        bDefaultValueIsIgnored: false,
        bAdvancedView: false,
        bOrphanedPin: false,
    }

    getAttributes() {
        return PinEntity.attributes
    }

    /**
     * 
     * @returns {String}
     */
    getPinDisplayName() {
        return this.PinName
    }

    isConnected() {
        return this.LinkedTo.length > 0
    }

    getType() {
        return this.PinType.PinCategory ?? "object"
    }

    isInput() {
        if (!this.bHidden && this.Direction !== "EGPD_Output") {
            return true
        }
    }

    isOutput() {
        if (!this.bHidden && this.Direction === "EGPD_Output") {
            return true
        }
    }
}
