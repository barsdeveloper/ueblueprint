// @ts-nocheck

import { test, expect } from "./fixtures/test.js"
import Entity1 from "./resources/Entity1.js"
import Entity2 from "./resources/Entity2.js"
import entity2Value from "./resources/serializedEntity2.js"
import Entity3 from "./resources/Entity3.js"
import entity3Value from "./resources/serializedEntity3.js"
import Entity4 from "./resources/Entity4.js"
import entity4Value from "./resources/serializedEntity4.js"
import Entity5 from "./resources/Entity5.js"
import entity5Value1 from "./resources/serializedEntity5-1.js"
import EntityF from "./resources/EntityF.js"
import Grammar from "../js/serialization/Grammar.js"
import initializeSerializerFactory from "../js/serialization/initializeSerializerFactory.js"
import ObjectSerializer from "../js/serialization/ObjectSerializer.js"
import Serializer from "../js/serialization/Serializer.js"
import SerializerFactory from "../js/serialization/SerializerFactory.js"
import UnknownKeysEntity from "../js/entity/UnknownKeysEntity.js"

test.describe.configure({ mode: "parallel" })

test("Entity2", () => {
    const entity = new Entity2()
    initializeSerializerFactory()
    SerializerFactory.registerSerializer(
        Entity2,
        new Serializer(Entity2, (entity, v) => `{\n${v}\n}`, "\n", false, ": ", k => `    ${k}`)
    )
    SerializerFactory.registerSerializer(
        Entity1,
        new Serializer(Entity1, (entity, v) => `Entity1(${v})`, ", ", false, "=",)
    )
    expect(Object.keys(entity)).toHaveLength(8)
    expect(entity.someNumber).toBe(567)
    expect(entity.someString).toBe("alpha")
    expect(entity.someString2).toBe("beta")
    expect(entity.someBoolean).toBe(true)
    expect(entity.someBoolean2).toBe(false)
    expect(entity.someObjectString).toBe("gamma")
    expect(entity.someArray).toStrictEqual([400, 500, 600, 700, 800])

    expect(entity.equals(new Entity2())).toBeTruthy()

    const other = new Entity2({
        someString2: "gamma"
    })
    expect(entity.equals(other)).toBe(false)
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
    expect(other1.equals(other2)).toBeTruthy()
    expect(SerializerFactory.getSerializer(Entity2).write(entity)).toBe(entity2Value)
    expect(Grammar.getAttribute(Entity2, ["someEntity", "a"]).type).toBe(Number)
})

test("Entity3", () => {
    let entity = new Entity3()
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
    initializeSerializerFactory()
    SerializerFactory.registerSerializer(
        Entity3,
        new Serializer(Entity3, (entity, v) => `[[\n${v}\n]]`, "\n", false, ": ", k => `    ${k}`)
    )
    SerializerFactory.registerSerializer(
        Entity1,
        new Serializer(Entity1, (entity, v) => `Entity1(${v})`, ", ", false, "=",)
    )
    expect(Object.keys(entity)).toHaveLength(keys.length)
    expect(Object.keys(entity)).toStrictEqual(keys)
    expect(entity.alpha).toBe(32)
    expect(entity.bravo).toBe(78)
    expect(entity.charlie).toBe("Charlie")
    expect(entity.delta).toBeNull()
    expect(entity.echo).toBe("echo")
    expect(entity.foxtrot).toBe(false)
    expect(entity.golf).toStrictEqual([])
    expect(entity.hotel).toBeNull()
    expect(entity.india).toStrictEqual([])
    expect(entity.juliett).toStrictEqual(["a", "b", "c", "d", "e"])
    expect(entity.kilo).toStrictEqual([true, false, false, true, true])
    expect(entity.mike).toBe("Bar")
    expect(entity.november).toBe(0)
    expect(entity.oscar).toStrictEqual(new Entity1({ a: 8, b: 9 }))
    expect(entity.papa).toStrictEqual(new Entity1({ a: 12, b: 13 }))
    expect(entity.quebec).toBeUndefined()

    entity = new Entity3()
    entity.quebec = 2
    expect(entity.quebec).toBe(2)
    entity["quebec"] = 7
    expect(entity.quebec).toBe(7)
    entity.quebec = 1
    expect(entity.quebec).toBe(1)
    entity["quebec"] = 10
    expect(entity.quebec).toBe(10)
    entity.quebec = 0
    expect(entity.quebec).toBe(10)
    entity["quebec"] = 11
    expect(entity.quebec).toBe(10)
    entity.quebec = -1
    expect(entity.quebec).toBe(10)
    entity.quebec = 6
    expect(entity.quebec).toBe(6)
    expect(SerializerFactory.getSerializer(Entity3).write(entity)).toBe(entity3Value)

    expect(Grammar.getAttribute(Entity3, ["romeo", "b"]).type).toBe(Number)
    expect(Grammar.getAttribute(Entity3, ["sierra", "someString2"]).type).toBe(String)
    expect(Grammar.getAttribute(Entity3, ["sierra", "someObjectString"]).type).toBe(String)
    expect(Grammar.getAttribute(Entity3, ["sierra", "someObjectString"]).type).toBe(String)
    expect(Grammar.getAttribute(Entity3, ["sierra", "someEntity", "b"]).type).toBe(Number)
})

test("Entity4", () => {
    const entity = new Entity4()
    initializeSerializerFactory()
    SerializerFactory.registerSerializer(
        Entity1,
        new Serializer(Entity1, (entity, v) => `E1[${v}]`, " - ", false, ":", k => k.toUpperCase())
    )
    SerializerFactory.registerSerializer(
        Entity4,
        new Serializer(Entity4, (entity, v) => `Begin\n${v}\nEnd`, "\n", false, " => ", k => `  \${${k}}`)
    )
    expect(Entity4.attributes.second.type).toStrictEqual([Entity1])
    expect(SerializerFactory.getSerializer(Entity4).write(entity)).toBe(entity4Value)
})

test("Entity5", () => {
    let entity = new Entity5()
    initializeSerializerFactory()
    SerializerFactory.registerSerializer(
        Entity5,
        new ObjectSerializer(Entity5)
    )
    SerializerFactory.registerSerializer(
        EntityF,
        new Serializer(UnknownKeysEntity, (entity, string) => `${entity.lookbehind ?? ""}(${string})`)
    )
    expect(entity = SerializerFactory.getSerializer(Entity5).read(entity5Value1)).toEqual({
        key1: "Value 1",
        key2: {
            lookbehind: "Foo",
            arg1: 55,
            arg2: "Argument 2",
        },
    })
    expect(entity.key2).toBeInstanceOf(EntityF)
    expect(SerializerFactory.getSerializer(Entity5).write(entity)).toBe(entity5Value1)
})
