// @ts-check

import PinEntity from "../entity/PinEntity"
import Utility from "../Utility"
import GeneralSerializer from "./GeneralSerializer"

export default class PinSerializer extends GeneralSerializer {

    constructor() {
        super(v => `${PinEntity.lookbehind} (${v})`, PinEntity, "", ",", true)
    }

    /**
     * @param {String[]} fullKey
     * @param {Boolean} insideString
     */
    writeValue(value, fullKey, insideString) {
        if (value?.constructor === String && fullKey.length == 1 && fullKey[0] == "DefaultValue") {
            // @ts-expect-error
            return `"${Utility.encodeInputString(value)}"`
        }
        return super.writeValue(value, fullKey, insideString)
    }
}
