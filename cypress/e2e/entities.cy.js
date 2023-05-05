/// <reference types="cypress" />

import Entity1 from "../fixtures/Entity1.js"
import Entity2 from "../fixtures/Entity2.js"
import entity2Value from "../fixtures/serializedEntity2.js"
import Entity3 from "../fixtures/Entity3.js"
import entity3Value from "../fixtures/serializedEntity3.js"
import Entity4 from "../fixtures/Entity4.js"
import entity4Value from "../fixtures/serializedEntity4.js"
import Grammar from "../../js/serialization/Grammar.js"
import initializeSerializerFactory from "../../js/serialization/initializeSerializerFactory.js"
import Serializer from "../../js/serialization/Serializer.js"
import SerializerFactory from "../../js/serialization/SerializerFactory.js"

describe("Entity initialization", () => {
    before(() => {
        expect(Entity2).to.be.a("function")
        expect(Entity3).to.be.a("function")
    })

    context("Entity2", () => {
        const entity = new Entity2()
        before(() => {
            initializeSerializerFactory()
            SerializerFactory.registerSerializer(
                Entity2,
                new Serializer(
                    Entity2,
                    (entity, v) => `{\n${v}\n}`,
                    "\n",
                    false,
                    ": ",
                    k => `    ${k}`
                )
            )
            SerializerFactory.registerSerializer(
                Entity1,
                new Serializer(
                    Entity1,
                    (entity, v) => `Entity1(${v})`,
                    ", ",
                    false,
                    "=",
                )
            )
        })
        it("has 8 keys", () => expect(Object.keys(entity).length).to.equal(8))
        it("has someNumber equal to 567", () => expect(entity)
            .to.have.property("someNumber")
            .which.is.a("number")
            .and.is.equal(567)
        )
        it("has someString equal to alpha", () => expect(entity)
            .to.have.property("someString")
            .which.is.a("string")
            .and.is.equal("alpha")
        )
        it("has someString2 equal to beta", () => expect(entity)
            .to.have.property("someString2")
            .which.is.a("string")
            .and.is.equal("beta")
        )
        it("has someBoolean true", () => expect(entity)
            .to.have.property("someBoolean")
            .which.is.a("boolean")
            .and.is.true
        )
        it("has someBoolean2 false", () => expect(entity)
            .to.have.property("someBoolean2")
            .which.is.a("boolean")
            .and.is.false
        )
        it("has someObjectString equal to gamma", () => expect(entity)
            .to.have.property("someObjectString")
            .which.is.a("string")
            .and.is.equal("gamma")
        )
        it("has someArray with numbers", () => expect(entity)
            .to.have.property("someArray")
            .which.is.an("array")
            .and.is.deep.equal([400, 500, 600, 700, 800])
        )
        it("is equal to another empty Entity2", () =>
            expect(entity.equals(new Entity2())).to.be.true
        )
        const other = new Entity2({
            someString2: "gamma"
        })
        it("is not equal to another empty Entity2", () =>
            expect(entity.equals(other)).to.be.false
        )
        const other1 = new Entity2({
            someNumber: 123,
            someString: "a",
            someString2: "b",
            someBoolean: false,
            someBoolean2: false,
            someObjectString: new String("delta"),
            someArray: [-1, -2, -3],
        })
        const other2 = new Entity2({
            someNumber: 123,
            someString: "a",
            someString2: "b",
            someBoolean: false,
            someBoolean2: false,
            someObjectString: "delta",
            someArray: [-1, -2, -3],
        })
        it("compares equal entities as equal", () =>
            expect(other1.equals(other2)).to.be.true
        )
        it("can serialize", () =>
            expect(SerializerFactory.getSerializer(Entity2).write(entity)).to.equal(entity2Value)
        )
        it("has correct nested property", () =>
            expect(Grammar.getAttribute(Entity2, ["someEntity", "a"]).type).to.equal(Number)
        )
    })

    context("Entity3", () => {
        const entity = new Entity3()
        const keys = [
            "alpha",
            "bravo",
            "charlie",
            "delta",
            "echo",
            "foxtrot",
            "golf",
            "hotel",
            "india",
            "juliett",
            "kilo",
            // "lima", // Not defined by default
            "mike",
            "november",
            "oscar",
            "papa",
            "quebec",
            "romeo",
            "sierra",
        ]
        before(() => {
            initializeSerializerFactory()
            SerializerFactory.registerSerializer(
                Entity3,
                new Serializer(
                    Entity3,
                    (entity, v) => `[[\n${v}\n]]`,
                    "\n",
                    false,
                    ": ",
                    k => `    ${k}`
                )
            )
            SerializerFactory.registerSerializer(
                Entity1,
                new Serializer(
                    Entity1,
                    (entity, v) => `Entity1(${v})`,
                    ", ",
                    false,
                    "=",
                )
            )
        })
        it(`has ${keys.length} keys`, () => expect(Object.keys(entity).length).to.equal(keys.length))
        it("has specific keys names", () => expect(Object.keys(entity)).to.be.deep.equal(keys))
        it("has alpha equal to 32", () => expect(entity)
            .to.have.property("alpha")
            .which.is.a("number")
            .and.is.equal(32)
        )
        it("has bravo equal to 78", () => expect(entity)
            .to.have.property("bravo")
            .which.is.a("number")
            .and.is.equal(78)
        )
        it("has charlie equal to beta", () => expect(entity)
            .to.have.property("charlie")
            .which.is.a("string")
            .and.is.equal("Charlie")
        )
        it("has delta null", () => expect(entity)
            .to.have.property("delta")
            .which.is.null
        )
        it("has echo equal to echo", () => expect(entity)
            .to.have.property("echo")
            .which.is.a("string")
            .and.is.equal("echo")
        )
        it("has foxtrot false", () => expect(entity)
            .to.have.property("foxtrot")
            .which.is.a("boolean")
            .and.is.false
        )
        it("has golf empty array", () => expect(entity)
            .to.have.property("golf")
            .which.is.an("array")
            .and.is.empty
        )
        it("has hotel null", () => expect(entity)
            .to.have.property("hotel")
            .which.is.null
        )
        it("has india empty array", () => expect(entity)
            .to.have.property("india")
            .which.is.an("array")
            .and.is.empty
        )
        it("has juliett array of strings", () => expect(entity)
            .to.have.property("juliett")
            .which.is.an("array")
            .and.is.deep.equal(["a", "b", "c", "d", "e"])
        )
        it("has kilo array of booleans", () => expect(entity)
            .to.have.property("kilo")
            .which.is.an("array")
            .and.is.deep.equal([true, false, false, true, true])
        )
        it("has mike equal to Foo", () => expect(entity)
            .to.have.property("mike")
            .which.is.a("string")
            .and.is.equal("Bar")
        )
        it("has november equal to 0", () => expect(entity)
            .to.have.property("november")
            .which.is.a("number")
            .and.is.equal(0)
        )
        it("has oscar a Entity1", () => expect(entity)
            .to.have.property("oscar")
            .which.is.instanceOf(Entity1)
            .and.is.deep.equal({ a: 8, b: 9 })
        )
        it("has papa a Entity1", () => expect(entity)
            .to.have.property("papa")
            .which.is.instanceOf(Entity1)
            .and.is.deep.equal({ a: 12, b: 13 })
        )
        it("has quebec undefined", () => expect(entity)
            .to.have.property("quebec")
            .which.is.undefined
        )
        it("quebec can be assigned and it always filtered", () => {
            const entity = new Entity3()
            entity.quebec = 2
            expect(entity.quebec, "assigned 2").to.be.equal(2)
            entity["quebec"] = 7
            expect(entity.quebec, "assigned 7").to.be.equal(7)
            entity.quebec = 1
            expect(entity.quebec, "assigned 1").to.be.equal(1)
            entity["quebec"] = 10
            expect(entity.quebec, "assigned 10").to.be.equal(10)
            entity.quebec = 0
            expect(entity.quebec, "assigned 0").to.be.equal(10)
            entity["quebec"] = 11
            expect(entity.quebec, "assigned 11").to.be.equal(10)
            entity.quebec = -1
            expect(entity.quebec, "assigned -1").to.be.equal(10)
            entity.quebec = 6
            expect(entity.quebec, "assigned 6").to.be.equal(6)
        })
        it("can serialize", () =>
            expect(SerializerFactory.getSerializer(Entity3).write(entity)).to.equal(entity3Value)
        )
        it("has correct nested property", () => {
            expect(Grammar.getAttribute(Entity3, ["romeo", "b"]).type).to.equal(Number)
            expect(Grammar.getAttribute(Entity3, ["sierra", "someString2"]).type).to.equal(String)
            expect(Grammar.getAttribute(Entity3, ["sierra", "someObjectString"]).type).to.equal(String)
            expect(Grammar.getAttribute(Entity3, ["sierra", "someObjectString"]).type).to.equal(String)
            expect(Grammar.getAttribute(Entity3, ["sierra", "someEntity", "b"]).type).to.equal(Number)
        })
    })

    context("Entity4", () => {
        const entity = new Entity4()
        before(() => {
            initializeSerializerFactory()
            SerializerFactory.registerSerializer(
                Entity4,
                new Serializer(
                    Entity4,
                    (entity, v) => `Begin\n${v}\nEnd`,
                    "\n",
                    false,
                    " => ",
                    k => `  \${${k}}`
                )
            )
        })
        it("has array of Entity1", () =>
            expect(Entity4.attributes.second.type).to.deep.equal([Entity1])
        )
        it("can serialize", () =>
            expect(SerializerFactory.getSerializer(Entity4).write(entity)).to.equal(entity4Value)
        )
    })
})
