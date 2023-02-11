/// <reference types="cypress" />

import GuidEntity from "../../js/entity/GuidEntity"
import initializeSerializerFactory from "../../js/serialization/initializeSerializerFactory"
import IntegerEntity from "../../js/entity/IntegerEntity"
import KeyBindingEntity from "../../js/entity/KeyBindingEntity"
import LinearColorEntity from "../../js/entity/LinearColorEntity"
import SerializerFactory from "../../js/serialization/SerializerFactory"
import Utility from "../../js/Utility"
import Vector2DEntity from "../../js/entity/Vector2DEntity"
import VectorEntity from "../../js/entity/VectorEntity"

initializeSerializerFactory()

describe("Serializer", () => {

    context("Boolean", () => {
        let serializer = SerializerFactory.getSerializer(Boolean)

        it("Parses true", () => expect(serializer.deserialize("true")).to.be.true)
        it("Parses True", () => expect(serializer.deserialize("True")).to.be.true)
        it("Parses false", () => expect(serializer.deserialize("false")).to.be.false)
        it("Parses False", () => expect(serializer.deserialize("False")).to.be.false)
    })

    context("Integer", () => {
        let serializer = SerializerFactory.getSerializer(IntegerEntity)

        it("Parses 0", () => expect(serializer.deserialize("0"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(0)
        )
        it("Parses +0", () => expect(serializer.deserialize("+0"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(0)
        )
        it("Parses -0", () => expect(serializer.deserialize("-0"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(0)
        )
        it("Parses 99", () => expect(serializer.deserialize("99"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(99)
        )
        it("Parses -8685", () => expect(serializer.deserialize("-8685"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(-8685)
        )
        it("Parses +555", () => expect(serializer.deserialize("+555"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(555)
        )
        it("Parses 1000000000", () => expect(serializer.deserialize("1000000000"))
            .to.be.instanceOf(IntegerEntity)
            .and.property("value").to.be.equal(1000000000)
        )
        it("Throws when not an integer", () => expect(() => serializer.deserialize("1.2").value).to.throw())
    })

    context("Number", () => {
        let serializer = SerializerFactory.getSerializer(Number)

        it("Parses 0", () => expect(serializer.deserialize("0")).to.be.approximately(0, 0.00001))
        it("Parses +0", () => expect(serializer.deserialize("+0")).to.be.approximately(0, 0.00001))
        it("Parses -0", () => expect(serializer.deserialize("-0")).to.be.approximately(0, 0.00001))
        it("Parses 5", () => expect(serializer.deserialize("5")).to.be.approximately(5, 0.00001))
        it("Parses 0.05", () => expect(serializer.deserialize("0.05")).to.be.approximately(0.05, 0.00001))
        it("Parses -999.666", () => expect(serializer.deserialize("-999.666")).to.be.approximately(-999.666, 0.001))
        it("Parses +45.4545", () => expect(serializer.deserialize("+45.4545")).to.be.approximately(45.4545, 0.001))
        it("Parses +1000000000", () => expect(serializer.deserialize("+1000000000")).to.be.approximately(1E9, 0.1))
        it("Throws when not numeric", () => expect(() => serializer.deserialize("alpha")).to.throw())
    })

    context("String", () => {
        let serializer = SerializerFactory.getSerializer(String)

        it('Parses ""', () => expect(serializer.deserialize('""')).to.be.equal(""))
        it('Parses "hello"', () => expect(serializer.deserialize('"hello"')).to.be.equal("hello"))
        it('Parses "hello world 123 - éèàò@ç ^ ^^^"', () =>
            expect(serializer.deserialize('"hello world 123 - éèàò@ç ^ ^^^"'))
                .to.be.equal("hello world 123 - éèàò@ç ^ ^^^")
        )
        it(String.raw`Parses "\""`, () => expect(serializer.deserialize(String.raw`"\""`)).to.be.equal('"'))
    })

    context("KeyBindingEntity", () => {
        let serializer = SerializerFactory.getSerializer(KeyBindingEntity)


        it("Parses A", () =>
            expect(serializer.deserialize("A"))
                .to.be.instanceOf(KeyBindingEntity)
                .and.to.deep.contain({ Key: { value: "A" } })
        )
        it("Parses (bCtrl=True,Key=A)", () =>
            expect(serializer.deserialize("(bCtrl=True,Key=A)"))
                .to.be.instanceOf(KeyBindingEntity)
                .and.to.deep.contain({ Key: { value: "A" }, bCtrl: true })
        )
        it("Parses (bCtrl=false,bShift=false,bCmd=false,bAlt=false,Key=X)", () =>
            expect(serializer.deserialize("(bCtrl=false,bShift=false,bCmd=true,bAlt=false,Key=X)"))
                .to.be.instanceOf(KeyBindingEntity)
                .and.to.deep.contain({ Key: { value: "X" }, bAlt: false, bCtrl: false, bCmd: true })
        )
        it("Parses spaces correctly", () =>
            expect(serializer.deserialize("(       bCtrl=  false  \n,       Key \n\n\n  =Y ,bAlt=true     )"))
                .to.be.instanceOf(KeyBindingEntity)
                .and.to.deep.contain({ Key: { value: "Y" }, bAlt: true, bCtrl: false })
        )
    })

    context("Guid", () => {
        let serializer = SerializerFactory.getSerializer(GuidEntity)

        it("Parses 0556a3ecabf648d0a5c07b2478e9dd32", () =>
            expect(serializer.deserialize("0556a3ecabf648d0a5c07b2478e9dd32"))
                .to.be.instanceOf(GuidEntity)
                .and.property("value").to.be.equal("0556a3ecabf648d0a5c07b2478e9dd32")
        )
        it("Parses 64023BC344E0453DBB583FAC411489BC", () =>
            expect(serializer.deserialize("64023BC344E0453DBB583FAC411489BC"))
                .to.be.instanceOf(GuidEntity)
                .and.property("value").to.be.equal("64023BC344E0453DBB583FAC411489BC")
        )
        it("Parses 6edC4a425ca948da8bC78bA52DED6C6C", () =>
            expect(serializer.deserialize("6edC4a425ca948da8bC78bA52DED6C6C"))
                .to.be.instanceOf(GuidEntity)
                .and.property("value").to.be.equal("6edC4a425ca948da8bC78bA52DED6C6C")
        )
        it("Throws when finding space", () =>
            expect(() => serializer.deserialize("172087193 9B04362973544B3564FDB2C"))
                .to.throw()
        )
        it("Throws when shorter by 1", () =>
            expect(() => serializer.deserialize("E25F14F8F3E9441AB07153E7DA2BA2B"))
                .to.throw()
        )
        it("Throws when longer by 1", () =>
            expect(() => serializer.deserialize("A78988B0097E48418C8CB87EC5A67ABF7"))
                .to.throw()
        )
    })

    context("Vector", () => {
        let serializer = SerializerFactory.getSerializer(VectorEntity)

        it("Parses simple vector", () => expect(serializer.deserialize("(X=1,Y=2,Z=3.5)"))
            .to.be.deep.equal({
                X: 1,
                Y: 2,
                Z: 3.5,
            })
        )
        it("Parses trailing comma", () => expect(serializer.deserialize("(X=10,Y=+20.88,Z=-30.54,)"))
            .to.be.deep.equal({
                X: 10,
                Y: 20.88,
                Z: -30.54,
            })
        )
        it("Parses weird spaces", () => expect(serializer.deserialize(`(
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
        it("Throws when unexpected types", () => expect(() => serializer.deserialize("(X=1,Y=\"2\",Z=3)"))
            .to.throw()
        )
        it("Throws when missing a key", () => expect(() => serializer.deserialize("(X=1,Z=3)"))
            .to.throw()
        )
        it("Throws when finding unexpected keys", () => expect(() => serializer.deserialize("(X=1,Y=2,Unexpected=6,Z=3.5)"))
            .to.throw()
        )
    })

    context("Vector2D", () => {
        let serializer = SerializerFactory.getSerializer(Vector2DEntity)

        it("Parses simple vector", () => expect(serializer.deserialize("(X=78,Y=56.3)"))
            .to.be.deep.equal({
                X: 78,
                Y: 56.3,
            })
        )
        it("Parses trailing comma", () => expect(serializer.deserialize("(X=+4.5,Y=-8.88,)"))
            .to.be.deep.equal({
                X: 4.5,
                Y: -8.88,
            })
        )
        it("Parses weird spaces", () => expect(serializer.deserialize(`(
            Y  =   +93.004    ,   
                
                        X
                            =        0 ,     
        )`))
            .to.be.deep.equal({
                X: 0,
                Y: 93.004,
            })
        )
        it("Throws on unexpected type", () => expect(() => serializer.deserialize("(X=1,Y=\"2\")"))
            .to.throw()
        )
        it("Throws when missing a key", () => expect(() => serializer.deserialize("(X=1)"))
            .to.throw()
        )
        it("Throws when finding unexpected keys", () => expect(() => serializer.deserialize("(X=777, Y=555, Unexpected=6, HH=2)"))
            .to.throw()
        )
    })

    context("Linear color", () => {
        let serializer = SerializerFactory.getSerializer(LinearColorEntity)

        it("check white color", () => {
            const result = LinearColorEntity.getWhite()
            expect(result.toRGBA()).to.be.deep.equal([255, 255, 255, 255])
            expect(result.toRGBAString()).to.be.equal("FFFFFFFF")
            expect(result.toNumber()).to.be.equal(-1)
            expect(result.toHSVA()).to.be.deep.equal([0, 0, 1, 1])
        })
        it("Parses red color", () => {
            const result = serializer.deserialize("(R=1,G=0,B=0)")
            expect(result.toRGBA()).to.be.deep.equal([255, 0, 0, 255])
            expect(result.toRGBAString()).to.be.equal("FF0000FF")
            expect(result.toNumber()).to.be.equal(-16776961)
            expect(result.toHSVA()).to.be.deep.equal([0, 1, 1, 1])
        })
        it("Parses simple color", () => {
            const result = serializer.deserialize("(R=0.000000,G=0.660000,B=1.000000,A=1.000000)")
            expect(result.toRGBA()).to.be.deep.equal([0, 168, 255, 255])
            expect(result.toRGBAString()).to.be.equal("00A8FFFF")
            expect(result.toNumber()).to.be.equal(11075583)
            expect(result.toHSVA()).to.be.deep.equal([0.55666666666666666666, 1, 1, 1])
        })
        it("Parses wrong order keys", () => {
            const result = serializer.deserialize("(B=0.04394509003266556,G=0.026789300067696642,A=0.83663232408635,R=0.6884158028074934,)")
            expect(result.toRGBA()).to.be.deep.equal([176, 7, 11, 213])
            expect(result.toRGBAString()).to.be.equal("B0070BD5")
            expect(result.toNumber()).to.be.equal(-1341715499)
            expect(result.toHSVA().map(v => Utility.roundDecimals(v, 3))).to.be.deep.equal([0.996, 0.961, 0.688, 0.837])
        })
        it("Parses weird spaces", () => {
            const result = serializer.deserialize(`(
                    A     = 0.327     ,
              R=0.530   ,             G  =      0.685
                ,B
                       =       0.9    ,)`)
            expect(result.toRGBA()).to.be.deep.equal([135, 175, 230, 83])
            expect(result.toRGBAString()).to.be.equal("87AFE653")
            expect(result.toNumber()).to.be.equal(-2018515373)
            expect(result.toHSVA().map(v => Utility.roundDecimals(v, 3))).to.be.deep.equal([0.597, 0.411, 0.9, 0.327])
        })
        it("Throws when missing an expected key", () => expect(() => serializer.deserialize("(R=0.000000,G=0.660000,A=1.000000)"))
            .to.throw()
        )
        it("Throws when unexpected types", () => expect(() => serializer.deserialize("(R=0.000000,G=\"hello\",A=1.000000)"))
            .to.throw()
        )
    })
})
