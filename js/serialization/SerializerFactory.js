import ObjectEntity from "../entity/ObjectEntity";
import PinEntity from "../entity/PinEntity";
import SerializeObject from "./ObjectSerialize";
import PinSerializer from "./PinSerializer";

export default class SerializerFactory {
    static serializers = new Map([
        [PinEntity.prototype.constructor.name, PinSerializer],
        [ObjectEntity.prototype.constructor.name, SerializeObject]
    ])

    createSerializer(object) {
        return SerializerFactory.serializers.get(object.constructor.name)
    }
}