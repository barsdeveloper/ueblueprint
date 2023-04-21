import ColorHandlerElement from "./ColorHandlerElement.js"
import ColorSliderElement from "./ColorSliderElement.js"
import DropdownElement from "./DropdownElement.js"
import ElementFactory from "./ElementFactory.js"
import InputElement from "./InputElement.js"
import LinkElement from "./LinkElement.js"
import NodeElement from "./NodeElement.js"
import PinElement from "./PinElement.js"
import SelectorElement from "./SelectorElement.js"
import WindowElement from "./WindowElement.js"

export default function defineElements() {
    const define = (tag, type) => {
        customElements.define(tag, type)
        ElementFactory.registerElement(tag, type)
    }
    define("ueb-color-handler", ColorHandlerElement)
    define("ueb-dropdown", DropdownElement)
    define("ueb-input", InputElement)
    define("ueb-link", LinkElement)
    define("ueb-node", NodeElement)
    define("ueb-pin", PinElement)
    define("ueb-selector", SelectorElement)
    define("ueb-ui-slider", ColorSliderElement)
    define("ueb-window", WindowElement)
}
