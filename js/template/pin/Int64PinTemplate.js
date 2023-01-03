import { html } from "lit"
import IntInputPinTemplate from "./IntPinTemplate"
import INumericInputPinTemplate from "./INumericInputPinTemplate"

/** @typedef {import("../../entity/IntegerEntity").default} IntegerEntity */

export default class Int64InputPinTemplate extends IntInputPinTemplate {

    /** @param {String[]} values */
    setInputs(values = [], updateDefaultValue = false) {
        if (!values || values.length == 0) {
            values = [this.getInput()]
        }
        super.setInputs(values, false)
        if (updateDefaultValue) {
            if (!values[0].match(/[\-\+]?[0-9]+/)) {
                return
            }
            const parsedValues = [BigInt(values[0])]
            this.setDefaultValue(parsedValues, values)
        }
    }
}
