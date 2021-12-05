import CustomSerializer from "./CustomSerializer"
import FunctionReferenceEntity from "../entity/FunctionReferenceEntity"
import GeneralSerializer from "./GeneralSerializer"
import GuidEntity from "../entity/GuidEntity"
import IntegerEntity from "../entity/IntegerEntity"
import LocalizedTextEntity from "../entity/LocalizedTextEntity"
import ObjectEntity from "../entity/ObjectEntity"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity"
import ObjectSerializer from "./ObjectSerializer"
import PathSymbolEntity from "../entity/PathSymbolEntity"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import SerializerFactory from "./SerializerFactory"
import ToStringSerializer from "./ToStringSerializer"

export default function initializeSerializerFactory() {
    SerializerFactory.registerSerializer(
        ObjectEntity,
        new ObjectSerializer()
    )
    SerializerFactory.registerSerializer(
        PinEntity,
        new GeneralSerializer(v => `Pin (${v})`, PinEntity, "", ",", true)
    )
    SerializerFactory.registerSerializer(
        FunctionReferenceEntity,
        new GeneralSerializer(v => `(${v})`, FunctionReferenceEntity, "", ",", false)
    )
    SerializerFactory.registerSerializer(
        LocalizedTextEntity,
        new GeneralSerializer(v => `NSLOCTEXT(${v})`, LocalizedTextEntity, "", ",", false, "", _ => "")
    )
    SerializerFactory.registerSerializer(
        PinReferenceEntity,
        new GeneralSerializer(v => v, PinReferenceEntity, "", " ", false, "", _ => "")
    )
    SerializerFactory.registerSerializer(
        ObjectReferenceEntity,
        new CustomSerializer(
            /** @param {ObjectReferenceEntity} objectReference */
            objectReference => (objectReference.type ?? "") + (
                objectReference.path
                    ? objectReference.type ? `'"${objectReference.path}"'` : objectReference.path
                    : ""
            ))
    )
    SerializerFactory.registerSerializer(PathSymbolEntity, new ToStringSerializer(PathSymbolEntity))
    SerializerFactory.registerSerializer(GuidEntity, new ToStringSerializer(GuidEntity))
    SerializerFactory.registerSerializer(IntegerEntity, new ToStringSerializer(IntegerEntity))
}
