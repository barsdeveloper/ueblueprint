import CustomSerializer from "./CustomSerializer"
import FunctionReferenceEntity from "../entity/FunctionReferenceEntity"
import GeneralSerializer from "./GeneralSerializer"
import GuidEntity from "../entity/GuidEntity"
import IdentifierEntity from "../entity/IdentifierEntity"
import IntegerEntity from "../entity/IntegerEntity"
import InvariantTextEntity from "../entity/InvariantTextEntity"
import KeyBindingEntity from "../entity/KeyBindingEntity"
import LinearColorEntity from "../entity/LinearColorEntity"
import LocalizedTextEntity from "../entity/LocalizedTextEntity"
import ObjectEntity from "../entity/ObjectEntity"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity"
import ObjectSerializer from "./ObjectSerializer"
import PathSymbolEntity from "../entity/PathSymbolEntity"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import SerializerFactory from "./SerializerFactory"
import ToStringSerializer from "./ToStringSerializer"
import Utility from "../Utility"

export default function initializeSerializerFactory() {

    const bracketsWrapped = v => `(${v})`

    SerializerFactory.registerSerializer(
        null,
        new CustomSerializer(
            (nullValue, insideString) => "()",
            null
        )
    )

    SerializerFactory.registerSerializer(
        Array,
        new CustomSerializer(
            /** @param {Array} array */
            (array, insideString) =>
                `(${array
                    .map(v =>
                        SerializerFactory.getSerializer(Utility.getType(v)).serialize(v, insideString) + ","
                    )
                    .join("")
                })`,
            Array
        )
    )

    SerializerFactory.registerSerializer(
        Boolean,
        new CustomSerializer(
            /** @param {Boolean} boolean */
            (boolean, insideString) => boolean
                ? insideString
                    ? "true"
                    : "True"
                : insideString
                    ? "false"
                    : "False",
            Boolean
        )
    )

    SerializerFactory.registerSerializer(
        FunctionReferenceEntity,
        new GeneralSerializer(bracketsWrapped, FunctionReferenceEntity)
    )

    SerializerFactory.registerSerializer(GuidEntity, new ToStringSerializer(GuidEntity))

    SerializerFactory.registerSerializer(IdentifierEntity, new ToStringSerializer(IdentifierEntity))

    SerializerFactory.registerSerializer(IntegerEntity, new ToStringSerializer(IntegerEntity))

    SerializerFactory.registerSerializer(
        InvariantTextEntity,
        new GeneralSerializer(v => `${InvariantTextEntity.lookbehind}(${v})`, InvariantTextEntity, "", ", ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        KeyBindingEntity,
        new GeneralSerializer(bracketsWrapped, KeyBindingEntity)
    )

    SerializerFactory.registerSerializer(
        LinearColorEntity,
        new GeneralSerializer(bracketsWrapped, LinearColorEntity)
    )

    SerializerFactory.registerSerializer(
        LocalizedTextEntity,
        new GeneralSerializer(v => `${LocalizedTextEntity.lookbehind}(${v})`, LocalizedTextEntity, "", ", ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        Number,
        new CustomSerializer(
            /** @param {Number} value */
            value => value.toString(),
            Number
        )
    )

    SerializerFactory.registerSerializer(
        ObjectEntity,
        new ObjectSerializer()
    )

    SerializerFactory.registerSerializer(
        ObjectReferenceEntity,
        new CustomSerializer(
            /** @param {ObjectReferenceEntity} objectReference */
            objectReference => (objectReference.type ?? "") + (
                objectReference.path
                    ? objectReference.type ? `'"${objectReference.path}"'` : `"${objectReference.path}"`
                    : ""
            ),
            ObjectReferenceEntity
        )
    )

    SerializerFactory.registerSerializer(PathSymbolEntity, new ToStringSerializer(PathSymbolEntity))

    SerializerFactory.registerSerializer(
        PinEntity,
        new GeneralSerializer(v => `${PinEntity.lookbehind} (${v})`, PinEntity, "", ",", true)
    )

    SerializerFactory.registerSerializer(
        PinReferenceEntity,
        new GeneralSerializer(v => v, PinReferenceEntity, "", " ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        String,
        new CustomSerializer(
            (value, insideString) => insideString
                ? Utility.encodeString(value)
                : `"${Utility.encodeString(value)}"`,
            String
        )
    )
}
