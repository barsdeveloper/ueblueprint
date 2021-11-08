import FunctionReferenceEntity from "./entity/FunctionReferenceEntity"
import GeneralSerializer from "./serialization/GeneralSerializer"
import LocalizedTextEntity from "./entity/LocalizedTextEntity"
import ObjectEntity from "./entity/ObjectEntity"
import ObjectSerializer from "./serialization/ObjectSerializer"
import PinEntity from "./entity/PinEntity"
import SerializerFactory from "./serialization/SerializerFactory"
import Blueprint from "./Blueprint"
import GraphNode from "./graph/GraphNode"
import GraphLink from "./graph/GraphLink"
import PinReferenceEntity from "./entity/PinReferenceEntity"

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

export { Blueprint as Blueprint, GraphNode as GraphNode, GraphLink as GraphLink }