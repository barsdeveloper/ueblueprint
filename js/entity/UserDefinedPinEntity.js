import IEntity from "./IEntity.js"
import PinEntity from "./PinEntity.js"

/** @typedef {import("./IEntity.js").AnyValue} AnyValue */

export default class UserDefinedPinEntity extends IEntity {

    static lookbehind = "UserDefinedPin"
}
