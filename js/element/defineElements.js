import ColorHandlerElement from "./ColorHandlerElement.js"
import ColorSliderElement from "./ColorSliderElement.js"
import ElementFactory from "./ElementFactory.js"
import InputElement from "./InputElement.js"
import LinkElement from "./LinkElement.js"
import NodeElement from "./NodeElement.js"
import PinElement from "./PinElement.js"
import SelectorElement from "./SelectorElement.js"
import WindowElement from "./WindowElement.js"

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
