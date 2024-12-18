import Parsernostrum from "parsernostrum"
import AlternativesEntity from "../entity/AlternativesEntity.js"
import ArrayEntity from "../entity/ArrayEntity.js"
import BooleanEntity from "../entity/BooleanEntity.js"
import FormatTextEntity from "../entity/FormatTextEntity.js"
import GuidEntity from "../entity/GuidEntity.js"
import IEntity from "../entity/IEntity.js"
import InvariantTextEntity from "../entity/InvariantTextEntity.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import LocalizedTextEntity from "../entity/LocalizedTextEntity.js"
import NullEntity from "../entity/NullEntity.js"
import NumberEntity from "../entity/NumberEntity.js"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import RotatorEntity from "../entity/RotatorEntity.js"
import StringEntity from "../entity/StringEntity.js"
import SymbolEntity from "../entity/SymbolEntity.js"
import UnknownKeysEntity from "../entity/UnknownKeysEntity.js"
import Vector2DEntity from "../entity/Vector2DEntity.js"
import Vector4DEntity from "../entity/Vector4DEntity.js"
import VectorEntity from "../entity/VectorEntity.js"
import Grammar from "./Grammar.js"

export default function initializeSerializerFactory() {
    IEntity.unknownEntityGrammar =
        Parsernostrum.alt(
            // Remember to keep the order, otherwise parsing might fail
            BooleanEntity.grammar,
            GuidEntity.grammar,
            Parsernostrum.str("None").map(() => ObjectReferenceEntity.createNoneInstance()),
            NullEntity.grammar,
            NumberEntity.grammar,
            Parsernostrum.alt(
                ObjectReferenceEntity.fullReferenceGrammar,
                Parsernostrum.regArray(new RegExp(
                    // @ts-expect-error
                    `"(${Grammar.Regex.Path.source})'(${Grammar.Regex.Path.source}|${Grammar.symbol.getParser().regexp.source})'"`
                )).map(([_0, type, path]) => new ObjectReferenceEntity(type, path, (t, p) => `"${t}'${p}'"`))
            ),
            StringEntity.grammar,
            LocalizedTextEntity.grammar,
            InvariantTextEntity.grammar,
            FormatTextEntity.grammar,
            PinReferenceEntity.grammar,
            Vector4DEntity.grammar,
            VectorEntity.grammar,
            Vector2DEntity.grammar,
            RotatorEntity.grammar,
            LinearColorEntity.grammar,
            UnknownKeysEntity.grammar,
            SymbolEntity.grammar,
            ArrayEntity.of(PinReferenceEntity).grammar,
            ArrayEntity.of(AlternativesEntity.accepting(NumberEntity, StringEntity, SymbolEntity)).grammar,
            Parsernostrum.lazy(() => ArrayEntity.createGrammar(IEntity.unknownEntityGrammar)),
        )
}
