import IMouseWheel from "./IMouseWheel"

export default class Zoom extends IMouseWheel {

    wheel(variation, location) {
        let zoomLevel = this.blueprint.getZoom()
        zoomLevel -= variation
        this.blueprint.setZoom(zoomLevel, location)
    }
}
