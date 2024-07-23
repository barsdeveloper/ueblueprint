// @ts-nocheck

import StringEntity from "../js/entity/StringEntity.js"
import initializeSerializerFactory from "../js/serialization/initializeSerializerFactory.js"
import { expect, test } from "./fixtures/test.js"
import Entity1 from "./resources/Entity1.js"
import Entity2 from "./resources/Entity2.js"
import Entity3 from "./resources/Entity3.js"
import Entity4 from "./resources/Entity4.js"
import entity2Value1 from "./resources/serializedEntity2-1.js"
import entity2Value from "./resources/serializedEntity2.js"
import entity3Value from "./resources/serializedEntity3.js"
import entity4Value from "./resources/serializedEntity4.js"

test.beforeAll(() => initializeSerializerFactory())

test.describe.configure({ mode: "parallel" })

test("Entity2", () => {
    const value = new Entity2()
    expect(Object.keys(value)).toHaveLength(9)
    expect(value.serialize()).toEqual(entity2Value)
    const other = new Entity2({ someString2: new StringEntity("gamma") })
    expect(value.equals(other)).toBeFalsy()
    other.someString2 = new StringEntity("beta")
    expect(value.equals(other)).toBeTruthy()
})

test("Entity2-1", () => {
    Entity2.attributes.someEntity = Entity2.attributes.someEntity.flagInlined()
    const value = new Entity2()
    expect(value.serialize()).toEqual(entity2Value1)
})

test("Entity3", () => {
    let value = new Entity3()
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
        // "quebec", // Not defined by default
        "romeo",
        "sierra",
    ]
    expect(Object.keys(value)).toStrictEqual(keys)
    expect(value.serialize()).toEqual(entity3Value)
})

test("Entity4", () => {
    Entity1.attributeSeparator = " - "
    Entity1.keySeparator = ":"
    Entity1.printKey = k => k.toUpperCase()
    Entity1.wrap = (entity, v) => `E1[${v}]`
    const entity = new Entity4()
    expect(entity.serialize()).toEqual(entity4Value)
})
