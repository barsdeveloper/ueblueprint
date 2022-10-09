import Utility from "../Utility"
import IntegerEntity from "./IntegerEntity"

export default class ColorChannelRealValueEntity extends IntegerEntity {

    toString() {
        return (this.value / 255).toFixed(6)
    }
}
