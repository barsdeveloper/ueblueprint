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

SerializerFactory.registerSerializer(ObjectEntity, new ObjectSerializer())
SerializerFactory.registerSerializer(PinEntity, new GeneralSerializer("Pin ", PinEntity, "", ",", true))
SerializerFactory.registerSerializer(FunctionReferenceEntity, new GeneralSerializer("", FunctionReferenceEntity, "", ",", false))
SerializerFactory.registerSerializer(LocalizedTextEntity, new GeneralSerializer("NSLOCTEXT", LocalizedTextEntity, "", ",", false, "", _ => ""))

export { Blueprint as Blueprint, GraphNode as GraphNode, GraphLink as GraphLink }