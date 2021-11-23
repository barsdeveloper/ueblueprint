import Blueprint from "./Blueprint"
import CustomSerializer from "./serialization/CustomSerializer"
import FunctionReferenceEntity from "./entity/FunctionReferenceEntity"
import GeneralSerializer from "./serialization/GeneralSerializer"
import GraphLink from "./graph/GraphLink"
import GraphNode from "./graph/GraphNode"
import LocalizedTextEntity from "./entity/LocalizedTextEntity"
import ObjectEntity from "./entity/ObjectEntity"
import ObjectReferenceEntity from "./entity/ObjectReferenceEntity"
import ObjectSerializer from "./serialization/ObjectSerializer"
import PathSymbolEntity from "./entity/PathSymbolEntity"
import PinEntity from "./entity/PinEntity"
import PinReferenceEntity from "./entity/PinReferenceEntity"
import SerializerFactory from "./serialization/SerializerFactory"
import ToStringSerializer from "./serialization/ToStringSerializer"

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

export { Blueprint as Blueprint, GraphNode as GraphNode, GraphLink as GraphLink }