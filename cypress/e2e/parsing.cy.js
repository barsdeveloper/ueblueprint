/// <reference types="cypress" />

import SerializerFactory from "../../js/serialization/SerializerFactory"
import initializeSerializerFactory from "../../js/serialization/initializeSerializerFactory"
import VectorEntity from "../../js/entity/VectorEntity"
import Vector2DEntity from "../../js/entity/Vector2DEntity"
import IntegerEntity from "../../js/entity/IntegerEntity"
import LinearColorEntity from "../../js/entity/LinearColorEntity"
import Utility from "../../js/Utility"
import ISerializer from "../../js/serialization/ISerializer"

describe("Serializer", () => {

    before(() => {
        expect(SerializerFactory,).to.be.a("function")
        expect(initializeSerializerFactory).to.be.a("function")
        initializeSerializerFactory()
    })

    context("Boolean", () => {
        /** @type {ISerializer<Boolean>} */
        let serializer

        before(() => {
            serializer = SerializerFactory.getSerializer(Boolean)
            expect(serializer).to.not.be.undefined
        })

        it("parses true", () => expect(serializer.deserialize("true")).to.be.true)
        it("parses True", () => expect(serializer.deserialize("True")).to.be.true)
        it("parses false", () => expect(serializer.deserialize("false")).to.be.false)
        it("parses False", () => expect(serializer.deserialize("False")).to.be.false)
    })

    context("Integer", () => {
        let serializer = SerializerFactory.getSerializer(IntegerEntity)

        before(() => {
            serializer = SerializerFactory.getSerializer(IntegerEntity)
            expect(serializer).to.not.be.undefined
        })

        it("parses 99", () => expect(serializer.deserialize("99").value).to.be.equal(99))
        it("parses -8685", () => expect(serializer.deserialize("-8685").value).to.be.equal(-8685))
        it("parses +555", () => expect(serializer.deserialize("+555").value).to.be.equal(555))
        it("throws when not an integer", () => expect(() => serializer.deserialize("1.2").value).to.throw())
    })

    context("Vector", () => {
        /** @type {ISerializer<VectorEntity>} */
        let serializer

        before(() => {
            serializer = SerializerFactory.getSerializer(VectorEntity)
            expect(VectorEntity.expectsAllKeys()).to.be.true
            expect(serializer).to.not.be.undefined
        })

        it("parses simple vector", () => expect(serializer.deserialize("(X=1,Y=2,Z=3.5)"))
            .to.be.deep.equal({
                X: 1,
                Y: 2,
                Z: 3.5,
            })
        )
        it("parses trailing comma", () => expect(serializer.deserialize("(X=10,Y=+20.88,Z=-30.54,)"))
            .to.be.deep.equal({
                X: 10,
                Y: 20.88,
                Z: -30.54,
            })
        )
        it("parses weird spaces", () => expect(serializer.deserialize(`(
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
        it("throws when unexpected types", () => expect(() => serializer.deserialize("(X=1,Y=\"2\",Z=3)"))
            .to.throw()
        )
        it("throws when missing a key", () => expect(() => serializer.deserialize("(X=1,Z=3)"))
            .to.throw()
        )
        it("throws when finding unexpected keys", () => expect(() => serializer.deserialize("(X=1,Y=2,Unexpected=6,Z=3.5)"))
            .to.throw()
        )
    })

    context("Vector2D", () => {
        /** @type {ISerializer<Vector2DEntity>} */
        let serializer

        before(() => {
            serializer = SerializerFactory.getSerializer(Vector2DEntity)
            expect(Vector2DEntity.expectsAllKeys()).to.be.true
            expect(serializer).to.not.be.undefined
        })

        it("parses simple vector", () => expect(serializer.deserialize("(X=78,Y=56.3)"))
            .to.be.deep.equal({
                X: 78,
                Y: 56.3,
            })
        )
        it("parses trailing comma", () => expect(serializer.deserialize("(X=+4.5,Y=-8.88,)"))
            .to.be.deep.equal({
                X: 4.5,
                Y: -8.88,
            })
        )
        it("parses weird spaces", () => expect(serializer.deserialize(`(
            Y  =   +93.004    ,   
                
                        X
                            =        0 ,     
        )`))
            .to.be.deep.equal({
                X: 0,
                Y: 93.004,
            })
        )
        it("throws on unexpected type", () => expect(() => serializer.deserialize("(X=1,Y=\"2\")"))
            .to.throw()
        )
        it("throws when missing a key", () => expect(() => serializer.deserialize("(X=1)"))
            .to.throw()
        )
        it("throws when finding unexpected keys", () => expect(() => serializer.deserialize("(X=777, Y=555, Unexpected=6, HH=2)"))
            .to.throw()
        )
    })

    context("Linear color", () => {
        /** @type {ISerializer<LinearColorEntity>} */
        let serializer

        before(() => {
            serializer = SerializerFactory.getSerializer(LinearColorEntity)
            expect(LinearColorEntity.expectsAllKeys()).to.be.false
            expect(serializer).to.not.be.undefined
        })

        it("check white color", () => {
            const result = LinearColorEntity.getWhite()
            expect(result.toRGBA()).to.be.deep.equal([255, 255, 255, 255])
            expect(result.toRGBAString()).to.be.equal("FFFFFFFF")
            expect(result.toNumber()).to.be.equal(-1)
            expect(result.toHSVA()).to.be.deep.equal([0, 0, 1, 1])
        })
        it("parses red color", () => {
            const result = serializer.deserialize("(R=1,G=0,B=0)")
            expect(result.toRGBA()).to.be.deep.equal([255, 0, 0, 255])
            expect(result.toRGBAString()).to.be.equal("FF0000FF")
            expect(result.toNumber()).to.be.equal(-16776961)
            expect(result.toHSVA()).to.be.deep.equal([0, 1, 1, 1])
        })
        it("parses simple color", () => {
            const result = serializer.deserialize("(R=0.000000,G=0.660000,B=1.000000,A=1.000000)")
            expect(result.toRGBA()).to.be.deep.equal([0, 168, 255, 255])
            expect(result.toRGBAString()).to.be.equal("00A8FFFF")
            expect(result.toNumber()).to.be.equal(11075583)
            expect(result.toHSVA()).to.be.deep.equal([0.55666666666666666666, 1, 1, 1])
        })
        it("parses wrong order keys", () => {
            const result = serializer.deserialize("(B=0.04394509003266556,G=0.026789300067696642,A=0.83663232408635,R=0.6884158028074934,)")
            expect(result.toRGBA()).to.be.deep.equal([176, 7, 11, 213])
            expect(result.toRGBAString()).to.be.equal("B0070BD5")
            expect(result.toNumber()).to.be.equal(-1341715499)
            expect(result.toHSVA().map(v => Utility.roundDecimals(v, 3))).to.be.deep.equal([0.996, 0.961, 0.688, 0.837])
        })
        it("parses weird spaces", () => {
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
        it("throws when missing an expected key", () => expect(() => serializer.deserialize("(R=0.000000,G=0.660000,A=1.000000)"))
            .to.throw()
        )
        it("throws when unexpected types", () => expect(() => serializer.deserialize("(R=0.000000,G=\"hello\",A=1.000000)"))
            .to.throw()
        )
    })
})
