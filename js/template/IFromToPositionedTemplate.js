import ITemplate from "./ITemplate.js"

/**
 * @template {IFromToPositionedElement} T
 * @extends {ITemplate<T>}
 */
export default class IFromToPositionedTemplate extends ITemplate {

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        const [fromX, fromY, toX, toY] = [
            Math.round(this.element.fromX),
            Math.round(this.element.fromY),
            Math.round(this.element.toX),
            Math.round(this.element.toY),
        ]
        const [left, top, width, height] = [
            Math.min(fromX, toX),
            Math.min(fromY, toY),
            Math.abs(fromX - toX),
            Math.abs(fromY - toY),
        ]
        if (changedProperties.has("fromX") || changedProperties.has("toX")) {
            this.element.style.left = `${left}px`
            this.element.style.width = `${width}px`
        }
        if (changedProperties.has("fromY") || changedProperties.has("toY")) {
            this.element.style.top = `${top}px`
            this.element.style.height = `${height}px`
        }
    }
}
