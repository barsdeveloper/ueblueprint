import Utility from "../Utility"
import IEntity from "./IEntity"

export default class LinearColorEntity extends IEntity {

    static attributes = {
        R: Number,
        G: Number,
        B: Number,
        A: Number,
    }

    toString() {
        return Utility.printLinearColor(this)
    }
}
