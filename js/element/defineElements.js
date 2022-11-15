import ColorHandlerElement from "./ColorHandlerElement"
import ColorSliderElement from "./ColorSliderElement"
import ElementFactory from "./ElementFactory"
import InputElement from "./InputElement"
import LinkElement from "./LinkElement"
import NodeElement from "./NodeElement"
import PinElement from "./PinElement"
import SelectorElement from "./SelectorElement"
import WindowElement from "./WindowElement"

export default function defineElements() {
    customElements.define("ueb-color-handler", ColorHandlerElement)
    ElementFactory.registerElement("ueb-color-handler", ColorHandlerElement)
    customElements.define("ueb-input", InputElement)
    ElementFactory.registerElement("ueb-input", InputElement)
    customElements.define("ueb-link", LinkElement)
    ElementFactory.registerElement("ueb-link", LinkElement)
    customElements.define("ueb-node", NodeElement)
    ElementFactory.registerElement("ueb-node", NodeElement)
    customElements.define("ueb-pin", PinElement)
    ElementFactory.registerElement("ueb-pin", PinElement)
    customElements.define("ueb-selector", SelectorElement)
    ElementFactory.registerElement("ueb-selector", SelectorElement)
    customElements.define("ueb-ui-slider", ColorSliderElement)
    ElementFactory.registerElement("ueb-ui-slider", ColorSliderElement)
    customElements.define("ueb-window", WindowElement)
    ElementFactory.registerElement("ueb-window", WindowElement)
}
