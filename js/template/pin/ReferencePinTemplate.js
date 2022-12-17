import PinTemplate from "./PinTemplate"
import SVGIcon from "../../SVGIcon"

export default class ReferencePinTemplate extends PinTemplate {

    renderIcon() {
        return SVGIcon.referencePin
    }
}
