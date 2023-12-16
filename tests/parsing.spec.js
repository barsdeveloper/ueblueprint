import FormatTextEntity from "../../js/entity/FormatTextEntity.js"
import Grammar from "../../js/serialization/Grammar.js"
import GuidEntity from "../../js/entity/GuidEntity.js"
import initializeSerializerFactory from "../../js/serialization/initializeSerializerFactory.js"
import IntegerEntity from "../../js/entity/IntegerEntity.js"
import KeyBindingEntity from "../../js/entity/KeyBindingEntity.js"
import LinearColorEntity from "../../js/entity/LinearColorEntity.js"
import ObjectReferenceEntity from "../../js/entity/ObjectReferenceEntity.js"
import RotatorEntity from "../../js/entity/RotatorEntity.js"
import SerializerFactory from "../../js/serialization/SerializerFactory.js"
import SymbolEntity from "../../js/entity/SymbolEntity.js"
import UnknownKeysEntity from "../../js/entity/UnknownKeysEntity.js"
import Utility from "../../js/Utility.js"
import Vector2DEntity from "../../js/entity/Vector2DEntity.js"
import VectorEntity from "../../js/entity/VectorEntity.js"

initializeSerializerFactory()

describe("Serializer", () => {

    context("Boolean", () => {
        let serializer = SerializerFactory.getSerializer(Boolean)

        it("Parses true", () => expect(serializer.read("true")).to.be.true)
        it("Parses True", () => expect(serializer.read("True")).to.be.true)
        it("Parses false", () => expect(serializer.read("false")).to.be.false)
        it("Parses False", () => expect(serializer.read("False")).to.be.false)
    })

    context("FormatTextEntity", () => {
        let serializer = SerializerFactory.getSerializer(FormatTextEntity)

        it("Test 1", () => expect(
            serializer.read(`LOCGEN_FORMAT_NAMED(NSLOCTEXT("KismetSchema", "SplitPinFriendlyNameFormat", "{PinDisplayName} {ProtoPinDisplayName}"), "PinDisplayName", "Out Hit", "ProtoPinDisplayName", "Blocking Hit")`)
                .toString()
        ).to.be.equal("Out Hit Blocking Hit"))
        it("Test 2", () => expect(
            serializer.read(`LOCGEN_FORMAT_NAMED(NSLOCTEXT("KismetSchema", "SplitPinFriendlyNameFormat", "{PinDisplayName} {ProtoPinDisplayName}"), "PinDisplayName", "Out Hit", "ProtoPinDisplayName", "Hit Bone Name")`)
                .toString()
        ).to.be.equal("Out Hit Hit Bone Name"))
        it("Test 3", () => expect(
            serializer.read(String.raw`LOCGEN_FORMAT_ORDERED(
                NSLOCTEXT(
                    "PCGSettings",
                    "OverridableParamPinTooltip",
                    "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""
                ),
                "If InRangeMin = InRangeMax, then that density value is mapped to the average of OutRangeMin and OutRangeMax\n",
                "float",
                "InRangeMin"
            )`)
                .toString()

        ).to.be.equal(`If InRangeMin = InRangeMax, then that density value is mapped to the average of OutRangeMin and OutRangeMax\nAttribute type is "float" and its exact name is "InRangeMin"`))
    })

    context("GuidEntity", () => {
        let serializer = SerializerFactory.getSerializer(GuidEntity)

        it("Parses 0556a3ecabf648d0a5c07b2478e9dd32", () =>
            expect(serializer.read("0556a3ecabf648d0a5c07b2478e9dd32"))
                .to.be.instanceOf(GuidEntity)
                .and.property("value").to.be.equal("0556a3ecabf648d0a5c07b2478e9dd32")
        )
        it("Parses 64023BC344E0453DBB583FAC411489BC", () =>
            expect(serializer.read("64023BC344E0453DBB583FAC411489BC"))
                .to.be.instanceOf(GuidEntity)
                .and.property("value").to.be.equal("64023BC344E0453DBB583FAC411489BC")
        )
        it("Parses 6edC4a425ca948da8bC78bA52DED6C6C", () =>
            expect(serializer.read("6edC4a425ca948da8bC78bA52DED6C6C"))
                .to.be.instanceOf(GuidEntity)
                .and.property("value").to.be.equal("6edC4a425ca948da8bC78bA52DED6C6C")
        )
        it("Throws when finding space", () =>
            expect(() => serializer.read("172087193 9B04362973544B3564FDB2C"))
                .to.throw()
        )
        it("Throws when shorter by 1", () =>
            expect(() => serializer.read("E25F14F8F3E9441AB07153E7DA2BA2B"))
                .to.throw()
        )
        it("Throws when longer by 1", () =>
            expect(() => serializer.read("A78988B0097E48418C8CB87EC5A67ABF7"))
                .to.throw()
        )
    })

    context("IntegerEntity", () => {
        let serializer = SerializerFactory.getSerializer(IntegerEntity)

        it("Parses 0", () => expect(serializer.read("0"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(0)
        )
        it("Parses +0", () => expect(serializer.read("+0"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(0)
        )
        it("Parses -0", () => expect(serializer.read("-0"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(0)
        )
        it("Parses 99", () => expect(serializer.read("99"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(99)
        )
        it("Parses -8685", () => expect(serializer.read("-8685"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(-8685)
        )
        it("Parses +555", () => expect(serializer.read("+555"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(555)
        )
        it("Parses 1000000000", () => expect(serializer.read("1000000000"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(1000000000)
        )
        it("Throws when not an integer", () => expect(() => serializer.read("1.2").value).to.throw())
    })

    context("KeyBindingEntity", () => {
        let serializer = SerializerFactory.getSerializer(KeyBindingEntity)

        it("Parses A", () =>
            expect(serializer.read("A"))
                .to.be.instanceOf(KeyBindingEntity)
                .and.to.deep.contain({ Key: { value: "A" } })
        )
        it("Parses (bCtrl=True,Key=A)", () =>
            expect(serializer.read("(bCtrl=True,Key=A)"))
                .to.be.instanceOf(KeyBindingEntity)
                .and.to.deep.contain({ Key: { value: "A" }, bCtrl: true })
        )
        it("Parses (bCtrl=false,bShift=false,bCmd=false,bAlt=false,Key=X)", () =>
            expect(serializer.read("(bCtrl=false,bShift=false,bCmd=true,bAlt=false,Key=X)"))
                .to.be.instanceOf(KeyBindingEntity)
                .and.to.deep.contain({ Key: { value: "X" }, bAlt: false, bCtrl: false, bCmd: true })
        )
        it("Parses spaces correctly", () =>
            expect(serializer.read("(       bCtrl=  false  \n,       Key \n\n\n  =Y ,bAlt=true     )"))
                .to.be.instanceOf(KeyBindingEntity)
                .and.to.deep.contain({ Key: { value: "Y" }, bAlt: true, bCtrl: false })
        )
    })

    context("LinearColorEntity", () => {
        let serializer = SerializerFactory.getSerializer(LinearColorEntity)

        it("check white color", () => {
            const result = LinearColorEntity.getWhite()
            expect(result.toRGBA()).to.be.deep.equal([255, 255, 255, 255])
            expect(result.toRGBAString()).to.be.equal("FFFFFFFF")
            expect(result.toNumber()).to.be.equal(-1)
            expect(result.toHSVA()).to.be.deep.equal([0, 0, 1, 1])
        })
        it("Parses red color", () => {
            const result = serializer.read("(R=1,G=0,B=0)")
            expect(result.toRGBA()).to.be.deep.equal([255, 0, 0, 255])
            expect(result.toRGBAString()).to.be.equal("FF0000FF")
            expect(result.toNumber()).to.be.equal(-16776961)
            expect(result.toHSVA()).to.be.deep.equal([0, 1, 1, 1])
        })
        it("Parses simple color", () => {
            const result = serializer.read("(R=0.000000,G=0.660000,B=1.000000,A=1.000000)")
            expect(result.toRGBA()).to.be.deep.equal([0, 168, 255, 255])
            expect(result.toRGBAString()).to.be.equal("00A8FFFF")
            expect(result.toNumber()).to.be.equal(11075583)
            expect(result.toHSVA()).to.be.deep.equal([0.55666666666666666666, 1, 1, 1])
        })
        it("Parses wrong order keys", () => {
            const result = serializer.read("(B=0.04394509003266556,G=0.026789300067696642,A=0.83663232408635,R=0.6884158028074934,)")
            expect(result.toRGBA()).to.be.deep.equal([176, 7, 11, 213])
            expect(result.toRGBAString()).to.be.equal("B0070BD5")
            expect(result.toNumber()).to.be.equal(-1341715499)
            expect(result.toHSVA().map(v => Utility.roundDecimals(v, 3))).to.be.deep.equal([0.996, 0.961, 0.688, 0.837])
        })
        it("Parses weird spaces", () => {
            const result = serializer.read(`(
                    A     = 0.327     ,
              R=0.530   ,             G  =      0.685
                ,B
                       =       0.9    ,)`)
            expect(result.toRGBA()).to.be.deep.equal([135, 175, 230, 83])
            expect(result.toRGBAString()).to.be.equal("87AFE653")
            expect(result.toNumber()).to.be.equal(-2018515373)
            expect(result.toHSVA().map(v => Utility.roundDecimals(v, 3))).to.be.deep.equal([0.597, 0.411, 0.9, 0.327])
        })
        it("Throws when missing an expected key", () => expect(() => serializer.read("(R=0.000000,G=0.660000,A=1.000000)"))
            .to.throw()
        )
        it("Throws when unexpected types", () => expect(() => serializer.read("(R=0.000000,G=\"hello\",A=1.000000)"))
            .to.throw()
        )
    })

    context("Number", () => {
        let serializer = SerializerFactory.getSerializer(Number)

        it("Parses 0", () => expect(serializer.read("0")).to.be.approximately(0, 0.00001))
        it("Parses +0", () => expect(serializer.read("+0")).to.be.approximately(0, 0.00001))
        it("Parses -0", () => expect(serializer.read("-0")).to.be.approximately(0, 0.00001))
        it("Parses 5", () => expect(serializer.read("5")).to.be.approximately(5, 0.00001))
        it("Parses 0.05", () => expect(serializer.read("0.05")).to.be.approximately(0.05, 0.00001))
        it("Parses -999.666", () => expect(serializer.read("-999.666")).to.be.approximately(-999.666, 0.001))
        it("Parses +45.4545", () => expect(serializer.read("+45.4545")).to.be.approximately(45.4545, 0.001))
        it("Parses +1000000000", () => expect(serializer.read("+1000000000")).to.be.approximately(1E9, 0.1))
        it("Throws when not numeric", () => expect(() => serializer.read("alpha")).to.throw())
    })

    context("ObjectReferenceEntity", () => {
        let serializer = SerializerFactory.getSerializer(ObjectReferenceEntity)

        it(`Parses Class`, () =>
            expect(serializer.read("Class"))
                .to.be.instanceOf(ObjectReferenceEntity)
                .and.to.deep.contain({ type: "Class", path: "" })
        )
        it(`Parses Class'/Script/ShooterGame.ShooterGameMode'`, () =>
            expect(serializer.read(`Class'/Script/ShooterGame.ShooterGameMode'`))
                .to.be.instanceOf(ObjectReferenceEntity)
                .and.to.deep.contain({ type: "Class", path: "/Script/ShooterGame.ShooterGameMode" })
        )
        it(`Parses EdGraphPin'EdGraphPin_45417'`, () =>
            expect(serializer.read(`EdGraphPin'EdGraphPin_45417'`))
                .to.be.instanceOf(ObjectReferenceEntity)
                .and.to.deep.contain({ type: "EdGraphPin", path: "EdGraphPin_45417" })
        )
        it(`Parses EdGraphPin'"K2Node_DynamicCast_2126.EdGraphPin_3990988"'`, () =>
            expect(serializer.read(`EdGraphPin'"K2Node_DynamicCast_2126.EdGraphPin_3990988"'`))
                .to.be.instanceOf(ObjectReferenceEntity)
                .and.to.deep.contain({ type: "EdGraphPin", path: "K2Node_DynamicCast_2126.EdGraphPin_3990988" })
        )
        it(`Parses /Script/Engine.EdGraph'"/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N"'`, () =>
            expect(serializer.read(`/Script/Engine.EdGraph'"/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N"'`))
                .to.be.instanceOf(ObjectReferenceEntity)
                .and.to.deep.contain({ type: "/Script/Engine.EdGraph", path: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N" })
        )
        it(`Parses Function'"/Game/Mods/CrazyDinos/ElementalDragon/CDElementalDragon_Character_BP.SKEL_CDElementalDragon_Character_BP_C:ROS Change Element"'`, () =>
            expect(serializer.read(`Function'"/Game/Mods/CrazyDinos/ElementalDragon/CDElementalDragon_Character_BP.SKEL_CDElementalDragon_Character_BP_C:ROS Change Element"'`))
                .to.be.instanceOf(ObjectReferenceEntity)
                .and.to.deep.contain({ type: "Function", path: "/Game/Mods/CrazyDinos/ElementalDragon/CDElementalDragon_Character_BP.SKEL_CDElementalDragon_Character_BP_C:ROS Change Element" })
        )
        it(`Parses EdGraph'/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch'`, () =>
            expect(serializer.read(`EdGraph'/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch'`))
                .to.be.instanceOf(ObjectReferenceEntity)
                .and.to.deep.contain({ type: "EdGraph", path: "/Game/Systems/BP_MacroGlobal.BP_MacroGlobal:Or+Branch" })
        )
        it(`Parses /Script/Engine.EdGraph'"+-Weird/2,Macro"'`, () =>
            expect(serializer.read(`/Script/Engine.EdGraph'"+-Weird/2,Macro"'`))
                .to.be.instanceOf(ObjectReferenceEntity)
                .and.to.deep.contain({ type: "/Script/Engine.EdGraph", path: "+-Weird/2,Macro" })
        )
    })

    context("String", () => {
        let serializer = SerializerFactory.getSerializer(String)

        it('Parses ""', () => expect(serializer.read('""')).to.be.equal(""))
        it('Parses "hello"', () => expect(serializer.read('"hello"')).to.be.equal("hello"))
        it('Parses "hello world 123 - éèàò@ç ^ ^^^"', () =>
            expect(serializer.read('"hello world 123 - éèàò@ç ^ ^^^"'))
                .to.be.equal("hello world 123 - éèàò@ç ^ ^^^")
        )
        it('Parses "\\""', () => expect(serializer.read('"\\""')).to.be.equal('"'))
        it('Throws when not a string', () => expect(() => serializer.read("Hello")).to.throw())
    })

    context("UnknownKeysValue", () => {
        let parser = Grammar.unknownValue

        it("Parses String", () => expect(parser.parse('"Hello"').value.constructor).equals(String))
        it("Parses null", () => expect(parser.parse("()").value).to.be.null)
        it("Parses Number", () => expect(parser.parse("8345").value.constructor).equals(Number))
        it("Parses Boolean", () => expect(parser.parse("True").value.constructor).equals(Boolean))
        it("Parses Boolean 2", () => expect(parser.parse("False").value.constructor).equals(Boolean))
        it("Parses GuidEntity", () =>
            expect(parser.parse("F0223D3742E67C0D9FEFB2A64946B7F0").value.constructor).equals(GuidEntity)
        )
        it("Parses SymbolEntity", () => expect(parser.parse("SYMBOL1").value.constructor).equals(SymbolEntity))
        it("Parses SymbolEntity 2", () => expect(parser.parse("Symbol_2_3_4").value.constructor).equals(SymbolEntity))
        it("Parses Vector2DEntity", () =>
            expect(parser.parse("(X=-0.495,  Y=0, )").value.constructor).equals(Vector2DEntity)
        )
        it("Parses VectorEntity", () =>
            expect(parser.parse("(X=-0.495,Y=+765.0,Z=7)").value.constructor).equals(VectorEntity)
        )
        it("Parses RotatorEntity", () =>
            expect(parser.parse("(R=1.000000,P=7.6,Y=+88.99)").value.constructor).equals(RotatorEntity)
        )
        it("Parses LinearColorEntity", () =>
            expect(parser.parse("(R=0.000000,G=0.660000,B=1.000000,A=1.000000)").value.constructor)
                .equals(LinearColorEntity)
        )
        it("Parses ObjectReferenceEntity", () =>
            expect(parser.parse(`Class'"/Script/Engine.KismetSystemLibrary"'`).value.constructor)
                .equals(ObjectReferenceEntity)
        )
        it("Parses Numbers array", () =>
            expect(parser.parse("(1,2,3,4,5,6,7,8,9)").value).to.be.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9])
        )
        it("Parses Strings array", () =>
            expect(parser.parse(`( "Hello",  "World",  )`).value).to.be.deep.equal(["Hello", "World"])
        )
        it("Parses Heterogeneous array", () =>
            expect(parser.parse(`( "Alpha", 123, Beta, "Gamma", "Delta", 99  )`).value)
                .to.be.deep.equal(["Alpha", 123, { value: "Beta" }, "Gamma", "Delta", 99])
        )
    })

    context("UnknownKeysEntity", () => {
        let serializer = SerializerFactory.getSerializer(UnknownKeysEntity)

        it('Parses LookbehindValue(FirstKey=1,SecondKey=SOME_SYMBOL2,ThirdKey="Hello")', () =>
            expect(serializer.read('LookbehindValue(FirstKey=1,SecondKey=SOME_SYMBOL2,ThirdKey="Hello")').equals(
                new UnknownKeysEntity({
                    lookbehind: "LookbehindValue",
                    FirstKey: 1,
                    SecondKey: new SymbolEntity("SOME_SYMBOL2"),
                    ThirdKey: "Hello",
                })
            )).to.be.true
        )
        it('Parses (A = (-1,-2,-3),  B = SomeFunction(B1 = "b1", B2 = (X=101,Y=102,Z=103)))', () =>
            expect(serializer.read('(A = (-1,-2,-3),  B = SomeFunction(B1 = "b1", B2 = (X=101,Y=102,Z=103)))').equals(
                new UnknownKeysEntity({
                    lookbehind: "",
                    A: [-1, -2, -3],
                    B: new UnknownKeysEntity({
                        lookbehind: "SomeFunction",
                        B1: "b1",
                        B2: new VectorEntity({ X: 101, Y: 102, Z: 103 }),
                    }),
                })
            )).to.be.true
        )
    })

    context("VectorEntity", () => {
        let serializer = SerializerFactory.getSerializer(VectorEntity)

        it("Parses simple vector", () => expect(serializer.read("(X=1,Y=2,Z=3.5)"))
            .to.be.deep.equal({
                X: 1,
                Y: 2,
                Z: 3.5,
            })
        )
        it("Parses trailing comma", () => expect(serializer.read("(X=10,Y=+20.88,Z=-30.54,)"))
            .to.be.deep.equal({
                X: 10,
                Y: 20.88,
                Z: -30.54,
            })
        )
        it("Parses weird spaces", () => expect(serializer.read(`(
            Z  =   -3.66    ,   
                
                        X
                            =        -1 ,     Y       =
                            
                            
                    -2
  ,
        )`))
            .to.be.deep.equal({
                X: -1,
                Y: -2,
                Z: -3.66,
            })
        )
        it("Throws when unexpected types", () => expect(() => serializer.read("(X=1,Y=\"2\",Z=3)"))
            .to.throw()
        )
        it("Throws when missing a key", () => expect(() => serializer.read("(X=1,Z=3)"))
            .to.throw()
        )
        it("Throws when finding unexpected keys", () => expect(() => serializer.read("(X=1,Y=2,Unexpected=6,Z=3.5)"))
            .to.throw()
        )
    })

    context("Vector2DEntity", () => {
        let serializer = SerializerFactory.getSerializer(Vector2DEntity)

        it("Parses simple vector", () => expect(serializer.read("(X=78,Y=56.3)"))
            .to.be.deep.equal({
                X: 78,
                Y: 56.3,
            })
        )
        it("Parses trailing comma", () => expect(serializer.read("(X=+4.5,Y=-8.88,)"))
            .to.be.deep.equal({
                X: 4.5,
                Y: -8.88,
            })
        )
        it("Parses weird spaces", () => expect(serializer.read(`(
            Y  =   +93.004    ,   
                
                        X
                            =        0 ,     
        )`))
            .to.be.deep.equal({
                X: 0,
                Y: 93.004,
            })
        )
        it("Throws on unexpected type", () => expect(() => serializer.read("(X=1,Y=\"2\")"))
            .to.throw()
        )
        it("Throws when missing a key", () => expect(() => serializer.read("(X=1)"))
            .to.throw()
        )
        it("Throws when finding unexpected keys", () => expect(() => serializer.read("(X=777, Y=555, Unexpected=6, HH=2)"))
            .to.throw()
        )
    })
})
