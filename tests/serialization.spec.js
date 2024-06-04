import { expect, test } from "@playwright/test"
import Utility from "../js/Utility.js"
import AlternativesEntity from "../js/entity/AlternativesEntity.js"
import ArrayEntity from "../js/entity/ArrayEntity.js"
import BooleanEntity from "../js/entity/BooleanEntity.js"
import ColorChannelEntity from "../js/entity/ColorChannelEntity.js"
import FormatTextEntity from "../js/entity/FormatTextEntity.js"
import GuidEntity from "../js/entity/GuidEntity.js"
import IEntity from "../js/entity/IEntity.js"
import IntegerEntity from "../js/entity/IntegerEntity.js"
import KeyBindingEntity from "../js/entity/KeyBindingEntity.js"
import LinearColorEntity from "../js/entity/LinearColorEntity.js"
import NaturalNumberEntity from "../js/entity/NaturalNumberEntity.js"
import NullEntity from "../js/entity/NullEntity.js"
import NumberEntity from "../js/entity/NumberEntity.js"
import ObjectReferenceEntity from "../js/entity/ObjectReferenceEntity.js"
import PinEntity from "../js/entity/PinEntity.js"
import RotatorEntity from "../js/entity/RotatorEntity.js"
import SimpleSerializationRotatorEntity from "../js/entity/SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "../js/entity/SimpleSerializationVector2DEntity.js"
import SimpleSerializationVectorEntity from "../js/entity/SimpleSerializationVectorEntity.js"
import StringEntity from "../js/entity/StringEntity.js"
import SymbolEntity from "../js/entity/SymbolEntity.js"
import UnknownKeysEntity from "../js/entity/UnknownKeysEntity.js"
import Vector2DEntity from "../js/entity/Vector2DEntity.js"
import VectorEntity from "../js/entity/VectorEntity.js"
import SerializerFactory from "../js/serialization/SerializerFactory.js"
import initializeSerializerFactory from "../js/serialization/initializeSerializerFactory.js"
import { Exception } from "sass"
import ByteEntity from "../js/entity/ByteEntity.js"
import Vector4DEntity from "../js/entity/Vector4DEntity.js"

test.beforeAll(() => initializeSerializerFactory())

test.describe.configure({ mode: "parallel" })

test("ArrayEntity", () => {
    {
        const grammar = ArrayEntity.grammar
        let value = grammar.parse("()")
        expect(value).toEqual(new ArrayEntity([]))
        expect(value.toString()).toEqual("()")
        value = grammar.parse("( )")
        expect(value).toEqual(new ArrayEntity([]))
        expect(value.toString()).toEqual("()")
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
        expect(value.toString()).toEqual("(1,2,3,4,5,6)")
        expect(value.Self().className()).toEqual("ArrayEntity")
        value.values.map(v => v.Self().className()).forEach(v => expect(v).toEqual("NumberEntity"))
        value = grammar.parse("(1, 2, )")
        expect(value).toEqual(new ArrayEntity([
            new NumberEntity(1),
            new NumberEntity(2),
        ]))
        expect(value.toString()).toEqual("(1,2,)")
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
        expect(value.toString()).toEqual("(2,4,6,8)")
    }
    {
        const grammar = ArrayEntity.of(IntegerEntity).grammar
        let value = grammar.parse("(-0, -1, -2)")
        expect(value).toEqual(new ArrayEntity([
            new IntegerEntity(0),
            new IntegerEntity(-1),
            new IntegerEntity(-2),
        ]))
        expect(value.toString()).toEqual("(0,-1,-2)")
        value.values.map(v => v.Self().className()).forEach(v => expect(v).toEqual("IntegerEntity"))
        value = grammar.parse("(-0, -1, -2,)")
        expect(value).toEqual(new ArrayEntity([
            new IntegerEntity(0),
            new IntegerEntity(-1),
            new IntegerEntity(-2),
        ]))
        expect(value.toString()).toEqual("(0,-1,-2,)")
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
        expect(value.toString()).toEqual('("alpha","beta",123,3BEF2168446CAA32D5B54289FAB2F0BA,Some(a=1,b="number:\\"2\\""))')
        expect(value.values.map(v => v.Self().className())).toEqual([
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
        expect(value.toString()).toEqual('(A(first=(9,8,7,6,5),second=00000000000000000000000000000000),B(key="hello"),)')
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
        expect(value.toString()).toEqual("((1,2),(3,4),5)")
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
        expect(value.toString()).toEqual('(((1,"2"),(3,4)),"5")')
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
        expect(value.toString()).toEqual("(One(a=(1,(2,(3,(4)))),b=()),)")
    }
})

test("Boolean", () => {
    let grammar = BooleanEntity.grammar

    let value = grammar.parse("true")
    expect(value).toBeInstanceOf(BooleanEntity)
    expect(value).toEqual(new BooleanEntity(true))
    expect(value.toString()).toEqual("true")
    expect(value.equals(new (BooleanEntity.withDefault().flagNullable())(true))).toBeTruthy()

    value = grammar.parse("True")
    expect(value).toBeInstanceOf(BooleanEntity)
    expect(value).toEqual(new BooleanEntity(true))
    expect(value.toString()).toEqual("True")
    expect(value.equals(new BooleanEntity(true))).toBeTruthy()
    expect(value.equals(new BooleanEntity(false))).toBeFalsy()

    value = grammar.parse("false")
    expect(value).toBeInstanceOf(BooleanEntity)
    expect(value).toEqual(new BooleanEntity(false))
    expect(value.toString()).toEqual("false")

    value = grammar.parse("False")
    expect(value).toBeInstanceOf(BooleanEntity)
    expect(value).toEqual(new BooleanEntity(false))
    expect(value.toString()).toEqual("False")
    expect(() => grammar.parse("truee")).toThrow("Could not parse")
})

test("FormatTextEntity", () => {
    let grammar = FormatTextEntity.grammar

    let value = grammar.parse('LOCGEN_FORMAT_NAMED(NSLOCTEXT("KismetSchema",   "SplitPinFriendlyNameFormat",  "{PinDisplayName} {ProtoPinDisplayName}"),   "PinDisplayName", "Out Hit", "ProtoPinDisplayName", "Blocking Hit")')
    expect(value.print()).toEqual("Out Hit Blocking Hit")
    expect(value.toString())
        .toEqual('LOCGEN_FORMAT_NAMED(NSLOCTEXT("KismetSchema", "SplitPinFriendlyNameFormat", "{PinDisplayName} {ProtoPinDisplayName}"), "PinDisplayName", "Out Hit", "ProtoPinDisplayName", "Blocking Hit")')

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
    expect(value.print())
        .toEqual(`If InRangeMin = InRangeMax, then that density value is mapped to the average of OutRangeMin and OutRangeMax\nAttribute type is "float" and its exact name is "InRangeMin"`)
    expect(value.toString())
        .toEqual(String.raw`LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "If InRangeMin = InRangeMax, then that density value is mapped to the average of OutRangeMin and OutRangeMax\n", "float", "InRangeMin")`)
    expect(() => grammar.parse("LOCGEN_FORMAT_NAMED")).toThrow("Could not parse")
})

test("GuidEntity", () => {
    let grammar = GuidEntity.flagInlined().grammar

    let value = grammar.parse("0556a3ecabf648d0a5c07b2478e9dd32")
    expect(value).toBeInstanceOf(GuidEntity)
    expect(value).toEqual(new GuidEntity("0556a3ecabf648d0a5c07b2478e9dd32"))
    expect(value.equals(new GuidEntity("0556a3ecabf648d0a5c07b2478e9dd32"))).toBeTruthy()
    expect(value.equals(new (GuidEntity.withDefault().flagInlined())("0556a3ecabf648d0a5c07b2478e9dd32"))).toBeTruthy()
    expect(value.equals(new (GuidEntity.withDefault().flagInlined())("0556a3ecabf648d0a5c07b2478e9dd33"))).toBeFalsy()
    expect(value.toString()).toEqual("0556a3ecabf648d0a5c07b2478e9dd32")

    value = grammar.parse("64023BC344E0453DBB583FAC411489BC")
    expect(value).toBeInstanceOf(GuidEntity)
    expect(value).toEqual(new GuidEntity("64023BC344E0453DBB583FAC411489BC"))
    expect(value.toString()).toEqual("64023BC344E0453DBB583FAC411489BC")

    value = grammar.parse("6edC4a425ca948da8bC78bA52DED6C6C")
    expect(value).toBeInstanceOf(GuidEntity)
    expect(value).toEqual(new GuidEntity("6edC4a425ca948da8bC78bA52DED6C6C"))
    expect(value.toString()).toEqual("6edC4a425ca948da8bC78bA52DED6C6C")

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
    expect(value.toString()).toEqual("0")

    value = grammar.parse("+0")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(0))
    expect(value.toString()).toEqual("0")

    value = grammar.parse("-0")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(0))
    expect(value.toString()).toEqual("0")

    value = grammar.parse("99")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(99))
    expect(value.toString()).toEqual("99")

    value = grammar.parse("-8685")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(-8685))
    expect(value.toString()).toEqual("-8685")

    value = grammar.parse("+555")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(555))
    expect(value.toString()).toEqual("555")

    value = grammar.parse("1000000000")
    expect(value).toBeInstanceOf(IntegerEntity)
    expect(value).toEqual(new IntegerEntity(1000000000))
    expect(value.toString()).toEqual("1000000000")

    expect(() => grammar.parse("1.2").value).toThrow()
})

test("KeyBindingEntity", () => {
    let grammar = KeyBindingEntity.grammar

    let value = grammar.parse("A")
    expect(value).toBeInstanceOf(KeyBindingEntity)
    expect(value).toEqual(new KeyBindingEntity({ Key: new SymbolEntity("A") }))
    expect(value.toString()).toEqual("(Key=A)")

    value = grammar.parse("(bCtrl=True,Key=A)")
    expect(value).toBeInstanceOf(KeyBindingEntity)
    expect(value).toEqual(new KeyBindingEntity({ bCtrl: new BooleanEntity(true), Key: new SymbolEntity("A") }))
    expect(value.toString()).toEqual("(bCtrl=True,Key=A)")

    value = grammar.parse("(bCtrl=false, bShift=false,bCmd=true,bAlt=false,Key=X)")
    expect(value).toBeInstanceOf(KeyBindingEntity)
    expect(value).toEqual(new KeyBindingEntity({
        bCtrl: new BooleanEntity(false),
        bShift: new BooleanEntity(false),
        bCmd: new BooleanEntity(true),
        bAlt: new BooleanEntity(false),
        Key: new SymbolEntity("X"),
    }))
    expect(value.toString()).toEqual("(bCtrl=false,bShift=false,bCmd=true,bAlt=false,Key=X)")

    value = grammar.parse("(       bCtrl=  false  \n,       Key \n\n\n  =Y ,bAlt=True     )")
    expect(value).toBeInstanceOf(KeyBindingEntity)
    expect(value).toEqual(new KeyBindingEntity({
        bCtrl: new BooleanEntity(false),
        Key: new SymbolEntity("Y"),
        bAlt: new BooleanEntity(true),
    }))
    expect(value.toString()).toEqual("(bCtrl=false,Key=Y,bAlt=True)")

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
    expect(value.toString()).toStrictEqual("(R=1.000000,G=1.000000,B=1.000000,A=1.000000)")

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
    expect(value.toString()).toStrictEqual("(R=1.000000,G=0.000000,B=0.000000,A=1.000000)")

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
    expect(value.toString()).toStrictEqual("(R=0.000000,G=0.660000,B=1.000000,A=1.000000)")

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

test("NullEntity", () => {
    const grammar = NullEntity.grammar
    let value = grammar.parse("()")
    expect(value).toBeInstanceOf(NullEntity)
    expect(value).toEqual(new NullEntity())
    expect(value.toString()).toEqual("()")
    expect(value.equals(new NullEntity())).toBeTruthy()
    expect(value.equals(new NumberEntity())).toBeFalsy()
    expect(value.equals(123)).toBeFalsy()
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
    expect(grammar.parse("0.05").value).toBeCloseTo(0.05, 0.00001)
    expect(grammar.parse("-999.666").value).toBeCloseTo(-999.666, 0.001)
    expect(grammar.parse("+45.454500").value).toBeCloseTo(45.4545, 0.001)
    expect(grammar.parse("+1000000000").value).toBeCloseTo(1E9, 0.1)
    expect(grammar.parse("1").toString()).toBe("1")
    expect(grammar.parse("1.000").toString()).toBe("1.000")
    expect(grammar.parse("+933.75500010").toString()).toBe("933.75500010")
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
    expect(value.toString()).toEqual("Class")

    value = grammar.parse(`Class'/Script/ShooterGame.ShooterGameMode'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("Class", "/Script/ShooterGame.ShooterGameMode"))
    expect(value.equals(new ObjectReferenceEntity("Class", "/Script/ShooterGame.ShooterGameMode"))).toBeTruthy()
    expect(value.equals(new ObjectReferenceEntity("Class1", "/Script/ShooterGame.ShooterGameMode"))).toBeFalsy()
    expect(value.equals(new ObjectReferenceEntity("Class", "/Script/ShooterGame.ShooterGameMode1"))).toBeFalsy()
    expect(value.toString()).toEqual(`Class'/Script/ShooterGame.ShooterGameMode'`)
    expect(value.toString(true)).toEqual(`Class'/Script/ShooterGame.ShooterGameMode'`)

    value = grammar.parse(`EdGraphPin'EdGraphPin_45417'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("EdGraphPin", "EdGraphPin_45417"))
    expect(value.toString()).toEqual(`EdGraphPin'EdGraphPin_45417'`)
    expect(value.toString(true)).toEqual(`EdGraphPin'EdGraphPin_45417'`)

    value = grammar.parse(`EdGraphPin'"K2Node_DynamicCast_2126.EdGraphPin_3990988"'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("EdGraphPin", "K2Node_DynamicCast_2126.EdGraphPin_3990988"))
    expect(value.toString()).toEqual(`EdGraphPin'"K2Node_DynamicCast_2126.EdGraphPin_3990988"'`)
    expect(value.toString(true)).toEqual(String.raw`EdGraphPin'\"K2Node_DynamicCast_2126.EdGraphPin_3990988\"'`)

    value = grammar.parse(
        `"/Script/Engine.MaterialExpressionMaterialFunctionCall'MaterialExpressionMaterialFunctionCall_0'"`
    )
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity(
        "/Script/Engine.MaterialExpressionMaterialFunctionCall",
        "MaterialExpressionMaterialFunctionCall_0",
    ))
    expect(value.toString(false)).toEqual(
        String.raw`"/Script/Engine.MaterialExpressionMaterialFunctionCall'MaterialExpressionMaterialFunctionCall_0'"`
    )
    expect(value.toString(true)).toEqual(
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
    expect(value.toString()).toEqual(
        String.raw`/Script/Engine.EdGraph'"/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N"'`
    )
    expect(value.toString(true)).toEqual(
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
    expect(value.toString()).toEqual(
        String.raw`EdGraphPin'"K2Node_CommutativeAssociativeBinaryOperator_152.EdGraphPin_4045"'`
    )
    expect(value.toString(true)).toEqual(
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
    expect(value.toString()).toEqual(
        String.raw`Function'"/Game/Mods/CrazyDinos/ElementalDragon/CDElementalDragon_Character_BP.SKEL_CDElementalDragon_Character_BP_C:ROS Change Element"'`
    )
    expect(value.toString(true)).toEqual(
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
    expect(value.toString(false)).toEqual(`EdGraph'/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch'`)
    expect(value.toString(true)).toEqual(`EdGraph'/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch'`)

    value = grammar.parse(`/Script/Engine.EdGraph'"+-Weird/2,Macro"'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("/Script/Engine.EdGraph", "+-Weird/2,Macro"))
    expect(value.toString(false)).toEqual(String.raw`/Script/Engine.EdGraph'"+-Weird/2,Macro"'`)
    expect(value.toString(true)).toEqual(String.raw`/Script/Engine.EdGraph'\"+-Weird/2,Macro\"'`)

    value = grammar.parse(`/Script/BlueprintGraph.K2Node_VariableGet`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("/Script/BlueprintGraph.K2Node_VariableGet", ""))
    expect(value.toString()).toEqual(`/Script/BlueprintGraph.K2Node_VariableGet`)

    value = grammar.parse(
        `/Script/Engine.MaterialExpressionMaterialFunctionCall'MaterialExpressionMaterialFunctionCall_0'`
    )
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity(
        "/Script/Engine.MaterialExpressionMaterialFunctionCall",
        "MaterialExpressionMaterialFunctionCall_0",
    ))
    expect(value.toString()).toEqual(
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
    expect(value.toString()).toEqual(
        `/Script/Engine.MaterialExpressionMaterialFunctionCall'/Engine/Transient.Material_0:MaterialGraph_0.MaterialGraphNode_3.MaterialExpressionMaterialFunctionCall_0'`
    )

    value = grammar.parse(`/Script/CoreUObject.Class'"/Script/Engine.GameModeBase"'`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity(
        "/Script/CoreUObject.Class",
        "/Script/Engine.GameModeBase",
    ))
    expect(value.toString()).toEqual(`/Script/CoreUObject.Class'"/Script/Engine.GameModeBase"'`)

    value = grammar.parse(`"/Game/_YukiritoLib/Textures/T_紫色渐变01.T_紫色渐变01"`)
    expect(value).toBeInstanceOf(ObjectReferenceEntity)
    expect(value).toEqual(new ObjectReferenceEntity("/Game/_YukiritoLib/Textures/T_紫色渐变01.T_紫色渐变01"))
})

test("PinEntity", () => {
    const serializer = SerializerFactory.getSerializer(PinEntity)

    expect(serializer.read("Pin (PinType.PinSubCategoryMemberReference=())")).toMatchObject({
        "PinType": { "PinSubCategoryMemberReference": null }
    })
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
        expect(value.toString()).toEqual("0, 0, 0")
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
        expect(value.toString()).toEqual("0.65, 1.0, 0.99")
    }
    {
        let value = grammar.parse("7.1000,6.00,5.990000")
        expect(value).toEqual(new SimpleSerializationRotatorEntity({
            P: new NumberEntity(7.1),
            Y: new NumberEntity(6),
            R: new NumberEntity(5.99),
        }))
        expect(value.toString("true")).toEqual("7.1000, 6.00, 5.990000")
    }
    {
        let value = grammar.parse("-1.0,-2.00,-3.000")
        expect(value).toEqual(new SimpleSerializationRotatorEntity({
            P: new NumberEntity(-1),
            Y: new NumberEntity(-2),
            R: new NumberEntity(-3),
        }))
        expect(value.toString("true")).toEqual("-1.0, -2.00, -3.000")
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
        expect(value.toString()).toEqual("0, 0")
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
        expect(value.toString()).toEqual("127.8000, 13.3")
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
        expect(value.toString()).toEqual("5, 0")
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
        expect(value.toString()).toEqual("0, 0, 0")
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
        expect(value.toString(true)).toEqual("1001, 56.4, 0.5")
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
        expect(value.toString()).toEqual("-1.0, -2.00, -3.000")
    }
})

test("StringEntity", () => {
    const grammar = StringEntity.grammar
    {
        let value = grammar.parse('""')
        expect(value).toBeInstanceOf(StringEntity)
        expect(value).toEqual(new StringEntity(""))
        expect(value.equals(new StringEntity(""))).toBeTruthy()
        expect(value.equals(new StringEntity("1"))).toBeFalsy()
        expect(value.print()).toEqual("")
        expect(value.toString()).toEqual(`""`)
        expect(value.toString(true)).toEqual(String.raw`\"\"`)
    }
    {
        let value = grammar.parse('"hello"')
        expect(value).toEqual(new StringEntity("hello"))
        expect(value.equals(new StringEntity("hello"))).toBeTruthy()
        expect(value.equals(new SymbolEntity("hello"))).toBeFalsy()
        expect(value.equals(new NumberEntity())).toBeFalsy()
        expect(value.print()).toEqual("hello")
        expect(value.toString()).toEqual(`"hello"`)
        expect(value.toString(true)).toEqual(String.raw`\"hello\"`)
    }
    {
        let value = grammar.parse('"hello world 123 - éèàò@ç ^ ^^^"')
        expect(value).toEqual(new StringEntity("hello world 123 - éèàò@ç ^ ^^^"))
        expect(value.equals(new StringEntity("hello world 123 - éèàò@ç ^ ^^^"))).toBeTruthy()
        expect(value.equals(new StringEntity("hello world 123 - éèàò@ç ^ ^^^-"))).toBeFalsy()
        expect(value.print()).toEqual("hello world 123 - éèàò@ç ^ ^^^")
        expect(value.toString()).toEqual(`"hello world 123 - éèàò@ç ^ ^^^"`)
        expect(value.toString(true)).toEqual(String.raw`\"hello world 123 - éèàò@ç ^ ^^^\"`)
    }
    {
        let value = grammar.parse(String.raw`"a:\"hello\", b:\"word is \\\"world\\\"\""`)
        expect(value).toEqual(new StringEntity(String.raw`a:"hello", b:"word is \"world\""`))
        expect(value.equals(new StringEntity(String.raw`a:"hello", b:"word is \"world\""`))).toBeTruthy()
        expect(value.equals(new NumberEntity())).toBeFalsy()
        expect(value.print()).toEqual(String.raw`a:"hello", b:"word is \"world\""`)
        expect(value.toString(false)).toEqual(String.raw`"a:\"hello\", b:\"word is \\\"world\\\"\""`)
        expect(value.toString(true)).toEqual(String.raw`\"a:\\\"hello\\\", b:\\\"word is \\\\\\\"world\\\\\\\"\\\"\"`)
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
        expect(value.toString()).toEqual('LookbehindValue(FirstKey=1,SecondKey=SOME_SYMBOL2,ThirdKey="Hello")')
        expect(value.toString(true)).toEqual(
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
        expect(value.toString()).toEqual('(A=(-1,-2,-3),B=SomeFunction(B1="b1",B2=(X=101,Y=102,Z=103)))')
        expect(value.toString(true)).toEqual(String.raw`(A=(-1,-2,-3),B=SomeFunction(B1=\"b1\",B2=(X=101,Y=102,Z=103)))`)
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
        expect(value.toString()).toEqual("(X=1,Y=2,Z=3.500)")
        expect(value.toString(true)).toEqual("(X=1,Y=2,Z=3.500)")
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
        expect(value.toString()).toEqual("(X=10,Y=20.880,Z=-30.54,)")
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
        expect(value.toString()).toEqual("(Z=-3.66,X=0,Y=-2,)")
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
        expect(value.toString(true)).toEqual("(X=78,Y=56.3)")
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
        expect(value.toString()).toEqual("(Y=93.004000,X=0,)")
    }
    expect(() => grammar.parse("(X=1,Y=2")).toThrow("Could not parse")
    expect(() => grammar.parse("(X=1,Y=\"2\")")).toThrow("Could not parse")
    expect(() => grammar.parse("(X=1)")).toThrow("Could not parse")
})
