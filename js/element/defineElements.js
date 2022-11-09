import ColorHandlerElement from "./ColorHandlerElement"
import ColorSliderElement from "./ColorSliderElement"
import InputElement from "./InputElement"
import LinkElement from "./LinkElement"
import NodeElement from "./NodeElement"
import PinElement from "./PinElement"
import SelectorElement from "./SelectorElement"
import WindowElement from "./WindowElement"

export default function defineElements() {
    customElements.define("ueb-color-handler", ColorHandlerElement)
    customElements.define("ueb-input", InputElement)
    customElements.define("ueb-link", LinkElement)
    customElements.define("ueb-node", NodeElement)
    customElements.define("ueb-pin", PinElement)
    customElements.define("ueb-selector", SelectorElement)
    customElements.define("ueb-ui-slider", ColorSliderElement)
    customElements.define("ueb-window", WindowElement)
}