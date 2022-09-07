import GuidEntity from "./GuidEntity"
import IEntity from "./IEntity"
import LinearColorEntity from "./LinearColorEntity"
import LocalizedTextEntity from "./LocalizedTextEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"
import PinReferenceEntity from "./PinReferenceEntity"
import SerializedType from "./SerializedType"
import TypeInitialization from "./TypeInitialization"

export default class PinEntity extends IEntity {

    static lookbehind = "Pin"
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
            bIsUObjectWrapper: false,
            bSerializeAsSinglePrecisionFloat: false,
        },
        LinkedTo: new TypeInitialization([PinReferenceEntity], false),
        DefaultValue: new TypeInitialization(new SerializedType(LinearColorEntity, String), false),
        AutogeneratedDefaultValue: new TypeInitialization(String, false),
        DefaultObject: new TypeInitialization(ObjectReferenceEntity, false, null),
        PersistentGuid: GuidEntity,
        bHidden: false,
        bNotConnectable: false,
        bDefaultValueIsReadOnly: false,
        bDefaultValueIsIgnored: false,
        bAdvancedView: false,
        bOrphanedPin: false,
    }

    getDefaultValue() {
        return this.DefaultValue ?? ""
    }

    isHidden() {
        return this.bHidden
    }

    isInput() {
        return !this.bHidden && this.Direction != "EGPD_Output"
    }

    isOutput() {
        return !this.bHidden && this.Direction == "EGPD_Output"
    }

    isLinked() {
        return this.LinkedTo?.length > 0 ?? false
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     */
    linkTo(targetObjectName, targetPinEntity) {
        /** @type {PinReferenceEntity[]} */
        this.LinkedTo
        const linkFound = this.LinkedTo?.find(pinReferenceEntity => {
            return pinReferenceEntity.objectName == targetObjectName
                && pinReferenceEntity.pinGuid.valueOf() == targetPinEntity.PinId.valueOf()
        })
        if (!linkFound) {
            (this.LinkedTo ?? (this.LinkedTo = [])).push(new PinReferenceEntity({
                objectName: targetObjectName,
                pinGuid: targetPinEntity.PinId,
            }))
            return true
        }
        return false
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     */
    unlinkFrom(targetObjectName, targetPinEntity) {
        const indexElement = this.LinkedTo?.findIndex(pinReferenceEntity => {
            return pinReferenceEntity.objectName == targetObjectName
                && pinReferenceEntity.pinGuid.valueOf() == targetPinEntity.PinId.valueOf()
        })
        if (indexElement >= 0) {
            if (this.LinkedTo.length == 1) {
                this.LinkedTo = undefined
            } else {
                this.LinkedTo.splice(indexElement, 1)
            }
            return true
        }
        return false
    }

    getType() {
        if (this.PinType.PinCategory == "struct") {
            return this.PinType.PinSubCategoryObject.path
        }
        return this.PinType.PinCategory
    }

    getSubCategory() {
        return this.PinType.PinSubCategoryObject.path
    }
}
