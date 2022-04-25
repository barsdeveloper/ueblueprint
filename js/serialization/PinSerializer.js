// @ts-check

import PinEntity from "../entity/PinEntity"
import Utility from "../Utility"
import GeneralSerializer from "./GeneralSerializer"

export default class PinSerializer extends GeneralSerializer {

    constructor() {
        super(v => `${PinEntity.lookbehind} (${v})`, PinEntity, "", ",", true)
    }

    writeValue(value, fullKey) {
        if (value?.constructor === String && fullKey == "DefaultValue") {
            // @ts-expect-error
            return `"${Utility.encodeInputString(value)}"`
        }
        return super.writeValue(value, fullKey)
    }
}
