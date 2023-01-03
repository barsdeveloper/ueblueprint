import IntPinTemplate from "./IntPinTemplate"

/** @typedef {import("../../entity/IntegerEntity").default} IntegerEntity */

export default class Int64PinTemplate extends IntPinTemplate {

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
