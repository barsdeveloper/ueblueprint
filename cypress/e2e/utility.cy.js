/// <reference types="cypress" />

import IEntity from "../../js/entity/IEntity"
import Utility from "../../js/Utility"

describe("Utility class", () => {
    before(() => {
        expect(Utility,).to.be.a("function")
    })

    context("Utility", () => {
        it("clamp method test", () => {
            expect(Utility.clamp(-4, -3)).to.be.equal(-3)
            expect(Utility.clamp(-1, -3, -2)).to.be.equal(-2)
            expect(Utility.clamp(5, 1, 11)).to.be.equal(5)
        })
        it("minDecimals method test", () => {
            expect(Utility.minDecimals(3.1, 3)).to.be.equal("3.100")
            expect(Utility.minDecimals(-100, 2)).to.be.equal("-100.00")
            expect(Utility.minDecimals(0.43, 0)).to.be.equal("0.43")
            expect(Utility.minDecimals(0.43, 1)).to.be.equal("0.43")
            expect(Utility.minDecimals(0.43, 2)).to.be.equal("0.43")
            expect(Utility.minDecimals(0.43, 3)).to.be.equal("0.430")
            expect(Utility.minDecimals(-2, 0)).to.be.equal("-2")
        })
        it("roundDecimals method test", () => {
            expect(Utility.roundDecimals(8.543943, 0)).to.be.equal(9)
            expect(Utility.roundDecimals(8.543943, 1)).to.be.equal(8.5)
            expect(Utility.roundDecimals(8.543943, 2)).to.be.equal(8.54)
            expect(Utility.roundDecimals(8.543943, 3)).to.be.equal(8.544)
            expect(Utility.roundDecimals(-2.192837, 0)).to.be.equal(-2)
            expect(Utility.roundDecimals(-2.192837, 1)).to.be.equal(-2.2)
            expect(Utility.roundDecimals(-2.192837, 2)).to.be.equal(-2.19)
            expect(Utility.roundDecimals(-2.192837, 3)).to.be.equal(-2.193)
            expect(Utility.roundDecimals(-2.192837, 4)).to.be.equal(-2.1928)
        })
        it("approximatelyEqual method test", () => {
            expect(Utility.approximatelyEqual(0.2 + 0.1, 0.3)).to.be.true
            expect(Utility.approximatelyEqual(-0.2 - 0.1, -0.3)).to.be.true
            expect(Utility.approximatelyEqual(0.1000001, 0.1)).to.be.false
            expect(Utility.approximatelyEqual(40.1 + 0.2, 40.3)).to.be.true
            expect(Utility.approximatelyEqual(2, 3)).to.be.false
        })
        it("equals method test", () => {
            expect(Utility.equals(0.2, 0.2)).to.be.true
            expect(Utility.equals(new Number(0.7), 0.7)).to.be.true
            expect(Utility.equals(-40.3, new Number(-40.3))).to.be.true
            expect(Utility.equals(new Number(-40.3), new Number(-40.3))).to.be.true
            expect(Utility.equals(0.2 + 0.1, 0.3)).to.be.false // Strict equality
            expect(Utility.equals(null, undefined)).to.be.false
            expect(Utility.equals(undefined, null)).to.be.false
            expect(Utility.equals(0, false)).to.be.false
            expect(Utility.equals(false, false)).to.be.true
            expect(Utility.equals(2n, 2)).to.be.true
            expect(Utility.equals(-6845, -6845n)).to.be.true
            expect(Utility.equals(7735n, 7736)).to.be.false
            expect(Utility.equals("abc", "abc")).to.be.true
            expect(Utility.equals(new String("abc"), new String("abc"))).to.be.true
            expect(Utility.equals("abc", "aBc")).to.be.false
            expect(Utility.equals(
                [-2, "alpha", new String("beta"), new Number(40), [1, 2, 3]],
                [new Number(-2), new String("alpha"), new String("beta"), new Number(40), new Array(1, 2, 3)]
            )).to.be.true
            expect(Utility.equals(
                [-2.1, "alpha", new String("beta"), new Number(40), [1, 2, 3]],
                [new Number(-2), new String("alpha"), new String("beta"), new Number(40), new Array(1, 2, 3)]
            )).to.be.false // First element is different
            expect(Utility.equals(
                [-2, "Alpha", new String("beta"), new Number(40), [1, 2, 3]],
                [new Number(-2), new String("alpha"), new String("beta"), new Number(40), new Array(1, 2, 3)]
            )).to.be.false // Second element is different
            expect(Utility.equals(
                new Set(["alpha", -67, new String("beta"), [1, 2, 3]]),
                new Set([-67, "beta", new String("alpha"), [1, 2, 3]])
            )).to.be.true
            expect(Utility.equals( // First element has capital Beta
                new Set(["alpha", -67, new String("Beta"), [1, 2, 3]]),
                new Set([-67, "beta", new String("alpha"), [1, 2, 3]])
            )).to.be.false
            expect(Utility.equals( // First element has capital Beta
                new Set(["alpha", -67, new String("beta"), [1, 2, 3]]),
                new Set([-67, "beta", new String("alpha"), [1, 3]])
            )).to.be.false
            expect(Utility.equals( // Different number of elements
                new Set([2, 4, 6, 8]),
                new Set([8, 6, 4])
            )).to.be.false
            expect(Utility.equals( // Second element has different type
                new Set([4, "6", 8]),
                new Set([8, 6, 4])
            )).to.be.false
            expect(Utility.equals(
                new Set([new IEntity({ a: "alpha", b: new String("beta") })]),
                new Set([new IEntity({ a: "alpha", b: new String("beta") })]),
            )).to.be.true
            expect(Utility.equals( // First a key has a number
                new Set([new IEntity({ a: 2, b: new String("beta") })]),
                new Set([new IEntity({ a: "alpha", b: new String("beta") })]),
            )).to.be.false
        })
        it("isValueOfType method test", () => {
            expect(Utility.isValueOfType(34, Number)).to.be.true
            expect(Utility.isValueOfType(new Number(34), Number)).to.be.true
            expect(Utility.isValueOfType("34", String)).to.be.true
            expect(Utility.isValueOfType("34", Number)).to.be.false
        })
        it("mergeArrays method test", () => {
            expect(Utility.mergeArrays(
                [],
                []
            )).to.be.deep.equal(
                []
            )
            expect(Utility.mergeArrays(
                ["alpba", "beta"],
                []
            )).to.be.deep.equal(
                ["alpba", "beta"]
            )
            expect(Utility.mergeArrays(
                [],
                ["alpba", "beta"]
            )).to.be.deep.equal(
                ["alpba", "beta"]
            )
            expect(Utility.mergeArrays(
                [1, 3, 5, 7, 9],
                [1, 2, 3, 4, 5]
            )).to.be.deep.equal(
                [1, 2, 3, 4, 5, 7, 9]
            )
            expect(Utility.mergeArrays(
                [6, 7, 8],
                [1, 2, 3]
            )).to.be.deep.equal(
                [6, 7, 8, 1, 2, 3]
            )
            expect(Utility.mergeArrays(
                ["e", "f", "g", "h"],
                ["a", "b", "c", "d"]
            )).to.be.deep.equal(
                ["e", "f", "g", "h", "a", "b", "c", "d"]
            )
            expect(Utility.mergeArrays(
                ["e", "f", "g", "h"],
                ["a", "b", "c", "d", "e"]
            )).to.be.deep.equal(
                ["a", "b", "c", "d", "e", "f", "g", "h"]
            )
            expect(Utility.mergeArrays(
                [2, 4, 6, 8],
                [6, 4, 2]
            )).to.be.deep.equal(
                [2, 4, 6, 8]
            )
            expect(Utility.mergeArrays(
                [2, 4, 6, 8],
                [4, 5, 6, 8, 1, 2]
            )).to.be.deep.equal(
                [2, 4, 5, 6, 8, 1]
            )
        })
        it("capitalFirstLetter method test", () => {
            expect(Utility.capitalFirstLetter("")).to.be.equal("")
            expect(Utility.capitalFirstLetter("hello world")).to.be.equal("Hello world")
        })
        it("range method test", () => {
            expect(Utility.range()).to.be.deep.equal([])
            expect(Utility.range(5, 5)).to.be.deep.equal([])
            expect(Utility.range(5, 6)).to.be.deep.equal([5])
            expect(Utility.range(1, 10, 3)).to.be.deep.equal([1, 4, 7])
            expect(Utility.range(0, -3)).to.be.deep.equal([0, -1, -2])
            expect(Utility.range(7, -7, -4)).to.be.deep.equal([7, 3, -1, -5])
        })
    })
})
