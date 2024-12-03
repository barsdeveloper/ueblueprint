import IInputPinTemplate from "./IInputPinTemplate.js"

/**
 * @template {IEntity} T
 * @extends IInputPinTemplate<T>
 */
export default class INumericPinTemplate extends IInputPinTemplate {

    static singleLineInput = true

    /**
     * @this {INumericPinTemplate<NumberEntity>}
     * @param {String[]} values
     */
    setInputs(values = [], updateDefaultValue = false) {
        if (!values || values.length == 0) {
            values = [this.getInput()]
        }
        super.setInputs(values, false)
        if (updateDefaultValue) {
            let parsedValues = []
            for (const value of values) {
                let num = parseFloat(value)
                if (isNaN(num)) {
                    num = 0
                    updateDefaultValue = false
                }
                parsedValues.push(num)
            }
            this.setDefaultValue(parsedValues, values)
        }
    }

    /**
     * @this {INumericPinTemplate<NumberEntity>}
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values = [], rawValues) {
        const value = this.element.getDefaultValue()
        value.value = values[0]
        this.element.setDefaultValue(value)
        this.element.requestUpdate()
    }
}
