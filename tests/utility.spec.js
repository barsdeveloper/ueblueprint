import Utility from "../js/Utility.js"
import { expect, test } from "./fixtures/test.js"

test("clamp method test", () => {
    expect(Utility.clamp(-4, -3)).toBe(-3)
    expect(Utility.clamp(-1, -3, -2)).toBe(-2)
    expect(Utility.clamp(5, 1, 11)).toBe(5)
})
test("minDecimals method test", () => {
    expect(Utility.minDecimals(3.1, 3)).toBe("3.100")
    expect(Utility.minDecimals(-100, 2)).toBe("-100.00")
    expect(Utility.minDecimals(0.43, 0)).toBe("0.43")
    expect(Utility.minDecimals(0.43, 1)).toBe("0.43")
    expect(Utility.minDecimals(0.43, 2)).toBe("0.43")
    expect(Utility.minDecimals(0.43, 3)).toBe("0.430")
    expect(Utility.minDecimals(-2, 0)).toBe("-2")
})
test("roundDecimals method test", () => {
    expect(Utility.roundDecimals(8.543943, 0)).toBe(9)
    expect(Utility.roundDecimals(8.543943, 1)).toBe(8.5)
    expect(Utility.roundDecimals(8.543943, 2)).toBe(8.54)
    expect(Utility.roundDecimals(8.543943, 3)).toBe(8.544)
    expect(Utility.roundDecimals(-2.192837, 0)).toBe(-2)
    expect(Utility.roundDecimals(-2.192837, 1)).toBe(-2.2)
    expect(Utility.roundDecimals(-2.192837, 2)).toBe(-2.19)
    expect(Utility.roundDecimals(-2.192837, 3)).toBe(-2.193)
    expect(Utility.roundDecimals(-2.192837, 4)).toBe(-2.1928)
})
test("approximatelyEqual method test", () => {
    expect(Utility.approximatelyEqual(0.2 + 0.1, 0.3)).toBeTruthy()
    expect(Utility.approximatelyEqual(-0.2 - 0.1, -0.3)).toBeTruthy()
    expect(Utility.approximatelyEqual(0.1000001, 0.1)).toBeFalsy()
    expect(Utility.approximatelyEqual(40.1 + 0.2, 40.3)).toBeTruthy()
    expect(Utility.approximatelyEqual(2, 3)).toBeFalsy()
})
test("equals method test", () => {
    expect(Utility.equals(0.2, 0.2)).toBeTruthy()
    expect(Utility.equals(new Number(0.7), 0.7)).toBeTruthy()
    expect(Utility.equals(-40.3, new Number(-40.3))).toBeTruthy()
    expect(Utility.equals(new Number(-40.3), new Number(-40.3))).toBeTruthy()
    expect(Utility.equals(0.2 + 0.1, 0.3)).toBeFalsy() // Strict equality
    expect(Utility.equals(null, undefined)).toBeFalsy()
    expect(Utility.equals(undefined, null)).toBeFalsy()
    expect(Utility.equals(0, false)).toBeFalsy()
    expect(Utility.equals(false, false)).toBeTruthy()
    expect(Utility.equals(2n, 2)).toBeTruthy()
    expect(Utility.equals(-6845, -6845n)).toBeTruthy()
    expect(Utility.equals(7735n, 7736)).toBeFalsy()
    expect(Utility.equals("abc", "abc")).toBeTruthy()
    expect(Utility.equals(new String("abc"), new String("abc"))).toBeTruthy()
    expect(Utility.equals("abc", "aBc")).toBeFalsy()
    expect(Utility.equals(
        [-2, "alpha", new String("beta"), new Number(40), [1, 2, 3]],
        [new Number(-2), new String("alpha"), new String("beta"), new Number(40), new Array(1, 2, 3)]
    )).toBeTruthy()
    expect(Utility.equals(
        [-2.1, "alpha", new String("beta"), new Number(40), [1, 2, 3]],
        [new Number(-2), new String("alpha"), new String("beta"), new Number(40), new Array(1, 2, 3)]
    )).toBeFalsy() // First element is different
    expect(Utility.equals(
        [-2, "Alpha", new String("beta"), new Number(40), [1, 2, 3]],
        [new Number(-2), new String("alpha"), new String("beta"), new Number(40), new Array(1, 2, 3)]
    )).toBeFalsy() // Second element is different
})
test("isValueOfType method test", () => {
    expect(Utility.isValueOfType(34, Number)).toBeTruthy()
    expect(Utility.isValueOfType(new Number(34), Number)).toBeTruthy()
    expect(Utility.isValueOfType("34", String)).toBeTruthy()
    expect(Utility.isValueOfType("34", Number)).toBeFalsy()
})
test("mergeArrays method test", () => {
    expect(Utility.mergeArrays(
        [],
        []
    )).toStrictEqual(
        []
    )
    expect(Utility.mergeArrays(
        ["alpba", "beta"],
        []
    )).toStrictEqual(
        ["alpba", "beta"]
    )
    expect(Utility.mergeArrays(
        [],
        ["alpba", "beta"]
    )).toStrictEqual(
        ["alpba", "beta"]
    )
    expect(Utility.mergeArrays(
        [1, 3, 5, 7, 9],
        [1, 2, 3, 4, 5]
    )).toStrictEqual(
        [1, 2, 3, 4, 5, 7, 9]
    )
    expect(Utility.mergeArrays(
        [6, 7, 8],
        [1, 2, 3]
    )).toStrictEqual(
        [6, 7, 8, 1, 2, 3]
    )
    expect(Utility.mergeArrays(
        ["e", "f", "g", "h"],
        ["a", "b", "c", "d"]
    )).toStrictEqual(
        ["e", "f", "g", "h", "a", "b", "c", "d"]
    )
    expect(Utility.mergeArrays(
        ["e", "f", "g", "h"],
        ["a", "b", "c", "d", "e"]
    )).toStrictEqual(
        ["a", "b", "c", "d", "e", "f", "g", "h"]
    )
    expect(Utility.mergeArrays(
        [2, 4, 6, 8],
        [6, 4, 2]
    )).toStrictEqual(
        [2, 4, 6, 8]
    )
    expect(Utility.mergeArrays(
        [2, 4, 6, 8],
        [4, 5, 6, 8, 1, 2]
    )).toStrictEqual(
        [2, 4, 5, 6, 8, 1]
    )
})
test("capitalFirstLetter method test", () => {
    expect(Utility.capitalFirstLetter("")).toBe("")
    expect(Utility.capitalFirstLetter("hello world")).toBe("Hello world")
})
test("range method test", () => {
    expect(Utility.range()).toStrictEqual([])
    expect(Utility.range(5, 5)).toStrictEqual([])
    expect(Utility.range(5, 6)).toStrictEqual([5])
    expect(Utility.range(1, 10, 3)).toStrictEqual([1, 4, 7])
    expect(Utility.range(0, -3)).toStrictEqual([0, -1, -2])
    expect(Utility.range(7, -7, -4)).toStrictEqual([7, 3, -1, -5])
})
test("String escaping methods test", () => {
    expect(Utility.escapeString("")).toBe("")
    expect(Utility.unescapeString("")).toBe("")

    expect(Utility.escapeString('"')).toBe('\\"')
    expect(Utility.unescapeString('\\"')).toBe('"')

    expect(Utility.escapeString("'")).toBe("\\'")
    expect(Utility.unescapeString("\\'")).toBe("'")

    expect(Utility.escapeString(String.raw`\"`)).toBe(String.raw`\\\"`)
    expect(Utility.unescapeString(String.raw`\"`)).toBe('"')

    expect(Utility.escapeString(String.raw`\'`)).toBe(String.raw`\\\'`)
    expect(Utility.unescapeString(String.raw`\'`)).toBe("'")

    expect(Utility.escapeString(String.raw`Hello \"World\"`)).toBe(String.raw`Hello \\\"World\\\"`)
    expect(Utility.unescapeString(String.raw`Hello \"World\"`)).toBe('Hello "World"')

    expect(Utility.escapeString(String.raw`Those "\\" are two backslash`))
        .toBe(String.raw`Those \"\\\\\" are two backslash`)
    expect(Utility.unescapeString(String.raw`Those "\\" are two backslash`))
        .toBe(String.raw`Those "\" are two backslash`)

    expect(Utility.escapeString(String.raw`Alpha\Beta`)).toBe(String.raw`Alpha\\Beta`)
    expect(Utility.unescapeString(String.raw`Alpha\Beta`)).toBe(String.raw`Alpha\Beta`)

    expect(Utility.escapeString(String.raw`Alpha\\Beta`)).toBe(String.raw`Alpha\\\\Beta`)
    expect(Utility.unescapeString(String.raw`Alpha\\Beta`)).toBe(String.raw`Alpha\Beta`)

    expect(Utility.escapeString(String.raw`Alpha\\\Beta`)).toBe(String.raw`Alpha\\\\\\Beta`)
    expect(Utility.unescapeString(String.raw`Alpha\\\Beta`)).toBe(String.raw`Alpha\\Beta`)

    expect(Utility.escapeString(String.raw`Alpha\\\\Beta`)).toBe(String.raw`Alpha\\\\\\\\Beta`)
    expect(Utility.unescapeString(String.raw`Alpha\\\\Beta`)).toBe(String.raw`Alpha\\Beta`)

    expect(Utility.escapeString(String.raw`Alpha\\\\\Beta`)).toBe(String.raw`Alpha\\\\\\\\\\Beta`)
    expect(Utility.unescapeString(String.raw`Alpha\\\\\Beta`)).toBe(String.raw`Alpha\\\Beta`)

    expect(Utility.escapeString(String.raw`Alpha\\\\\\Beta`)).toBe(String.raw`Alpha\\\\\\\\\\\\Beta`)
    expect(Utility.unescapeString(String.raw`Alpha\\\\\\Beta`)).toBe(String.raw`Alpha\\\Beta`)

    expect(Utility.escapeString(String.raw`Alpha \"Beta\"`)).toBe(String.raw`Alpha \\\"Beta\\\"`)
    expect(Utility.unescapeString(String.raw`Alpha \"Beta\"`)).toBe(String.raw`Alpha "Beta"`)

    expect(Utility.escapeString(String.raw`Alpha \\"Beta\\"`)).toBe(String.raw`Alpha \\\\\"Beta\\\\\"`)
    expect(Utility.unescapeString(String.raw`Alpha \\"Beta\\"`)).toBe(String.raw`Alpha \"Beta\"`)

    expect(Utility.escapeString('Alpha\nBravo\\Charlie\n"Delta"')).toBe(
        String.raw`Alpha\nBravo\\Charlie\n\"Delta\"`
    )
    expect(Utility.unescapeString(String.raw`Alpha\nBravo\\Charlie\n\"Delta\"`)).toBe(
        `Alpha\nBravo\\Charlie\n"Delta"`
    )
})
