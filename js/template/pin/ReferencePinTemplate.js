import SVGIcon from "../../SVGIcon.js"
import PinTemplate from "./PinTemplate.js"

export default class ReferencePinTemplate extends PinTemplate {

    renderIcon() {
        return SVGIcon.referencePin
    }
}
