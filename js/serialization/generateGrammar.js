import * as fs from "fs"
import ByteEntity from "../entity/ByteEntity.js"
import EnumEntity from "../entity/EnumEntity.js"
import FormatTextEntity from "../entity/FormatTextEntity.js"
import FunctionReferenceEntity from "../entity/FunctionReferenceEntity.js"
import GuidEntity from "../entity/GuidEntity.js"
import IdentifierEntity from "../entity/IdentifierEntity.js"
import Integer64Entity from "../entity/Integer64Entity.js"
import IntegerEntity from "../entity/IntegerEntity.js"
import InvariantTextEntity from "../entity/InvariantTextEntity.js"
import KeyBindingEntity from "../entity/KeyBindingEntity.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import LocalizedTextEntity from "../entity/LocalizedTextEntity.js"
import MacroGraphReferenceEntity from "../entity/MacroGraphReferenceEntity.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity.js"
import PathSymbolEntity from "../entity/PathSymbolEntity.js"
import peggy from "peggy"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import PinTypeEntity from "../entity/PinTypeEntity.js"
import RealUnitEntity from "../entity/UnitRealEntity.js"
import RotatorEntity from "../entity/RotatorEntity.js"
import SimpleSerializationRotatorEntity from "../entity/SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "../entity/SimpleSerializationVector2DEntity.js"
import SimpleSerializationVectorEntity from "../entity/SimpleSerializationVectorEntity.js"
import SymbolEntity from "../entity/SymbolEntity.js"
import UnionType from "../entity/UnionType.js"
import VariableReferenceEntity from "../entity/VariableReferenceEntity.js"
import Vector2DEntity from "../entity/Vector2DEntity.js"
import VectorEntity from "../entity/VectorEntity.js"

const grammarFor = (
    attribute,
    type = attribute.constructor === Object
        ? attribute.type
        : attribute.constructor,
    defaultGrammar = "unknownValue"
) => {
    let result = defaultGrammar
    if (type instanceof Array) {
        result = `
            "("
            (${grammarFor(undefined, type[0])})|.., space* "," space*|
            (space* ",")?
            ")"
        `
    } else if (type instanceof UnionType) {
        result = type.types
            .map(v => grammarFor(undefined, v))
            .reduce((acc, cur) => !cur || cur === "unknownValue" || acc === "unknownValue"
                ? "unknownValue"
                : `${acc} / ${cur}`)
    } else if (attribute?.constructor === Object) {
        result = grammarFor(undefined, type, defaultGrammar)
    } else {
        switch (type) {
            case BigInt:
                result = "bigInt"
                break
            case Boolean:
                result = "boolean"
                break
            case ByteEntity:
                result = "byteEntity"
                break
            case EnumEntity:
                result = "enumEntity"
                break
            case FormatTextEntity:
                result = "formatTextEntity"
                break
            case FunctionReferenceEntity:
                result = "functionReferenceEntity"
                break
            case GuidEntity:
                result = "guidEntity"
                break
            case IdentifierEntity:
                result = "identifierEntity"
                break
            case Integer64Entity:
                result = "integer64Entity"
                break
            case IntegerEntity:
                result = "integerEntity"
                break
            case InvariantTextEntity:
                result = "invariantTextEntity"
                break
            case KeyBindingEntity:
                result = "keyBindingEntity"
                break
            case LinearColorEntity:
                result = "linearColorEntity"
                break
            case LocalizedTextEntity:
                result = "localizedTextEntity"
                break
            case MacroGraphReferenceEntity:
                result = "macroGraphReferenceEntity"
                break
            case Number:
                result = "number"
                break
            case ObjectReferenceEntity:
                result = "objectReferenceEntity"
                break
            case PathSymbolEntity:
                result = "pathSymbolEntity"
                break
            case PinEntity:
                result = "pinEntity"
                break
            case PinReferenceEntity:
                result = "pinReferenceEntity"
                break
            case PinTypeEntity:
                result = "pinTypeEntity"
                break
            case RealUnitEntity:
                result = "realUnitEntity"
                break
            case RotatorEntity:
                result = "rotatorEntity"
                break
            case SimpleSerializationRotatorEntity:
                result = "simpleSerializationRotatorEntity"
                break
            case SimpleSerializationVector2DEntity:
                result = "simpleSerializationVector2DEntity"
                break
            case SimpleSerializationVectorEntity:
                result = "simpleSerializationVectorEntity"
                break
            case String:
                result = "string"
                break
            case SymbolEntity:
                result = "symbolEntity"
                break
            case VariableReferenceEntity:
                result = "variableReferenceEntity"
                break
            case Vector2DEntity:
                result = "vector2DEntity"
                break
            case VectorEntity:
                result = "vectorEntity"
                break
        }
    }
    if (attribute?.constructor === Object) {
        if (attribute.serialized && type.constructor !== String) {
            result = `'"' ${result} '"'`
        }
        if (attribute.nullable) {
            result = `${result} / null`
        }
    }
    return result
}

const createAttributesGrammar = (
    entityType,
    valueSeparator = '"="',
    attributesBlacklist = [],
    attributesWhitelist = [],
) =>
    Object.entries(entityType.attributes)
        .filter(
            ([k, v]) => !attributesWhitelist.length || attributesWhitelist.length && attributesWhitelist.includes(k)
        )
        .filter(
            ([k, v]) => !attributesBlacklist.includes(k) && !(v.constructor === Object && v.ignored)
        )
        .map(([k, v]) => `"${k}" space* ${valueSeparator} space* ${grammarFor(v)}`)
        .reduce((acc, cur) => `${acc}\n        / ${cur}`)

const createEntityGrammar = (
    entityType,
    valueSeparator = '"="',
    entrySeparator = '","',
    attributesBlacklist = [],
) =>
    `${(
        entityType.lookbehind
            ? `"${entityType.lookbehind}" space* `
            : ''
    )} "(" space*
    entries: (
        ${createAttributesGrammar(entityType, valueSeparator, attributesBlacklist)}
    )|.., space* ${entrySeparator} space*|
    (space* ${entrySeparator})?
    space* ")" {
        return new ${entityType.name}(createObject(entries))
    }`


const peg = String.raw
const grammar = peg`
{{
import ByteEntity from "../js/entity/ByteEntity.js"
import EnumEntity from "../js/entity/EnumEntity.js"
import FormatTextEntity from "../js/entity/FormatTextEntity.js"
import FunctionReferenceEntity from "../js/entity/FunctionReferenceEntity.js"
import GuidEntity from "../js/entity/GuidEntity.js"
import IdentifierEntity from "../js/entity/IdentifierEntity.js"
import Integer64Entity from "../js/entity/Integer64Entity.js"
import IntegerEntity from "../js/entity/IntegerEntity.js"
import InvariantTextEntity from "../js/entity/InvariantTextEntity.js"
import KeyBindingEntity from "../js/entity/KeyBindingEntity.js"
import LinearColorEntity from "../js/entity/LinearColorEntity.js"
import LocalizedTextEntity from "../js/entity/LocalizedTextEntity.js"
import MacroGraphReferenceEntity from "../js/entity/MacroGraphReferenceEntity.js"
import ObjectEntity from "../js/entity/ObjectEntity.js"
import ObjectReferenceEntity from "../js/entity/ObjectReferenceEntity.js"
import PathSymbolEntity from "../js/entity/PathSymbolEntity.js"
import PinEntity from "../js/entity/PinEntity.js"
import PinReferenceEntity from "../js/entity/PinReferenceEntity.js"
import PinTypeEntity from "../js/entity/PinTypeEntity.js"
import RealUnitEntity from "../js/entity/UnitRealEntity.js"
import RotatorEntity from "../js/entity/RotatorEntity.js"
import SimpleSerializationRotatorEntity from "../js/entity/SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "../js/entity/SimpleSerializationVector2DEntity.js"
import SimpleSerializationVectorEntity from "../js/entity/SimpleSerializationVectorEntity.js"
import SymbolEntity from "../js/entity/SymbolEntity.js"
import UnionType from "../js/entity/UnionType.js"
import VariableReferenceEntity from "../js/entity/VariableReferenceEntity.js"
import Vector2DEntity from "../js/entity/Vector2DEntity.js"
import VectorEntity from "../js/entity/VectorEntity.js"

const createObject = entries => entries.reduce((acc, cur) => ({...acc, ...cur}), {})
}}

start = multipleObjects

/*   ---   Fragments  ---   */

inlineSpace = $[ \t]
space = $[ \n\t]
multilineSpace = $(inlineSpace*)|2.., "\n"|
word = $[a-z_]i+
symbol = $[a-z_]i[0-9a-z_]i*
hexDigit = $[0-9A-F]i
integer = $[\-\+]?[0-9]+
insideString = $([^"\\] / ("\\".))*
attributeName = $word|1.., "."|
pathFragment = $("/" symbol|1.., "." / ":"|)|2..|
pathSpaceFragment = $("/" symbol|1.., "." / ":" / inlineSpace*|)|2..|
path = @pathFragment / '"' @pathSpaceFragment '"' / '\'"' @pathSpaceFragment '"\''
unknownValue = boolean / string / guidEntity / number / noneReferenceEntity
unknownEntry = key: attributeName space* "=" space* value: unknownValue {
    return { key: value }
}
byte = $(
    "0"* (
        "25"[0-5]
        / "2"[0-4][0-9]
        / "1"[0-9][0-9]
        / [0-9][0-9]?
    )?
    ![0-9]
)
realUnit = value: $(
    "+"? (
        "."[0-9]+
        / "0"("."[0-9]+)?
        / "1"(".""0"+)? ![0-9]
    )
)

/*   ---   Primitive  ---   */

boolean = true / false
false = "false" { return false; }
true  = "true" { return true; }
null = "(" inlineSpace* ")" { return null; }
number = value: $(integer ("."[0-9]+)?) { return Number(value); }
unitNumber = value: realUnit { return Number(value); }
bigint = value: integer { return BigInt(value); }
naturalNumber = value: [0-9] { return parseInt(value); }
colorNumber = value: byte { return parseInt(value); }
string = '"' value: insideString '"' { return value; }

/*   ---   Entity   ---   */

byteEntity = value: byte {
    return new ByteEntity(value)
}

enumEntity = vaue: symbol {
    return new EnumEntity(value)
}

formatTextEntity = "${FormatTextEntity.lookbehind}" space* ${grammarFor(FormatTextEntity.attributes.value)}

functionReferenceEntity = ${createEntityGrammar(FunctionReferenceEntity)}

guidEntity = value: $hexDigit|32| {
    return new GuidEntity(value)
}

identifierEntity = value: string {
    return new IdentifierEntity(value)
}

integer64Entity = value: bigint {
    return new Integer64Entity(value)
}

integerEntity = value: integer {
    return new IntegerEntity(value)
}

invariantTextEntity = "INVTEXT" space* "(" space* value: string space* ")" {
    return new InvariantTextEntity(value)
}

keyBindingEntity = ${createEntityGrammar(KeyBindingEntity)}

linearColorEntity = ${createEntityGrammar(LinearColorEntity)}

localizedTextEntity = "${LocalizedTextEntity.lookbehind}" space* "(" space* 
    namespace: string space* "," space* 
    key: string space* "," space*
    value: string space* "," space*
    ")" {
        return LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value,
        })
    }

macroGraphReferenceEntity = ${createEntityGrammar(MacroGraphReferenceEntity)}

naturalNumberEntity = value: naturalNumber {
    return new NaturalNumberEntity(value)
}

objectEntity = "Begin" space+ "Object" space+
    entries: (
    (
        ${createAttributesGrammar(ObjectEntity, '"="', [], ["Class", "Name"])}
    )|1.., space+|
    / (
        customProperties
        / ${createAttributesGrammar(ObjectEntity, '"="', ["CustomProperties"])}
    )|1.., multilineSpace|
    )
    space+ "End" space+ "Object" {
        new ObjectEntity(createObject(entries))
    }

multipleObjects = (@objectEntity space+)+

customProperties = "CustomProperties" space+ pinEntity

noneReferenceEntity = "None"i {
    return new ObjectReferenceEntity({
        type: "None",
        path: "",
    })
}

typeReferenceEntity = value: symbol {
    return new ObjectReferenceEntity({
        type: value,
        path: "",
    })
}

pathReferenceEntity = value: path {
    return new ObjectReferenceEntity({
        type: "",
        path: value,
    })
}

fullReferenceEntity = type: symbol inlineSpace* path: path {
    return new ObjectReferenceEntity({
        type: type,
        path: path,
    })
}

objectReferenceEntity = noneReferenceEntity / fullReferenceEntity / pathReferenceEntity / typeReferenceEntity

pathSymbolEntity = value: pathSpaceFragment {
    return new PathSymbolEntity(value)
}

pinEntity = ${createEntityGrammar(PinEntity)}

pinReferenceEntity = objectName: symbol space+ pinGuid: guidEntity {
    return new PinReferenceEntity({
        objectName: objectName,
        pinGuid: pinGuid,
    })
}

pinTypeEntity = ${createEntityGrammar(PinTypeEntity)}

rotatorEntity = ${createEntityGrammar(RotatorEntity)}

simpleSerializationRotatorEntity = "(" space*
    p: number space* "," space*
    y: number space* "," space*
    r: number space* "," space*
    ")" {
        new SimpleSerializationRotatorEntity({
            R: r,
            P: p,
            Y: y,
        })
    }

simpleSerializationVector2DEntity = "(" space*
    x: number space* "," space*
    y: number space* "," space*
    ")" {
        new SimpleSerializationVector2DEntity({
            X: x,
            Y: y,
        })
    }

simpleSerializationVectorEntity = "(" space*
    x: number space* "," space*
    y: number space* "," space*
    z: number space* "," space*
    ")" {
        new SimpleSerializationVectorEntity({
            X: x,
            Y: y,
            Z: z,
        })
    }

symbolEntity = value: symbol {
    return new SymbolEntity(value)
}

realUnitEntity = value: realUnit {
    return new RealUnitEntity(value)
}

variableReferenceEntity = ${createEntityGrammar(VariableReferenceEntity)}
`

export default function generateGrammar() {
    if (!fs.existsSync("build")) {
        fs.mkdirSync("build")
    }
    fs.writeFileSync("build/Grammar.peggy", grammar)
    fs.writeFileSync("build/Grammar.js", peggy.generate(grammar, {
        output: "source",
        format: "es",
        allowedStartRules: ["multipleObjects"]
    }))
}
