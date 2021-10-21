import PinEntity from "../entity/PinEntity"
import Utility from "../Utility"
import PinSerializer from "./PinSerializer"
import ObjectEntity from "../entity/ObjectEntity"
import ObjectSerialize from "./ObjectSerialize"


export default class SerializerFactory {
    static serializers = new Map([
        [PinEntity, PinSerializer],
        [ObjectEntity, ObjectSerialize]
    ])

    static createSerializer(object) {
        return new SerializerFactory.serializers.get(Utility.getType(object))()
    }
}