// @ts-check

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
}
