import { html } from "lit"
import FunctionReferenceEntity from "../../entity/FunctionReferenceEntity.js"
import ObjectReferenceEntity from "../../entity/ObjectReferenceEntity.js"
import PinTypeEntity from "../../entity/PinTypeEntity.js"
import StringEntity from "../../entity/StringEntity.js"
import MinimalPinTemplate from "./MinimalPinTemplate.js"

/** @extends MinimalPinTemplate<KnotEntity> */
export default class KnotPinTemplate extends MinimalPinTemplate {

    static #wildcardPinType = new PinTypeEntity({
        PinCategory: new StringEntity("wildcard"),
        PinSubCategoryObject: ObjectReferenceEntity.createNoneInstance(),
        PinSubCategoryMemberReference: new FunctionReferenceEntity(),
    })

    /** @param {PinTypeEntity} type */
    #setType(type) {
        const oppositePin = this.getoppositePin()
        this.element.entity.PinType.copyTypeFrom(type)
        oppositePin.entity.PinType.copyTypeFrom(type)
        this.element.updateType()
        oppositePin.updateType()
    }

    render() {
        return this.element.isOutput() ? super.render() : html``
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        if (changedProperties.has("isLinked")) {
            const oppositePin = this.getoppositePin()
            if (!this.element.isLinked && !oppositePin.isLinked) {
                this.#setType(KnotPinTemplate.#wildcardPinType)
            } else if (this.element.isLinked && this.element.pinType == "wildcard") {
                const type = this.element
                    .getLinks()
                    .map(r => this.blueprint.getPin(r))
                    .find(p => p && p.pinType != "wildcard")
                    ?.entity
                    .PinType
                if (type) {
                    /** @type {KnotPinTemplate[]} */
                    const propagated = [this]
                    for (let i = 0; i < propagated.length; ++i) {
                        let current = propagated[i]
                        current.#setType(type)
                        current = /** @type {KnotPinTemplate} */(current.getoppositePin().template)
                        current.#setType(type)
                        propagated.push(
                            ...current.element.getLinks().map(r => (
                        /** @type {KnotPinTemplate} */(
                                    this.blueprint.getPin(r).template
                                )
                            ))
                        )

                    }
                }
            }
        }
    }

    getoppositePin() {
        const nodeTemplate = /** @type {KnotNodeTemplate} */(this.element.nodeElement.template)
        return this.element.isOutput() ? nodeTemplate.inputPin : nodeTemplate.outputPin
    }

    /** Location on the grid of a link connecting to this pin */
    getLinkLocation(oppositeDirection = false) {
        if (this.element.isInput()) {
            return this.getoppositePin().getLinkLocation(!oppositeDirection)
        }
        return super.getLinkLocation(oppositeDirection)
    }
}
