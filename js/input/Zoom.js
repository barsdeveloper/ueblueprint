import MouseWheel from "./MouseWheel";

export default class Zoom extends MouseWheel {
    wheel(variation, location) {
        let zoomLevel = this.blueprint.getZoom()
        zoomLevel -= variation
        this.blueprint.setZoom(zoomLevel, location)
    }
}
