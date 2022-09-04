import ITemplate from "./ITemplate"
import MouseMoveNodes from "../input/mouse/MouseMoveNodes"

/**
 * @typedef {import("../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 */

/**
 * @template {ISelectableDraggableElement} T
 * @extends {ITemplate<T>}
 */
export default class SelectableDraggableTemplate extends ITemplate {

    /**
     * @param {T} element
     */
    createInputObjects(element) {
        return [
            ...super.createInputObjects(element),
            new MouseMoveNodes(element, element.blueprint, {
                looseTarget: true
            }),
        ]
    }

    /**
     * @param {T} element
     * @param {Map} changedProperties
     */
    update(element, changedProperties) {
        super.update(element, changedProperties)
        if (changedProperties.has("locationX")) {
            element.style.setProperty("--ueb-position-x", `${element.locationX}`)
        }
        if (changedProperties.has("locationY")) {
            element.style.setProperty("--ueb-position-y", `${element.locationY}`)
        }
    }

    /**
     * @param {T} element
     * @param {Map} changedProperties
     */
    firstUpdated(element, changedProperties) {
        super.firstUpdated(element, changedProperties)
        if (element.selected && !element.listeningDrag) {
            element.setSelected(true)
        }
    }
}
