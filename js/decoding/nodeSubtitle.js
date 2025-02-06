import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import pinTitle from "./pinTitle.js"

const p = Configuration.paths

/**
 * @param {ObjectEntity} entity
 * @returns {String?}
 */
export default function nodeSubtitle(entity) {
    switch (entity.getType()) {
        case p.addDelegate:
        case p.clearDelegate:
        case p.callDelegate:
        case p.removeDelegate:
            return null
    }
    const targetPin = entity
        .getPinEntities()
        .find(pin => !pin.isHidden() && pin.PinName?.toString() === "self" && pinTitle(pin) === "Target")
    if (targetPin) {
        const target = entity.FunctionReference?.MemberParent?.getName()
            ?? targetPin.PinType?.PinSubCategoryObject?.getName()
            ?? "Untitled"
        return target.length > 0 ? `Target is ${Utility.formatStringName(target)}` : null
    }
    return null
}
