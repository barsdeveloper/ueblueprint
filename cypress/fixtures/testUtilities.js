/// <reference types="cypress" />

import Blueprint from "../../js/Blueprint.js"
import Utility from "../../js/Utility.js"

/** @param {String[]} words */
function getFirstWordOrder(words) {
    return new RegExp("\\s*" + words.join("[^\\n]+\\n\\s*") + "\\s*")
}

/** @param {() => Blueprint} getBlueprint */
function generateNodeTest(nodeTest, getBlueprint) {
    context(nodeTest.name, () => {
        /** @type {NodeElement} */
        let node
        if (nodeTest.title === undefined) {
            nodeTest.title = nodeTest.name
        }

        before(() => {
            getBlueprint().removeGraphElement(...getBlueprint().getNodes())
            Utility.paste(getBlueprint(), nodeTest.value)
            node = getBlueprint().querySelector("ueb-node")
        })
        if (nodeTest.color) {
            it("Has correct color", () => expect(node.entity.nodeColor()).to.be.deep.equal(nodeTest.color))
        }
        it("Has correct delegate", () => {
            const delegate = node.querySelector('.ueb-node-top ueb-pin[data-type="delegate"]')
            if (nodeTest.delegate) {
                expect(delegate).to.not.be.null
            } else {
                expect(delegate).to.be.null
            }
        })
        if (nodeTest.title) {
            it("Has title " + nodeTest.title, () => expect(node.getNodeDisplayName()).to.be.equal(nodeTest.title))
        }
        it(
            "Has expected subtitle " + nodeTest.subtitle,
            () => expect(node.querySelector(".ueb-node-subtitle-text")?.innerText).to.be.equal(nodeTest.subtitle))
        if (nodeTest.icon) {
            it("Has the correct icon", () => expect(node.entity.nodeIcon()).to.be.deep.equal(nodeTest.icon))
        } else if (nodeTest.icon === false) {
            it("It does not have an icon", () => expect(node.entity.nodeIcon()).to.be.undefined)
        }
        if (nodeTest.pins) {
            it(`Has ${nodeTest.pins} pins`, () => expect(node.querySelectorAll("ueb-pin"))
                .to.be.lengthOf(nodeTest.pins))
        }
        if (nodeTest.pinNames) {
            it(
                "Has correct pin names",
                () => expect(
                    [...node.querySelectorAll(".ueb-pin-content")]
                        .map(elem =>
                            /** @type {HTMLElement} */(elem.querySelector(".ueb-pin-name") ?? elem).innerText.trim()
                        )
                        .filter(name => name.length)
                )
                    .to.be.deep.equal(nodeTest.pinNames))
        }
        it("Expected development", () => expect(node.entity.isDevelopmentOnly()).equals(nodeTest.development))
        it("Maintains the order of attributes", () => {
            getBlueprint().selectAll()
            const value = getBlueprint().template.getCopyInputObject().getSerializedText()
            const words = value.split("\n").map(row => row.match(/\s*(\w+(\s+\w+)*).+/)?.[1]).filter(v => v?.length > 0)
            expect(value).to.match(getFirstWordOrder(words))
        })
        if (nodeTest.additionalTest) {
            it("Additional tests", () => {
                nodeTest.additionalTest(node)
            })
        }
    })
}

export default function generateNodesTests(tests) {

    /** @type {Blueprint} */
    let blueprint

    before(() => {
        cy.visit(`http://127.0.0.1:${Cypress.env("UEBLUEPRINT_TEST_SERVER_PORT")}/empty.html`, {
            onLoad: () => {
                cy.get("ueb-blueprint").then(b => blueprint = b[0]).click(100, 300)
            }
        })
    })

    tests.forEach(testObject => generateNodeTest(testObject, () => blueprint))
}
