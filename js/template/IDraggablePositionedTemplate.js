import IDraggableTemplate from "./IDraggableTemplate.js"

/**
 * @template {IDraggableElement} T
 * @extends {IDraggableTemplate<T>}
 */
export default class IDraggablePositionedTemplate extends IDraggableTemplate {

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        if (changedProperties.has("locationX")) {
            this.element.style.left = `${this.element.locationX}px`
        }
        if (changedProperties.has("locationY")) {
            this.element.style.top = `${this.element.locationY}px`
        }
    }
}
