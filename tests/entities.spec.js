import { expect, test } from "@playwright/test"
import Utility from "../js/Utility.js"
import AlternativesEntity from "../js/entity/AlternativesEntity.js"
import ArrayEntity from "../js/entity/ArrayEntity.js"
import BooleanEntity from "../js/entity/BooleanEntity.js"
import ByteEntity from "../js/entity/ByteEntity.js"
import ColorChannelEntity from "../js/entity/ColorChannelEntity.js"
import FormatTextEntity from "../js/entity/FormatTextEntity.js"
import FunctionReferenceEntity from "../js/entity/FunctionReferenceEntity.js"
import GuidEntity from "../js/entity/GuidEntity.js"
import IEntity from "../js/entity/IEntity.js"
import IntegerEntity from "../js/entity/IntegerEntity.js"
import KeyBindingEntity from "../js/entity/KeyBindingEntity.js"
import LinearColorEntity from "../js/entity/LinearColorEntity.js"
import MirroredEntity from "../js/entity/MirroredEntity.js"
import NullEntity from "../js/entity/NullEntity.js"
import NumberEntity from "../js/entity/NumberEntity.js"
import ObjectReferenceEntity from "../js/entity/ObjectReferenceEntity.js"
import PinEntity from "../js/entity/PinEntity.js"
import PinTypeEntity from "../js/entity/PinTypeEntity.js"
import RotatorEntity from "../js/entity/RotatorEntity.js"
import SimpleSerializationRotatorEntity from "../js/entity/SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "../js/entity/SimpleSerializationVector2DEntity.js"
import SimpleSerializationVectorEntity from "../js/entity/SimpleSerializationVectorEntity.js"
import StringEntity from "../js/entity/StringEntity.js"
import SymbolEntity from "../js/entity/SymbolEntity.js"
import UnknownKeysEntity from "../js/entity/UnknownKeysEntity.js"
import Vector2DEntity from "../js/entity/Vector2DEntity.js"
import Vector4DEntity from "../js/entity/Vector4DEntity.js"
import VectorEntity from "../js/entity/VectorEntity.js"
import initializeSerializerFactory from "../js/serialization/initializeSerializerFactory.js"

test.beforeAll(() => initializeSerializerFactory())

test.describe.configure({ mode: "parallel" })

test("ArrayEntity", () => {
    {
        const grammar = ArrayEntity.grammar
        let value = grammar.parse("()")
        expect(value).toEqual(new ArrayEntity([]))
        expect(value.serialize()).toEqual("()")
        value = grammar.parse("( )")
        expect(value).toEqual(new ArrayEntity([]))
        expect(value.serialize()).toEqual("()")
        value = grammar.parse("(1, 2, 3, 4, 5, 6)")
        expect(value).toEqual(new ArrayEntity([
            new NumberEntity(1),
            new NumberEntity(2),
            new NumberEntity(3),
            new NumberEntity(4),
            new NumberEntity(5),
            new NumberEntity(6),
        ]))
        expect(value.equals(new ArrayEntity([
            new NumberEntity(1),
            new NumberEntity(2),
            new NumberEntity(3),
            new NumberEntity(4),
            new NumberEntity(5),
            new NumberEntity(6),
        ]))).toBeTruthy()
        expect(value.equals(new ArrayEntity([
            new NumberEntity(1),
            new NumberEntity(2),
            new NumberEntity(3),
            new NumberEntity(4),
            new NumberEntity(5),
            new NumberEntity(6),
            new NumberEntity(7),
        ]))).toBeFalsy()
        expect(value.equals(new ArrayEntity([
            new NumberEntity(1),
            new NumberEntity(2),
            new NumberEntity(3),
            new NumberEntity(4),
            new NumberEntity(-5),
            new NumberEntity(6),
        ]))).toBeFalsy()
        expect(value.equals(new ArrayEntity([
            new NumberEntity(1),
            new NumberEntity(2),
            new NumberEntity(3),
            new NumberEntity(4),
            new StringEntity("5"),
            new NumberEntity(6),
        ]))).toBeFalsy()
        expect(value.serialize()).toEqual("(1,2,3,4,5,6)")
        expect(value.constructor.className()).toEqual("ArrayEntity")
        value.values.map(v => v.constructor.className()).forEach(v => expect(v).toEqual("NumberEntity"))
        value = grammar.parse("(1, 2, )")
        expect(value).toEqual(new ArrayEntity([
            new NumberEntity(1),
            new NumberEntity(2),
        ]))
        expect(value.serialize()).toEqual("(1,2,)")
        expect(() => grammar.parse("( - )")).toThrow("Could not parse")
    }
    {
        const grammar = ArrayEntity.of(NumberEntity).grammar
        let value = grammar.parse("(2,4,6,8)")
        expect(value).toEqual(new ArrayEntity([
            new NumberEntity(2),
            new NumberEntity(4),
            new NumberEntity(6),
            new NumberEntity(8),
        ]))
        expect(value.serialize()).toEqual("(2,4,6,8)")
    }
    {
        const grammar = ArrayEntity.of(IntegerEntity).grammar
        let value = grammar.parse("(-0, -1, -2)")
        expect(value).toEqual(new ArrayEntity([
            new IntegerEntity(0),
            new IntegerEntity(-1),
            new IntegerEntity(-2),
        ]))
        expect(value.serialize()).toEqual("(0,-1,-2)")
        value.values.map(v => v.constructor.className()).forEach(v => expect(v).toEqual("IntegerEntity"))
        value = grammar.parse("(-0, -1, -2,)")
        expect(value).toEqual(new ArrayEntity([
            new IntegerEntity(0),
            new IntegerEntity(-1),
            new IntegerEntity(-2),
        ]))
        expect(value.serialize()).toEqual("(0,-1,-2,)")
        expect(() => grammar.parse("(-1, -2.1, -3)")).toThrow("Could not parse")
    }
    {
        const grammar = ArrayEntity.grammar
        let value = grammar.parse(`(
            "alpha",
            "beta",
            123,
            3BEF2168446CAA32D5B54289FAB2F0BA,
            Some(a=1, b="number:\\"2\\"")
        )`)
        expect(value).toEqual(new ArrayEntity([
            new StringEntity("alpha"),
            new StringEntity("beta"),
            new NumberEntity(123),
            new GuidEntity("3BEF2168446CAA32D5B54289FAB2F0BA"),
            new (UnknownKeysEntity.withLookbehind("Some"))({
                a: new NumberEntity(1),
                b: new StringEntity('number:"2"'),
            })
        ]))
        expect(value.serialize()).toEqual('("alpha","beta",123,3BEF2168446CAA32D5B54289FAB2F0BA,Some(a=1,b="number:\\"2\\""))')
        expect(value.values.map(v => v.constructor.className())).toEqual([
            "StringEntity",
            "StringEntity",
            "NumberEntity",
            "GuidEntity",
            "UnknownKeysEntity",
        ])
        value = grammar.parse(`(
            A(first = (9,8,7,6,5), second = 00000000000000000000000000000000),
            B(key="hello"),
        )`)
        expect(value).toEqual(new ArrayEntity([
            new UnknownKeysEntity({
                lookbehind: new StringEntity("A"),
                first: new ArrayEntity([
                    new NumberEntity(9),
                    new NumberEntity(8),
                    new NumberEntity(7),
                    new NumberEntity(6),
                    new NumberEntity(5),
                ]),
                second: new GuidEntity("00000000000000000000000000000000"),
            }),
            new UnknownKeysEntity({
                lookbehind: new StringEntity("B"),
                key: new StringEntity("hello"),
            })
        ]))
        expect(value.serialize()).toEqual('(A(first=(9,8,7,6,5),second=00000000000000000000000000000000),B(key="hello"),)')
    }
    {
        // Nested
        let value = ArrayEntity.of(AlternativesEntity.accepting(
            IntegerEntity,
            ArrayEntity.of(IntegerEntity)
        )).grammar.parse("((1, 2), (3, 4), 5)")
        expect(value).toEqual(new ArrayEntity([
            new ArrayEntity([new IntegerEntity(1), new IntegerEntity(2)]),
            new ArrayEntity([new IntegerEntity(3), new IntegerEntity(4)]),
            new IntegerEntity(5),
        ]))
        expect(value.serialize()).toEqual("((1,2),(3,4),5)")
    }
    {
        const grammar = ArrayEntity.grammar
        let value = grammar.parse('(((1, "2"), (3, 4)), "5")')
        expect(value).toEqual(new ArrayEntity([
            new ArrayEntity([
                new ArrayEntity([new NumberEntity(1), new StringEntity("2")]),
                new ArrayEntity([new NumberEntity(3), new NumberEntity(4)])
            ]),
            new StringEntity("5")
        ]))
        expect(value.serialize()).toEqual('(((1,"2"),(3,4)),"5")')
    }
    {
        let value = ArrayEntity.grammar.parse(`(
            One(a = (1,(2,(3,(4)))), b = ()),
        )`)
        expect(value).toEqual(new ArrayEntity([
            new UnknownKeysEntity({
                lookbehind: "One",
                a: new ArrayEntity([
                    new NumberEntity(1),
                    new ArrayEntity([
                        new NumberEntity(2),
                        new ArrayEntity([
                            new NumberEntity(3),
                            new ArrayEntity([
                                new NumberEntity(4),
                            ])
                        ])
                    ])
                ]),
                b: new NullEntity(),
            }),
        ]))
        expect(value.serialize()).toEqual("(One(a=(1,(2,(3,(4)))),b=()),)")
    }
    {
        // Serialized subentitites
        const value = new ArrayEntity([
            new StringEntity("alpha"),
            new (ArrayEntity.flagSerialized())([
                new (NumberEntity.flagSerialized())(12),
                new NumberEntity(23),
            ]),
        ])
        expect(value.serialize()).toEqual(String.raw`("alpha","(\"12\",23)")`)
    }
})

test("Boolean", () => {
    let grammar = BooleanEntity.grammar

    let value = grammar.parse("true")
    expect(value).toBeInstanceOf(BooleanEntity)
    expect(value).toEqual(new BooleanEntity(true))
    expect(value.serialize()).toBe("true")
    expect(value.equals(new (BooleanEntity.withDefault().flagNullable())(true))).toBeTruthy()
    expect(value.valueOf()).toBe(true)

    value = grammar.parse("True")
    expect(value).toBeInstanceOf(BooleanEntity)
    expect(value).toEqual(new BooleanEntity(true))
    expect(value.serialize()).toEqual("True")
    expect(value.equals(new BooleanEntity(true))).toBeTruthy()
    expect(value.equals(new BooleanEntity(false))).toBeFalsy()
    expect(value.valueOf()).toBe(true)

    value = grammar.parse("false")
    expect(value).toBeInstanceOf(BooleanEntity)
    expect(value).toEqual(new BooleanEntity(false))
    expect(value.serialize()).toEqual("false")
    expect(value.valueOf()).toBe(false)

    value = grammar.parse("False")
    expect(value).toBeInstanceOf(BooleanEntity)
    expect(value).toEqual(new BooleanEntity(false))
    expect(value.serialize()).toEqual("False")
    expect(value.valueOf()).toBe(false)
    expect(() => grammar.parse("truee")).toThrow("Could not parse")

    expect(BooleanEntity.flagSerialized().grammar.parse("False").serialize()).toEqual(`"False"`)
    expect(BooleanEntity.flagSerialized().grammar.parse("true").serialize()).toEqual(`"true"`)
})

test("FormatTextEntity", () => {
    let grammar = FormatTextEntity.grammar
    let grammar2 = FormatTextEntity.flagSerialized().grammar

    const input = 'LOCGEN_FORMAT_NAMED(NSLOCTEXT("KismetSchema",   "SplitPinFriendlyNameFormat",  "{PinDisplayName} {ProtoPinDisplayName}"),   "PinDisplayName", "Out Hit", "ProtoPinDisplayName", "Blocking Hit")'
    let value = grammar.parse(input)
    let value2 = grammar2.parse(input)
    expect(value).toBeInstanceOf(FormatTextEntity)
    expect(value2).toBeInstanceOf(FormatTextEntity)
    expect(value.toString()).toEqual("Out Hit Blocking Hit")
    expect(value.serialize())
        .toEqual('LOCGEN_FORMAT_NAMED(NSLOCTEXT("KismetSchema", "SplitPinFriendlyNameFormat", "{PinDisplayName} {ProtoPinDisplayName}"), "PinDisplayName", "Out Hit", "ProtoPinDisplayName", "Blocking Hit")')
    expect(value2.serialize())
        .toEqual(String.raw`"LOCGEN_FORMAT_NAMED(NSLOCTEXT(\"KismetSchema\", \"SplitPinFriendlyNameFormat\", \"{PinDisplayName} {ProtoPinDisplayName}\"), \"PinDisplayName\", \"Out Hit\", \"ProtoPinDisplayName\", \"Blocking Hit\")"`)
    expect(value.equals(value2)).toBeTruthy()
    expect(value2.equals(value)).toBeTruthy()

    value = grammar.parse(String.raw`LOCGEN_FORMAT_ORDERED(
        NSLOCTEXT(
            "PCGSettings",
            "OverridableParamPinTooltip",
            "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""
        ),
        "If InRangeMin = InRangeMax, then that density value is mapped to the average of OutRangeMin and OutRangeMax\n",
        "float",
        "InRangeMin"
    )`)
    expect(value.toString())
        .toEqual(`If InRangeMin = InRangeMax, then that density value is mapped to the average of OutRangeMin and OutRangeMax\nAttribute type is "float" and its exact name is "InRangeMin"`)
    expect(value.serialize())
        .toEqual(String.raw`LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "If InRangeMin = InRangeMax, then that density value is mapped to the average of OutRangeMin and OutRangeMax\n", "float", "InRangeMin")`)
    expect(() => grammar.parse("LOCGEN_FORMAT_NAMED")).toThrow("Could not parse")
})

test("FunctionReferenceEntity", () => {
    const grammar = FunctionReferenceEntity.grammar
    const grammar2 = FunctionReferenceEntity.flagSerialized().grammar
    {
        const s = `(MemberParent=/Script/Engine.BlueprintGeneratedClass'"/Temp/Untitled_1.Untitled_C"',MemberName="MoveCharacterRandomLocation",MemberGuid=9C3BF2E5A27C4B45825C025A224639EA)`
        const value = grammar.parse(s)
        const value2 = grammar2.parse(s)
        expect(value).toBeInstanceOf(FunctionReferenceEntity)
        expect(value.equals(new FunctionReferenceEntity({
            MemberParent: new ObjectReferenceEntity(
                "/Script/Engine.BlueprintGeneratedClass",
                "/Temp/Untitled_1.Untitled_C"
            ),
            MemberName: new StringEntity("MoveCharacterRandomLocation"),
            MemberGuid: new GuidEntity("9C3BF2E5A27C4B45825C025A224639EA"),
        }))).toBeTruthy()
        expect(value.equals(value2)).toBeTruthy()
        expect(value2.equals(value)).toBeTruthy()
        expect(value.equals(new FunctionReferenceEntity({
            MemberGuid: new GuidEntity("9C3BF2E5A27C4B45825C025A224639EA"),
            MemberName: new StringEntity("MoveCharacterRandomLocation"),
            MemberParent: new ObjectReferenceEntity(
                "/Script/Engine.BlueprintGeneratedClass",
                "/Temp/Untitled_1.Untitled_C"
            ),
        }))).toBeTruthy()
        expect(value.equals(new FunctionReferenceEntity({
            MemberParent: new ObjectReferenceEntity(
                "/Script/Engine.BlueprintGeneratedClass2", // This is different
                "/Temp/Untitled_1.Untitled_C"
            ),
            MemberName: new StringEntity("MoveCharacterRandomLocation"),
            MemberGuid: new GuidEntity("9C3BF2E5A27C4B45825C025A224639EA"),
        }))).toBeFalsy()
        expect(value.equals(new FunctionReferenceEntity({
            MemberParent: new ObjectReferenceEntity(
                "/Script/Engine.BlueprintGeneratedClass",
                "/Temp/Untitled_1.Untitled_C"
            ),
            MemberName: new StringEntity("MoveCharacterRandomLocation2"), // This is different
            MemberGuid: new GuidEntity("9C3BF2E5A27C4B45825C025A224639EA"),
        }))).toBeFalsy()
        expect(value.equals(new FunctionReferenceEntity({
            MemberParent: new ObjectReferenceEntity(
                "/Script/Engine.BlueprintGeneratedClass",
                "/Temp/Untitled_1.Untitled_C"
            ),
            // Missing MemberName
            MemberGuid: new GuidEntity("9C3BF2E5A27C4B45825C025A224639EA"),
        }))).toBeFalsy()
        expect(value.serialize()).toEqual(s)
        expect(value.serialize(true)).toEqual(
            String.raw`(MemberParent=/Script/Engine.BlueprintGeneratedClass'\"/Temp/Untitled_1.Untitled_C\"',MemberName=\"MoveCharacterRandomLocation\",MemberGuid=9C3BF2E5A27C4B45825C025A224639EA)`
        )
        expect(value2.serialize()).toEqual(
            String.raw`"(MemberParent=/Script/Engine.BlueprintGeneratedClass'\"/Temp/Untitled_1.Untitled_C\"',MemberName=\"MoveCharacterRandomLocation\",MemberGuid=9C3BF2E5A27C4B45825C025A224639EA)"`
        )
    }
    {
        const s = `(MemberParent=/Script/Engine.BlueprintGeneratedClass'"/Temp/Untitled_1.Untitled_C"',MemberName="InpAxisKeyEvt_MouseX_K2Node_InputAxisKeyEvent_2")`
        const value = grammar.parse(s)
        expect(value).toBeInstanceOf(FunctionReferenceEntity)
        expect(value.equals(new FunctionReferenceEntity({
            MemberParent: new ObjectReferenceEntity(
                "/Script/Engine.BlueprintGeneratedClass",
                "/Temp/Untitled_1.Untitled_C"
            ),
            MemberName: new StringEntity("InpAxisKeyEvt_MouseX_K2Node_InputAxisKeyEvent_2"),
        }))).toBeTruthy()
        expect(value.equals(new FunctionReferenceEntity({
            MemberParent: new ObjectReferenceEntity(
                "/Script/Engine.BlueprintGeneratedClass",
                "/Temp/Untitled_1.Untitled_C"
            ),
            MemberName: new StringEntity("InpAxisKeyEvt_MouseX_K2Node_InputAxisKeyEvent_2"),
            MemberGuid: new GuidEntity("9C3BF2E5A27C4B45825C025A224639EA"),
        }))).toBeFalsy()
        expect(value.serialize()).toEqual(s)
        expect(value.serialize(true)).toEqual(
            String.raw`(MemberParent=/Script/Engine.BlueprintGeneratedClass'\"/Temp/Untitled_1.Untitled_C\"',MemberName=\"InpAxisKeyEvt_MouseX_K2Node_InputAxisKeyEvent_2\")`
        )
    }
    {
        const s = `()`
        const value = grammar.parse(s)
        expect(value).toBeInstanceOf(FunctionReferenceEntity)
        expect(value.equals(new FunctionReferenceEntity())).toBeTruthy()
        expect(value.equals(new FunctionReferenceEntity({
            MemberGuid: new GuidEntity("9C3BF2E5A27C4B45825C025A224639EA")
        }))).toBeFalsy()
        expect(value.serialize()).toEqual("()")
        expect(value.serialize(true)).toEqual("()")
    }
    {
        const s = `(Unexpected="Hello")`
        const value = grammar.parse(s)
        const value2 = grammar2.parse(s)
        expect(value).toBeInstanceOf(FunctionReferenceEntity)
        expect(value2).toBeInstanceOf(FunctionReferenceEntity)
        expect(value.equals(new FunctionReferenceEntity({
            Unexpected: new StringEntity("Hello")
        }))).toBeTruthy()
        expect(value.equals(new FunctionReferenceEntity())).toBeFalsy()
        expect(value.serialize()).toEqual(`(Unexpected="Hello")`)
        expect(value.serialize(true)).toEqual(String.raw`(Unexpected=\"Hello\")`)
    }
})

test("GuidEntity", () => {
    let grammar = GuidEntity.flagInlined().grammar
    {
        const value = grammar.parse("0556a3ecabf648d0a5c07b2478e9dd32")
        expect(value).toBeInstanceOf(GuidEntity)
        expect(value).toEqual(new GuidEntity("0556a3ecabf648d0a5c07b2478e9dd32"))
        expect(value.equals(new GuidEntity("0556a3ecabf648d0a5c07b2478e9dd32"))).toBeTruthy()
        expect(value.equals(new (GuidEntity.withDefault().flagInlined())("0556a3ecabf648d0a5c07b2478e9dd32"))).toBeTruthy()
        expect(value.equals(new (GuidEntity.withDefault().flagInlined())("0556a3ecabf648d0a5c07b2478e9dd33"))).toBeFalsy()
        expect(value.serialize()).toEqual("0556a3ecabf648d0a5c07b2478e9dd32")
    }
    {
        const value = grammar.parse("64023BC344E0453DBB583FAC411489BC")
        expect(value).toBeInstanceOf(GuidEntity)
        expect(value).toEqual(new GuidEntity("64023BC344E0453DBB583FAC411489BC"))
        expect(value.serialize()).toEqual("64023BC344E0453DBB583FAC411489BC")
    }
    {
        const value = grammar.parse("6edC4a425ca948da8bC78bA52DED6C6C")
        expect(value).toBeInstanceOf(GuidEntity)
        expect(value).toEqual(new GuidEntity("6edC4a425ca948da8bC78bA52DED6C6C"))
        expect(value.serialize()).toEqual("6edC4a425ca948da8bC78bA52DED6C6C")
    }
    expect(() => grammar.parse("172087193 9B04362973544B3564FDB2C")).toThrow("Could not parse")
    expect(() => grammar.parse("E25F14F8F3E9441AB07153E7DA2BA2B")).toThrow("Could not parse")
    expect(() => grammar.parse("A78988B0097E48418C8CB87EC5A67ABF7")).toThrow("Could not parse")
})

test("IntegerEntity", () => {
    let grammar = IntegerEntity.grammar

    let value = grammar.parse("0")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(0))
    expect(value.equals(new IntegerEntity(0))).toBeTruthy()
    expect(value.equals(new IntegerEntity(0.1))).toBeTruthy()
    expect(value.equals(new NumberEntity(0))).toBeTruthy()
    expect(value.equals(new NumberEntity(0.1))).toBeFalsy()
    expect(value.equals(new ByteEntity(0))).toBeTruthy()
    expect(value.equals(new ByteEntity(0.9))).toBeTruthy()
    expect(value.equals(new ByteEntity(-0.9))).toBeTruthy()
    expect(value.equals(new ByteEntity(1))).toBeFalsy()
    expect(value.serialize()).toEqual("0")

    value = grammar.parse("+0")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(0))
    expect(value.serialize()).toEqual("0")

    value = grammar.parse("-0")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(0))
    expect(value.serialize()).toEqual("0")

    value = grammar.parse("99")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(99))
    expect(value.serialize()).toEqual("99")

    value = grammar.parse("-8685")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(-8685))
    expect(value.serialize()).toEqual("-8685")

    value = grammar.parse("+555")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(555))
    expect(value.serialize()).toEqual("555")

    value = grammar.parse("1000000000")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(1000000000))
    expect(value.serialize()).toEqual("1000000000")

    expect(() => grammar.parse("1.2").value).toThrow()

    expect(IntegerEntity.flagSerialized().grammar.parse("589").serialize()).toEqual(`"589"`)
})

test("KeyBindingEntity", () => {
    let grammar = KeyBindingEntity.grammar

    let value = grammar.parse("A")
    expect(value).toBeInstanceOf(KeyBindingEntity)
    expect(value).toEqual(new KeyBindingEntity({ Key: new SymbolEntity("A") }))
    expect(value.serialize()).toEqual("(Key=A)")

    value = grammar.parse("(bCtrl=True,Key=A)")
    expect(value).toBeInstanceOf(KeyBindingEntity)
    expect(value).toEqual(new KeyBindingEntity({ bCtrl: new BooleanEntity(true), Key: new SymbolEntity("A") }))
    expect(value.serialize()).toEqual("(bCtrl=True,Key=A)")

    value = grammar.parse("(bCtrl=false, bShift=false,bCmd=true,bAlt=false,Key=X)")
    expect(value).toBeInstanceOf(KeyBindingEntity)
    expect(value).toEqual(new KeyBindingEntity({
        bCtrl: new BooleanEntity(false),
        bShift: new BooleanEntity(false),
        bCmd: new BooleanEntity(true),
        bAlt: new BooleanEntity(false),
        Key: new SymbolEntity("X"),
    }))
    expect(value.serialize()).toEqual("(bCtrl=false,bShift=false,bCmd=true,bAlt=false,Key=X)")

    value = grammar.parse("(       bCtrl=  false  \n,       Key \n\n\n  =Y ,bAlt=True     )")
    expect(value).toBeInstanceOf(KeyBindingEntity)
    expect(value).toEqual(new KeyBindingEntity({
        bCtrl: new BooleanEntity(false),
        Key: new SymbolEntity("Y"),
        bAlt: new BooleanEntity(true),
    }))
    expect(value.serialize()).toEqual("(bCtrl=false,Key=Y,bAlt=True)")

    expect(() => grammar.parse("(Key=K"))
})

test("LinearColorEntity", () => {
    const grammar = LinearColorEntity.grammar

    let value = LinearColorEntity.getWhite()
    expect(value).toEqual(new LinearColorEntity({
        R: new ColorChannelEntity(1),
        G: new ColorChannelEntity(1),
        B: new ColorChannelEntity(1),
        A: new ColorChannelEntity(1),
    }))
    expect(value.toRGBA()).toStrictEqual([255, 255, 255, 255])
    expect(value.toRGBAString()).toStrictEqual("FFFFFFFF")
    expect(value.toNumber()).toStrictEqual(-1)
    expect(value.toHSVA()).toStrictEqual([0, 0, 1, 1])
    expect(value.serialize()).toStrictEqual("(R=1.000000,G=1.000000,B=1.000000,A=1.000000)")

    value = grammar.parse("(R=1,G=0,B=0)")
    expect(value).toEqual(new LinearColorEntity({
        R: new ColorChannelEntity(1),
        G: new ColorChannelEntity(0),
        B: new ColorChannelEntity(0),
        A: new ColorChannelEntity(1),
    }))
    expect(value.toRGBA()).toStrictEqual([255, 0, 0, 255])
    expect(value.toRGBAString()).toStrictEqual("FF0000FF")
    expect(value.toNumber()).toStrictEqual(-16776961)
    expect(value.toHSVA()).toStrictEqual([0, 1, 1, 1])
    expect(value.serialize()).toStrictEqual("(R=1.000000,G=0.000000,B=0.000000,A=1.000000)")

    value = grammar.parse("(R=0.000000,G=0.660000,B=1.000000,A=1.000000)")
    expect(value).toEqual(new LinearColorEntity({
        R: new ColorChannelEntity(0),
        G: new ColorChannelEntity(0.66),
        B: new ColorChannelEntity(1),
        A: new ColorChannelEntity(1),
    }))
    expect(value.toRGBA()).toStrictEqual([0, 168, 255, 255])
    expect(value.toRGBAString()).toStrictEqual("00A8FFFF")
    expect(value.toNumber()).toStrictEqual(11075583)
    expect(value.toHSVA()).toStrictEqual([0.55666666666666666666, 1, 1, 1])
    expect(value.serialize()).toStrictEqual("(R=0.000000,G=0.660000,B=1.000000,A=1.000000)")

    value = grammar.parse("(B=0.04394509003266556,G=0.026789300067696642,A=0.83663232408635,R=0.6884158028074934,)")
    expect(value.toRGBA()).toStrictEqual([176, 7, 11, 213])
    expect(value.toRGBAString()).toStrictEqual("B0070BD5")
    expect(value.toNumber()).toStrictEqual(-1341715499)
    expect(value.toHSVA().map(v => Utility.roundDecimals(v, 3))).toStrictEqual([0.996, 0.961, 0.688, 0.837])

    value = grammar.parse(`(
                    A     = 0.327     ,
              R=0.530   ,             G  =      0.685
                ,B
                       =       0.9    ,)`)
    expect(value.toRGBA()).toStrictEqual([135, 175, 230, 83])
    expect(value.toRGBAString()).toStrictEqual("87AFE653")
    expect(value.toNumber()).toStrictEqual(-2018515373)
    expect(value.toHSVA().map(v => Utility.roundDecimals(v, 3))).toStrictEqual([0.597, 0.411, 0.9, 0.327])

    value = grammar.parse("(R=0.000000,G=0.660000,A=1.000000)")
    expect(value).toEqual(new LinearColorEntity({
        R: new ColorChannelEntity(0),
        G: new ColorChannelEntity(0.66),
        B: new ColorChannelEntity(0),
        A: new ColorChannelEntity(1),
    }))
})

test("MirroredEntity", () => {
    const grammarBool = MirroredEntity.of(BooleanEntity).grammar
    const grammarNumber = MirroredEntity.of(NumberEntity).grammar
    const grammarNumber2 = MirroredEntity.of(NumberEntity.withPrecision(5)).grammar
    const a = grammarBool.parse("true")
    const b = grammarBool.parse("True")
    const c = grammarBool.parse("false")
    const d = grammarNumber.parse("1")
    const e = grammarNumber.parse("-12.67")
    const f = grammarNumber2.parse("1")

    expect(() => grammarBool.parse("123")).toThrow()
    expect(() => grammarNumber.parse("abc")).toThrow()

    expect(a.equals(a)).toBeTruthy()
    expect(a.equals(b)).toBeTruthy()
    expect(a.equals(c)).toBeFalsy()
    expect(a.equals(d)).toBeFalsy()
    expect(a.equals(e)).toBeFalsy()
    expect(a.equals(f)).toBeFalsy()
    expect(a.equals(new BooleanEntity(true))).toBeTruthy()
    expect(a.equals(new BooleanEntity(false))).toBeFalsy()

    expect(b.equals(a)).toBeTruthy()
    expect(b.equals(b)).toBeTruthy()
    expect(b.equals(c)).toBeFalsy()
    expect(b.equals(d)).toBeFalsy()
    expect(b.equals(e)).toBeFalsy()
    expect(b.equals(f)).toBeFalsy()
    expect(b.equals(new BooleanEntity(true))).toBeTruthy()
    expect(b.equals(new BooleanEntity(false))).toBeFalsy()

    expect(c.equals(a)).toBeFalsy()
    expect(c.equals(b)).toBeFalsy()
    expect(c.equals(c)).toBeTruthy()
    expect(c.equals(d)).toBeFalsy()
    expect(c.equals(e)).toBeFalsy()
    expect(c.equals(f)).toBeFalsy()
    expect(c.equals(new BooleanEntity(true))).toBeFalsy()
    expect(c.equals(new BooleanEntity(false))).toBeTruthy()

    expect(d.equals(a)).toBeFalsy()
    expect(d.equals(b)).toBeFalsy()
    expect(d.equals(c)).toBeFalsy()
    expect(d.equals(d)).toBeTruthy()
    expect(d.equals(e)).toBeFalsy()
    expect(d.equals(f)).toBeTruthy()
    expect(d.equals(new BooleanEntity(true))).toBeFalsy()
    expect(d.equals(new IntegerEntity(1))).toBeTruthy()
    expect(d.equals(new IntegerEntity(2))).toBeFalsy()

    expect(a.serialize()).toEqual("true")
    expect(b.serialize()).toEqual("True")
    expect(c.serialize()).toEqual("false")
    expect(d.serialize()).toEqual("1")
    expect(e.serialize()).toEqual("-12.67")
    expect(f.serialize()).toEqual("1.00000")

    const number = new (NumberEntity.flagSerialized())(8)
    const mirroredEntity = MirroredEntity
        .of(NumberEntity.withPrecision(3))
        .withDefault(() => new MirroredEntity(() => number))
    const mirroredEntity2 = MirroredEntity
        .of(mirroredEntity)
        .withDefault(() => new MirroredEntity(() => new MirroredEntity(() => number)))
    const mirror = new mirroredEntity()
    const mirror2 = new mirroredEntity2()
    expect(number.serialize()).toEqual(`"8"`)
    // Not serialized and also with trailing 0s even though it's printing the same number instance
    expect(mirror.serialize()).toEqual("8.000")
    expect(mirror2.serialize()).toEqual("8.000")

    const value = mirroredEntity2.grammar.parse("123.4")
    expect(value.serialize()).toEqual("123.400")
})

test("NullEntity", () => {
    const grammar = NullEntity.grammar
    let value = grammar.parse("()")
    expect(value).toBeInstanceOf(NullEntity)
    expect(value).toEqual(new NullEntity())
    expect(value.serialize()).toEqual("()")
    expect(value.equals(new NullEntity())).toBeTruthy()
    expect(value.equals(new NumberEntity())).toBeFalsy()
    expect(value.equals(123)).toBeFalsy()
    expect(NullEntity.flagSerialized().grammar.parse("()").serialize()).toEqual(`"()"`)
    expect(() => grammar.parse("123")).toThrow("Could not parse")
    expect(() => grammar.parse("(a)")).toThrow("Could not parse")
    expect(() => grammar.parse("(")).toThrow("Could not parse")
})

test("NumberEntity", () => {
    const grammar = NumberEntity.grammar
    expect(grammar.parse("0").value).toBeCloseTo(0, 0.00001)
    expect(grammar.parse("+0").value).toBeCloseTo(0, 0.00001)
    expect(grammar.parse("-0").value).toBeCloseTo(0, 0.00001)
    expect(grammar.parse("5").value).toBeCloseTo(5, 0.00001)
    expect(grammar.parse("5").equals(new NumberEntity(5))).toBeTruthy()
    expect(grammar.parse("5").equals(new IntegerEntity(5))).toBeTruthy()
    expect(grammar.parse("5.001").equals(new NumberEntity(5))).toBeFalsy()
    expect(grammar.parse("0.05").value).toBeCloseTo(0.05, 0.00001)
    expect(grammar.parse("-999.666").value).toBeCloseTo(-999.666, 0.001)
    expect(grammar.parse("+45.454500").value).toBeCloseTo(45.4545, 0.001)
    expect(grammar.parse("+1000000000").value).toBeCloseTo(1E9, 0.1)
    expect(grammar.parse("1").serialize()).toBe("1")
    expect(grammar.parse("1.000").serialize()).toBe("1.000")
    expect(grammar.parse("+933.75500010").serialize()).toBe("933.75500010")
    expect(grammar.parse("inf").value).toBe(Number.POSITIVE_INFINITY)
    expect(grammar.parse("+inf").value).toBe(Number.POSITIVE_INFINITY)
    expect(grammar.parse("-inf").value).toBe(Number.NEGATIVE_INFINITY)
    expect(grammar.parse("0")).toBeInstanceOf(NumberEntity)
    expect(grammar.parse("123")).toBeInstanceOf(NumberEntity)
    expect(grammar.parse("-76.3")).toBeInstanceOf(NumberEntity)
    expect(grammar.parse("-inf")).toBeInstanceOf(NumberEntity)
    expect(() => grammar.parse("57.2.3")).toThrow()
    expect(() => grammar.parse("alpha")).toThrow()
})

test("ObjectReferenceEntity", () => {
    const grammar = ObjectReferenceEntity.grammar

    let value = grammar.parse("Class")
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("Class"))
    expect(value.equals(new ObjectReferenceEntity("Class"))).toBeTruthy()
    expect(value.equals(new ObjectReferenceEntity("Class", "a"))).toBeFalsy()
    expect(value.serialize()).toEqual("Class")

    value = grammar.parse(`Class'/Script/ShooterGame.ShooterGameMode'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("Class", "/Script/ShooterGame.ShooterGameMode"))
    expect(value.equals(new ObjectReferenceEntity("Class", "/Script/ShooterGame.ShooterGameMode"))).toBeTruthy()
    expect(value.equals(new ObjectReferenceEntity("Class1", "/Script/ShooterGame.ShooterGameMode"))).toBeFalsy()
    expect(value.equals(new ObjectReferenceEntity("Class", "/Script/ShooterGame.ShooterGameMode1"))).toBeFalsy()
    expect(value.serialize()).toEqual(`Class'/Script/ShooterGame.ShooterGameMode'`)
    expect(value.serialize(true)).toEqual(`Class'/Script/ShooterGame.ShooterGameMode'`)

    value = grammar.parse(`EdGraphPin'EdGraphPin_45417'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("EdGraphPin", "EdGraphPin_45417"))
    expect(value.serialize()).toEqual(`EdGraphPin'EdGraphPin_45417'`)
    expect(value.serialize(true)).toEqual(`EdGraphPin'EdGraphPin_45417'`)

    value = grammar.parse(`EdGraphPin'"K2Node_DynamicCast_2126.EdGraphPin_3990988"'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("EdGraphPin", "K2Node_DynamicCast_2126.EdGraphPin_3990988"))
    expect(value.serialize()).toEqual(`EdGraphPin'"K2Node_DynamicCast_2126.EdGraphPin_3990988"'`)
    expect(value.serialize(true)).toEqual(String.raw`EdGraphPin'\"K2Node_DynamicCast_2126.EdGraphPin_3990988\"'`)

    value = grammar.parse(
        `"/Script/Engine.MaterialExpressionMaterialFunctionCall'MaterialExpressionMaterialFunctionCall_0'"`
    )
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity(
        "/Script/Engine.MaterialExpressionMaterialFunctionCall",
        "MaterialExpressionMaterialFunctionCall_0",
    ))
    expect(value.serialize(false)).toEqual(
        String.raw`"/Script/Engine.MaterialExpressionMaterialFunctionCall'MaterialExpressionMaterialFunctionCall_0'"`
    )
    expect(value.serialize(true)).toEqual(
        String.raw`\"/Script/Engine.MaterialExpressionMaterialFunctionCall'MaterialExpressionMaterialFunctionCall_0'\"`
    )

    value = grammar.parse(
        `/Script/Engine.EdGraph'"/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N"'`
    )
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity(
        "/Script/Engine.EdGraph",
        "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N",
    ))
    expect(value.serialize()).toEqual(
        String.raw`/Script/Engine.EdGraph'"/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N"'`
    )
    expect(value.serialize(true)).toEqual(
        String.raw`/Script/Engine.EdGraph'\"/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N\"'`
    )

    value = grammar.parse(
        `EdGraphPin'"K2Node_CommutativeAssociativeBinaryOperator_152.EdGraphPin_4045"'`
    )
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity(
        "EdGraphPin",
        "K2Node_CommutativeAssociativeBinaryOperator_152.EdGraphPin_4045",
    ))
    expect(value.serialize()).toEqual(
        String.raw`EdGraphPin'"K2Node_CommutativeAssociativeBinaryOperator_152.EdGraphPin_4045"'`
    )
    expect(value.serialize(true)).toEqual(
        String.raw`EdGraphPin'\"K2Node_CommutativeAssociativeBinaryOperator_152.EdGraphPin_4045\"'`
    )

    value = grammar.parse(
        `Function'"/Game/Mods/CrazyDinos/ElementalDragon/CDElementalDragon_Character_BP.SKEL_CDElementalDragon_Character_BP_C:ROS Change Element"'`
    )
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity(
        "Function",
        "/Game/Mods/CrazyDinos/ElementalDragon/CDElementalDragon_Character_BP.SKEL_CDElementalDragon_Character_BP_C:ROS Change Element",
    ))
    expect(value.serialize()).toEqual(
        String.raw`Function'"/Game/Mods/CrazyDinos/ElementalDragon/CDElementalDragon_Character_BP.SKEL_CDElementalDragon_Character_BP_C:ROS Change Element"'`
    )
    expect(value.serialize(true)).toEqual(
        String.raw`Function'\"/Game/Mods/CrazyDinos/ElementalDragon/CDElementalDragon_Character_BP.SKEL_CDElementalDragon_Character_BP_C:ROS Change Element\"'`
    )

    value = grammar.parse(`EdGraph'/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value.equals(new ObjectReferenceEntity(
        "EdGraph",
        "/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch",
    ))).toBeTruthy()
    expect(value.equals(new ObjectReferenceEntity(
        "EdGraph",
        "/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch1",
    ))).toBeFalsy()
    expect(value).toEqual(new ObjectReferenceEntity(
        "EdGraph",
        "/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch",
    ))
    expect(value.serialize(false)).toEqual(`EdGraph'/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch'`)
    expect(value.serialize(true)).toEqual(`EdGraph'/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch'`)

    value = grammar.parse(`/Script/Engine.EdGraph'"+-Weird/2,Macro"'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("/Script/Engine.EdGraph", "+-Weird/2,Macro"))
    expect(value.serialize(false)).toEqual(String.raw`/Script/Engine.EdGraph'"+-Weird/2,Macro"'`)
    expect(value.serialize(true)).toEqual(String.raw`/Script/Engine.EdGraph'\"+-Weird/2,Macro\"'`)

    value = grammar.parse(`/Script/BlueprintGraph.K2Node_VariableGet`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("/Script/BlueprintGraph.K2Node_VariableGet", ""))
    expect(value.serialize()).toEqual(`/Script/BlueprintGraph.K2Node_VariableGet`)

    value = grammar.parse(
        `/Script/Engine.MaterialExpressionMaterialFunctionCall'MaterialExpressionMaterialFunctionCall_0'`
    )
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity(
        "/Script/Engine.MaterialExpressionMaterialFunctionCall",
        "MaterialExpressionMaterialFunctionCall_0",
    ))
    expect(value.serialize()).toEqual(
        `/Script/Engine.MaterialExpressionMaterialFunctionCall'MaterialExpressionMaterialFunctionCall_0'`
    )

    value = grammar.parse(
        `/Script/Engine.MaterialExpressionMaterialFunctionCall'/Engine/Transient.Material_0:MaterialGraph_0.MaterialGraphNode_3.MaterialExpressionMaterialFunctionCall_0'`
    )
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity(
        "/Script/Engine.MaterialExpressionMaterialFunctionCall",
        "/Engine/Transient.Material_0:MaterialGraph_0.MaterialGraphNode_3.MaterialExpressionMaterialFunctionCall_0",
    ))
    expect(value.serialize()).toEqual(
        `/Script/Engine.MaterialExpressionMaterialFunctionCall'/Engine/Transient.Material_0:MaterialGraph_0.MaterialGraphNode_3.MaterialExpressionMaterialFunctionCall_0'`
    )

    value = grammar.parse(`/Script/CoreUObject.Class'"/Script/Engine.GameModeBase"'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity(
        "/Script/CoreUObject.Class",
        "/Script/Engine.GameModeBase",
    ))
    expect(value.serialize()).toEqual(`/Script/CoreUObject.Class'"/Script/Engine.GameModeBase"'`)

    value = grammar.parse(`"/Game/_YukiritoLib/Textures/T_紫色渐变01.T_紫色渐变01"`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("/Game/_YukiritoLib/Textures/T_紫色渐变01.T_紫色渐变01"))
})

test("PinEntity", () => {
    const grammar = PinEntity.grammar
    const s = `Pin (PinId=370DE2594FC6D3DF81672491D09FA4F2,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_ComponentBoundEvent_2 CA668D354E07DD5D3FDF828A8DCB31E2,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)`
    let value = grammar.parse(s)
    expect(value).toBeInstanceOf(PinEntity)
    expect(value.PinId).toBeInstanceOf(GuidEntity)
    expect(value.PinId.equals(new GuidEntity("370DE2594FC6D3DF81672491D09FA4F2"))).toBeTruthy()
    expect(value.PinName).toBeInstanceOf(StringEntity)
    expect(value.PinName.equals(new StringEntity("execute"))).toBeTruthy()
    expect(value.PinType).toBeInstanceOf(PinTypeEntity)
    expect(value.PinType.PinCategory).toBeInstanceOf(StringEntity)
    expect(value.PinType.PinCategory.equals(new StringEntity("exec"))).toBeTruthy()
    expect(value.PinType.PinSubCategory).toBeInstanceOf(StringEntity)
    expect(value.PinType.PinSubCategory.equals(new StringEntity(""))).toBeTruthy()
    expect(value.PinType.PinSubCategoryObject).toBeInstanceOf(ObjectReferenceEntity)
    expect(value.PinType.PinSubCategoryObject.equals(ObjectReferenceEntity.createNoneInstance())).toBeTruthy()
    expect(value.PinType.bIsReference).toBeInstanceOf(BooleanEntity)
    expect(value.PinType.bIsReference.equals(new BooleanEntity(false))).toBeTruthy()
    expect(value.serialize()).toEqual(s)
})

test("SimpleSerializationRotatorEntity", () => {
    const grammar = SimpleSerializationRotatorEntity.grammar
    {
        let value = grammar.parse("0, 0, 0")
        expect(value).toBeInstanceOf(SimpleSerializationRotatorEntity)
        expect(value).toEqual(new SimpleSerializationRotatorEntity({
            R: new NumberEntity(0),
            P: new NumberEntity(0),
            Y: new NumberEntity(0),
        }))
        expect(value.equals(new SimpleSerializationRotatorEntity({
            R: new NumberEntity(0),
            P: new NumberEntity(0),
            Y: new NumberEntity(0),
        }))).toBeTruthy()
        expect(value.equals(new RotatorEntity({
            R: new NumberEntity(0),
            P: new NumberEntity(0),
            Y: new NumberEntity(0),
        }))).toBeTruthy()
        expect(value.equals(new SimpleSerializationRotatorEntity({
            R: new NumberEntity(0),
            P: new NumberEntity(0),
            Y: new NumberEntity(0.1),
        }))).toBeFalsy()
        expect(value.equals(new RotatorEntity({
            R: new NumberEntity(0),
            P: new NumberEntity(0.5),
            Y: new NumberEntity(0),
        }))).toBeFalsy()
        expect(value.serialize()).toEqual("0, 0, 0")
    }
    {
        let value = grammar.parse("0.65, 1.0, 0.99")
        expect(value).toEqual(new SimpleSerializationRotatorEntity({
            P: new NumberEntity(0.65),
            Y: new NumberEntity(1.0),
            R: new NumberEntity(0.99),
        }))
        expect(value.equals(new SimpleSerializationRotatorEntity({
            P: new NumberEntity(0.651),
            Y: new NumberEntity(1.0),
            R: new NumberEntity(0.99),
        }))).toBeFalsy()
        expect(value.serialize()).toEqual("0.65, 1.0, 0.99")
    }
    {
        let value = grammar.parse("7.1000,6.00,5.990000")
        expect(value).toEqual(new SimpleSerializationRotatorEntity({
            P: new NumberEntity(7.1),
            Y: new NumberEntity(6),
            R: new NumberEntity(5.99),
        }))
        expect(value.serialize("true")).toEqual("7.1000, 6.00, 5.990000")
    }
    {
        let value = grammar.parse("-1.0,-2.00,-3.000")
        expect(value).toEqual(new SimpleSerializationRotatorEntity({
            P: new NumberEntity(-1),
            Y: new NumberEntity(-2),
            R: new NumberEntity(-3),
        }))
        expect(value.serialize("true")).toEqual("-1.0, -2.00, -3.000")
    }
})

test("SimpleSerializationVector2DEntity", () => {
    const grammar = SimpleSerializationVector2DEntity.grammar
    {
        let value = grammar.parse("0, 0")
        expect(value).toBeInstanceOf(SimpleSerializationVector2DEntity)
        expect(value.equals(new SimpleSerializationVector2DEntity({
            X: new NumberEntity(0),
            Y: new NumberEntity(0),
        }))).toBeTruthy()
        expect(value).toEqual(new SimpleSerializationVector2DEntity({
            X: new NumberEntity(0),
            Y: new NumberEntity(0),
        }))
        expect(value.serialize()).toEqual("0, 0")
    }
    {
        let value = grammar.parse("127.8000, 13.3")
        expect(value).toBeInstanceOf(SimpleSerializationVector2DEntity)
        expect(value.equals(new SimpleSerializationVector2DEntity({
            X: new NumberEntity(127.8),
            Y: new NumberEntity(13.3),
        }))).toBeTruthy()
        expect(value).toEqual(new SimpleSerializationVector2DEntity({
            X: new NumberEntity(127.8),
            Y: new NumberEntity(13.3),
        }))
        expect(value.serialize()).toEqual("127.8000, 13.3")
    }
    {
        let value = grammar.parse("5,0")
        expect(value).toBeInstanceOf(SimpleSerializationVector2DEntity)
        expect(value.equals(new SimpleSerializationVector2DEntity({
            X: new NumberEntity(5),
            Y: new NumberEntity(0),
        }))).toBeTruthy()
        expect(value).toEqual(new SimpleSerializationVector2DEntity({
            X: new NumberEntity(5),
            Y: new NumberEntity(0),
        }))
        expect(value.serialize()).toEqual("5, 0")
    }
})

test("SimpleSerializationVectorEntity", () => {
    const grammar = SimpleSerializationVectorEntity.grammar
    {
        let value = grammar.parse("0, 0, 0")
        expect(value).toBeInstanceOf(SimpleSerializationVectorEntity)
        expect(value.equals(new SimpleSerializationVectorEntity({
            X: new NumberEntity(0),
            Y: new NumberEntity(0),
            Z: new NumberEntity(0),
        }))).toBeTruthy()
        expect(value).toEqual(new SimpleSerializationVectorEntity({
            X: new NumberEntity(0),
            Y: new NumberEntity(0),
            Z: new NumberEntity(0),
        }))
        expect(value.serialize()).toEqual("0, 0, 0")
    }
    {
        let value = grammar.parse("1001, 56.4, 0.5")
        expect(value).toBeInstanceOf(SimpleSerializationVectorEntity)
        expect(value.equals(new SimpleSerializationVectorEntity({
            X: new NumberEntity(1001),
            Y: new NumberEntity(56.4),
            Z: new NumberEntity(0.5),
        }))).toBeTruthy()
        expect(value).toEqual(new SimpleSerializationVectorEntity({
            X: new NumberEntity(1001),
            Y: new NumberEntity(56.4),
            Z: new NumberEntity(0.5),
        }))
        expect(value.serialize(true)).toEqual("1001, 56.4, 0.5")
    }
    {
        let value = grammar.parse("-1.0,-2.00,-3.000")
        expect(value).toBeInstanceOf(SimpleSerializationVectorEntity)
        expect(value.equals(new SimpleSerializationVectorEntity({
            X: new NumberEntity(-1),
            Y: new NumberEntity(-2),
            Z: new NumberEntity(-3),
        }))).toBeTruthy()
        expect(value).toEqual(new SimpleSerializationVectorEntity({
            X: new NumberEntity(-1),
            Y: new NumberEntity(-2),
            Z: new NumberEntity(-3),
        }))
        expect(value.serialize()).toEqual("-1.0, -2.00, -3.000")
    }
})

test("StringEntity", () => {
    const grammar = StringEntity.grammar
    {
        let value = grammar.parse('""')
        expect(value).toBeInstanceOf(StringEntity)
        expect(value).toEqual(new StringEntity(""))
        expect(value.serialize()).toEqual(`""`)
        expect(value.serialize(true)).toEqual(String.raw`\"\"`)
        expect(value.equals(new StringEntity(""))).toBeTruthy()
        expect(value.equals(new StringEntity("1"))).toBeFalsy()
        expect(value.valueOf()).toEqual("")
        expect(value.toString()).toEqual("")
    }
    {
        let value = grammar.parse('"hello"')
        expect(value).toEqual(new StringEntity("hello"))
        expect(value.serialize()).toEqual(`"hello"`)
        expect(value.serialize(true)).toEqual(String.raw`\"hello\"`)
        expect(value.equals(new StringEntity("hello"))).toBeTruthy()
        expect(value.equals(new SymbolEntity("hello"))).toBeFalsy()
        expect(value.equals(new NumberEntity())).toBeFalsy()
        expect(value.valueOf()).toEqual("hello")
        expect(value.toString()).toEqual("hello")
    }
    {
        let value = grammar.parse('"hello world 123 - éèàò@ç ^ ^^^"')
        expect(value).toEqual(new StringEntity("hello world 123 - éèàò@ç ^ ^^^"))
        expect(value.serialize()).toEqual(`"hello world 123 - éèàò@ç ^ ^^^"`)
        expect(value.serialize(true)).toEqual(String.raw`\"hello world 123 - éèàò@ç ^ ^^^\"`)
        expect(value.equals(new StringEntity("hello world 123 - éèàò@ç ^ ^^^"))).toBeTruthy()
        expect(value.equals(new StringEntity("hello world 123 - éèàò@ç ^ ^^^-"))).toBeFalsy()
        expect(value.valueOf()).toEqual("hello world 123 - éèàò@ç ^ ^^^")
        expect(value.toString()).toEqual("hello world 123 - éèàò@ç ^ ^^^")
    }
    {
        let value = grammar.parse(String.raw`"a:\"hello\", b:\"word is \\\"world\\\"\""`)
        expect(value).toEqual(new StringEntity(String.raw`a:"hello", b:"word is \"world\""`))
        expect(value.serialize(false)).toEqual(String.raw`"a:\"hello\", b:\"word is \\\"world\\\"\""`)
        expect(value.serialize(true)).toEqual(String.raw`\"a:\\\"hello\\\", b:\\\"word is \\\\\\\"world\\\\\\\"\\\"\"`)
        expect(value.equals(new StringEntity(String.raw`a:"hello", b:"word is \"world\""`))).toBeTruthy()
        expect(value.equals(new NumberEntity())).toBeFalsy()
        expect(value.valueOf()).toEqual(String.raw`a:"hello", b:"word is \"world\""`)
        expect(value.toString()).toEqual(String.raw`a:"hello", b:"word is \"world\""`)
    }
    expect(() => grammar.parse("Hello")).toThrow()
})

test("UnknownKeysValue", () => {
    const parser = IEntity.unknownEntityGrammar
    expect(parser.parse('"Hello"')).toBeInstanceOf(StringEntity)
    expect(parser.parse("()")).toBeInstanceOf(NullEntity)
    expect(parser.parse("8345")).toBeInstanceOf(NumberEntity)
    expect(parser.parse("True")).toBeInstanceOf(BooleanEntity)
    expect(parser.parse("False")).toBeInstanceOf(BooleanEntity)
    expect(parser.parse("F0223D3742E67C0D9FEFB2A64946B7F0")).toBeInstanceOf(GuidEntity)
    expect(parser.parse("SYMBOL1")).toBeInstanceOf(SymbolEntity)
    expect(parser.parse("Symbol_2_3_4")).toBeInstanceOf(SymbolEntity)
    expect(parser.parse("(X=-0.495,Y=+765.0,Z=7,W=56)")).toBeInstanceOf(Vector4DEntity)
    expect(parser.parse("(X=-0.495,  Y=0, )")).toBeInstanceOf(Vector2DEntity)
    expect(parser.parse("(X=-0.495,Y=+765.0,Z=7)")).toBeInstanceOf(VectorEntity)
    expect(parser.parse("(R=1.000000,P=7.6,Y=+88.99)")).toBeInstanceOf(RotatorEntity)
    expect(parser.parse("(R=0.000000,G=0.660000,B=1.000000,A=1.000000)")).toBeInstanceOf(LinearColorEntity)
    expect(parser.parse(`Class'"/Script/Engine.KismetSystemLibrary"'`)).toBeInstanceOf(ObjectReferenceEntity)
    expect(parser.parse("(1,2,3,4,5,6,7,8,9)")).toBeInstanceOf(ArrayEntity)
    expect(parser.parse(`("Hello", "World",)`)).toBeInstanceOf(ArrayEntity)
    expect(parser.parse(`("Alpha", 123, Beta, "Gamma", "Delta", 99)`)).toBeInstanceOf(ArrayEntity)
})

test("UnknownKeysEntity", () => {
    const grammar = UnknownKeysEntity.grammar
    {
        let value = grammar.parse('LookbehindValue(FirstKey=1,SecondKey=SOME_SYMBOL2,ThirdKey="Hello")')
        expect(value).toBeInstanceOf(UnknownKeysEntity)
        expect(value).toEqual(new UnknownKeysEntity({
            lookbehind: "LookbehindValue",
            FirstKey: new NumberEntity(1),
            SecondKey: new SymbolEntity("SOME_SYMBOL2"),
            ThirdKey: new StringEntity("Hello"),
        }))
        expect(value.equals(new UnknownKeysEntity({
            lookbehind: "LookbehindValue",
            FirstKey: new NumberEntity(1),
            SecondKey: new SymbolEntity("SOME_SYMBOL2"),
            ThirdKey: new StringEntity("Hello"),
        }))).toBeTruthy()
        expect(value.equals(new UnknownKeysEntity({
            lookbehind: "LookbehindValue modified",
            FirstKey: new NumberEntity(1),
            SecondKey: new SymbolEntity("SOME_SYMBOL2"),
            ThirdKey: new StringEntity("Hello"),
        }))).toBeFalsy()
        expect(value.equals(new UnknownKeysEntity({
            lookbehind: "LookbehindValue",
            FirstKey: new NumberEntity(1),
            SecondKey: new StringEntity("SOME_SYMBOL2"),
            ThirdKey: new StringEntity("Hello"),
        }))).toBeFalsy
        expect(value.serialize()).toEqual('LookbehindValue(FirstKey=1,SecondKey=SOME_SYMBOL2,ThirdKey="Hello")')
        expect(value.serialize(true)).toEqual(
            String.raw`LookbehindValue(FirstKey=1,SecondKey=SOME_SYMBOL2,ThirdKey=\"Hello\")`
        )
    }
    {
        let value = grammar.parse('(A = (-1,-2,-3),  B = SomeFunction(B1 = "b1", B2 = (X=101,Y=102,Z=103)))')
        expect(value).toBeInstanceOf(UnknownKeysEntity)
        expect(value).toEqual(new UnknownKeysEntity({
            A: new ArrayEntity([new NumberEntity(-1), new NumberEntity(-2), new NumberEntity(-3)]),
            B: new UnknownKeysEntity({
                lookbehind: "SomeFunction",
                B1: new StringEntity("b1"),
                B2: new VectorEntity({ X: new NumberEntity(101), Y: new NumberEntity(102), Z: new NumberEntity(103) }),
            }),
        }))
        expect(value.equals(new UnknownKeysEntity({
            A: new ArrayEntity([new NumberEntity(-1), new NumberEntity(-2), new NumberEntity(-3)]),
            B: new UnknownKeysEntity({
                lookbehind: "SomeFunction",
                B1: new StringEntity("b1"),
                B2: new VectorEntity({ X: new NumberEntity(101), Y: new NumberEntity(102), Z: new NumberEntity(103) }),
            }),
        }))).toBeTruthy()
        expect(value.equals(new UnknownKeysEntity({
            A: new ArrayEntity([new NumberEntity(-1), new NumberEntity(-2), new NumberEntity(-3)]),
            B: new UnknownKeysEntity({
                lookbehind: "SomeFunction",
                B1: new StringEntity("b1"),
                B2: new VectorEntity({ X: new IntegerEntity(101), Y: new NumberEntity(102), Z: new ByteEntity(103) }),
            }),
        }))).toBeTruthy()
        expect(value.equals(new UnknownKeysEntity({
            A: new ArrayEntity([new NumberEntity(-1), new NumberEntity(-2), new NumberEntity(-3)]),
            B: new UnknownKeysEntity({
                lookbehind: "SomeFunction",
                B1: new StringEntity("b2"),
                B2: new VectorEntity({ X: new NumberEntity(101), Y: new NumberEntity(102), Z: new NumberEntity(103) }),
            }),
        }))).toBeFalsy()
        expect(value.equals(new UnknownKeysEntity({
            A: new ArrayEntity([new NumberEntity(-1), new NumberEntity(-2), new NumberEntity(-3)]),
            B: new UnknownKeysEntity({
                lookbehind: "SomeFunction",
                B1: new StringEntity("b1"),
                B2: new VectorEntity({ X: new NumberEntity(101), Y: new NumberEntity(-102), Z: new NumberEntity(103) }),
            }),
        }))).toBeFalsy()
        expect(value.serialize()).toEqual('(A=(-1,-2,-3),B=SomeFunction(B1="b1",B2=(X=101,Y=102,Z=103)))')
        expect(value.serialize(true)).toEqual(String.raw`(A=(-1,-2,-3),B=SomeFunction(B1=\"b1\",B2=(X=101,Y=102,Z=103)))`)
    }
    expect(() => grammar.parse('LookbehindValue(FirstKey=1,SecondKey=SOME_SYMBOL2,ThirdKey="Hello)')).toThrow("Could not parse")
    expect(() => grammar.parse('LookbehindValue(FirstKey=1,SecondKey=SOME_SYMBOL2,ThirdKey="Hello"')).toThrow("Could not parse")
})

test("VectorEntity", () => {
    const grammar = VectorEntity.grammar
    {
        let value = grammar.parse("(X=1,Y=2,Z=3.500)")
        expect(value).toBeInstanceOf(VectorEntity)
        expect(value).toEqual(new VectorEntity({
            X: new NumberEntity(1),
            Y: new NumberEntity(2),
            Z: new NumberEntity(3.5),
        }))
        expect(value.toArray()).toStrictEqual([1, 2, 3.5])
        expect(value.equals(new VectorEntity({
            X: new NumberEntity(1),
            Y: new NumberEntity(2),
            Z: new NumberEntity(3.5),
        }))).toBeTruthy()
        expect(value.equals(new VectorEntity({
            X: new NumberEntity(1),
            Y: new NumberEntity(2),
            Z: new NumberEntity(3.5),
            w: new NumberEntity(7),
        }))).toBeFalsy()
        expect(value.serialize()).toEqual("(X=1,Y=2,Z=3.500)")
        expect(value.serialize(true)).toEqual("(X=1,Y=2,Z=3.500)")
    }
    {
        let value = grammar.parse("(X=10,Y=+20.880,Z=-30.54,)")
        expect(value).toBeInstanceOf(VectorEntity)
        expect(value).toEqual(new VectorEntity({
            X: new NumberEntity(10),
            Y: new NumberEntity(20.88),
            Z: new NumberEntity(-30.54),
        }))
        expect(value.equals(new VectorEntity({
            X: new NumberEntity(10),
            Y: new NumberEntity(20.88),
            Z: new NumberEntity(-30.54),
        }))).toBeTruthy()
        expect(value.serialize()).toEqual("(X=10,Y=20.880,Z=-30.54,)")
    }
    {
        let value = grammar.parse(`(
            Z = -3.66,

            X
            = -0, Y =


        -2
            ,
        )`)
        expect(value).toBeInstanceOf(VectorEntity)
        expect(value).toEqual(new VectorEntity({
            X: new NumberEntity(0),
            Y: new NumberEntity(-2),
            Z: new NumberEntity(-3.66),
        }))
        expect(value.toArray()).toStrictEqual([0, -2, -3.66])
        expect(value.equals(new VectorEntity({
            X: new NumberEntity(0),
            Y: new NumberEntity(-2),
            Z: new NumberEntity(-3.66),
        }))).toBeTruthy()
        expect(value.equals(new VectorEntity({
            X: new NumberEntity(-0),
            Y: new NumberEntity(-2.01),
            Z: new NumberEntity(-3.66),
        }))).toBeFalsy()
        expect(value.equals(new VectorEntity({
            X: new NumberEntity(-0),
            Y: new NumberEntity(-2),
            Z: new NumberEntity(-3.65),
        }))).toBeFalsy()
        expect(value.serialize()).toEqual("(Z=-3.66,X=0,Y=-2,)")
    }
    expect(() => grammar.parse("(X=1,Y=\"2\",Z=3)")).toThrow("Could not parse")
    expect(() => grammar.parse("(X=1,Z=3)")).toThrow("Could not parse")
})

test("Vector2DEntity", () => {
    const grammar = Vector2DEntity.grammar
    {
        const value = grammar.parse("(X=78,Y=56.3)")
        expect(value).toBeInstanceOf(Vector2DEntity)
        expect(value).toEqual(new Vector2DEntity({
            X: new NumberEntity(78),
            Y: new NumberEntity(56.3),
        }))
        expect(value.toArray()).toStrictEqual([78, 56.3])
        expect(value.equals(new Vector2DEntity({
            X: new NumberEntity(78),
            Y: new NumberEntity(56.3),
        }))).toBeTruthy()
        expect(value.serialize(true)).toEqual("(X=78,Y=56.3)")
    }
    {
        const value = grammar.parse("(X=+4.5,Y=-8.88,)")
        expect(value).toBeInstanceOf(Vector2DEntity)
        expect(value).toEqual(new Vector2DEntity({
            X: new NumberEntity(4.5),
            Y: new NumberEntity(-8.88),
        }))
        expect(value.equals(new Vector2DEntity({
            X: new IntegerEntity(4.5),
            Y: new NumberEntity(-8.88),
        }))).toBeFalsy()
    }
    {
        const value = grammar.parse(`(
            Y = +93.004000,

            X
            = 0,
        )`)
        expect(value).toBeInstanceOf(Vector2DEntity)
        expect(value).toEqual(new Vector2DEntity({
            X: new NumberEntity(0),
            Y: new NumberEntity(93.004),
        }))
        expect(value.equals(new Vector2DEntity({
            X: new NumberEntity(0),
            Y: new NumberEntity(93.004),
        }))).toBeTruthy()
        expect(value.serialize()).toEqual("(Y=93.004000,X=0,)")
    }
    expect(() => grammar.parse("(X=1,Y=2")).toThrow("Could not parse")
    expect(() => grammar.parse("(X=1,Y=\"2\")")).toThrow("Could not parse")
    expect(() => grammar.parse("(X=1)")).toThrow("Could not parse")
})
