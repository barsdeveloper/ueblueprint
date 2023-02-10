/// <reference types="cypress" />

import Blueprint from "../../js/Blueprint"
import Utility from "../../js/Utility"

/** @param {String[]} words */
export function getFirstWordOrder(words) {
    return new RegExp("(?:.|\\n)*" + words.map(word => word + "(?:.|\\n)+").join("") + "(?:.|\\n)+")
}

/** @param {() => Blueprint} getBlueprint */
export function generateNodeTest(nodeTest, getBlueprint) {
    context(nodeTest.name, () => {
        /** @type {NodeElement} */
        let node

        before(() => {
            getBlueprint().removeGraphElement(...getBlueprint().getNodes())
            Utility.paste(getBlueprint(), nodeTest.value)
            node = getBlueprint().querySelector("ueb-node")
        })
        it("Has correct color", () => expect(node.entity.nodeColor()).to.be.deep.equal(nodeTest.color))
        it("Has correct delegate", () => {
            const delegate = node.querySelector('.ueb-node-top ueb-pin[data-type="delegate"]')
            if (nodeTest.delegate) {
                expect(delegate).to.not.be.null
            } else {
                expect(delegate).to.be.null
            }
        })
        it("It's called " + nodeTest.name, () => expect(node.getNodeDisplayName()).to.be.equal(nodeTest.name))
        it("Has the correct icon", () => expect(node.entity.nodeIcon()).to.be.deep.equal(nodeTest.icon))
        it(`Has ${nodeTest.pins} pins`, () => expect(node.querySelectorAll("ueb-pin")).to.be.lengthOf(nodeTest.pins))
        it("Expected development", () => expect(node.entity.isDevelopmentOnly()).equals(nodeTest.development))
        it("Maintains the order of attributes", () => {
            getBlueprint().selectAll()
            const value = getBlueprint().template.getCopyInputObject().getSerializedText()
            const words = value.split("\n").map(row => row.match(/\s*(\w+(\s+\w+)*).+/)?.[1]).filter(v => v?.length > 0)
            return expect(value).to.match(getFirstWordOrder(words))
        })
    })
}