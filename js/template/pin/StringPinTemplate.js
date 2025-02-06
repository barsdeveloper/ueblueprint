import IInputPinTemplate from "./IInputPinTemplate.js"

/** @extends IInputPinTemplate<StringEntity> */
export default class StringPinTemplate extends IInputPinTemplate {

    /**
     * @param {String[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values = [], rawValues) {
        const value = this.element.getDefaultValue()
        value.value = values[0]
        this.element.setDefaultValue(value)
        this.element.requestUpdate()
    }
}
