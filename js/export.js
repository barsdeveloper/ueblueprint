import GeneralSerializer from "./serialization/GeneralSerializer"
import ObjectEntity from "./entity/ObjectEntity"
import ObjectSerializer from "./serialization/ObjectSerializer"
import PinEntity from "./entity/PinEntity"
import SerializerFactory from "./serialization/SerializerFactory"
import FunctionReferenceEntity from "./entity/FunctionReferenceEntity"

SerializerFactory.registerSerializer(ObjectEntity, new ObjectSerializer())
SerializerFactory.registerSerializer(PinEntity, new GeneralSerializer("Pin ", PinEntity, "", ",", true))
SerializerFactory.registerSerializer(FunctionReferenceEntity, new GeneralSerializer("", FunctionReferenceEntity, "", ",", false))

export { SerializerFactory as SerializerFactory, ObjectEntity as ObjectEntity }