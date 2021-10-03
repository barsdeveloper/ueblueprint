import UMouseWheel from "./UMouseWheel";

export default class UZoom extends UMouseWheel {
    wheel(variation, location) {
        let zoomLevel = this.blueprint.getZoom()
        zoomLevel -= variation
        this.blueprint.setZoom(zoomLevel, location)
    }
}