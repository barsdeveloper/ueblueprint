import PinTemplate from "./PinTemplate.js"
import SVGIcon from "../../SVGIcon.js"

export default class ReferencePinTemplate extends PinTemplate {

    renderIcon() {
        return SVGIcon.referencePin
    }
}
