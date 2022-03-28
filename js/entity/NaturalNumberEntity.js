// @ts-check

import IntegerEntity from "./IntegerEntity"
import Utility from "../Utility"

export default class NaturalNumberEntity extends IntegerEntity {

    constructor(options = {}) {
        super(options)
        this.value = Math.round(Utility.clamp(this.value, 0))
    }
}
