import ITemplate from "./ITemplate.js"

/**
 * @template {IFromToPositionedElement} T
 * @extends {ITemplate<T>}
 */
export default class IFromToPositionedTemplate extends ITemplate {

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        const [originX, originY, targetX, targetY] = [
            Math.round(this.element.originX),
            Math.round(this.element.originY),
            Math.round(this.element.targetX),
            Math.round(this.element.targetY),
        ]
        const [left, top, width, height] = [
            Math.min(originX, targetX),
            Math.min(originY, targetY),
            Math.abs(originX - targetX),
            Math.abs(originY - targetY),
        ]
        if (changedProperties.has("originX") || changedProperties.has("targetX")) {
            this.element.style.left = `${left}px`
            this.element.style.width = `${width}px`
        }
        if (changedProperties.has("originY") || changedProperties.has("targetY")) {
            this.element.style.top = `${top}px`
            this.element.style.height = `${height}px`
        }
    }
}
