import Utility from "../Utility"
import IntegerEntity from "./IntegerEntity"

export default class ColorChannelValueEntity extends IntegerEntity {

    static attributes = {
        value: Number,
    }

    /** @param {Object | Number | String} options */
    constructor(options = 0) {
        super(options)
        this.value = Utility.clamp(this.value, 0, 255)
    }
}
