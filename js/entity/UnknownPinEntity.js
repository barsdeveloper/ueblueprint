import PinEntity from "./PinEntity.js"

export default class UnknownPinEntity extends PinEntity {

    static lookbehind = ""

    constructor(values = {}) {
        super(values, true)
    }
}
