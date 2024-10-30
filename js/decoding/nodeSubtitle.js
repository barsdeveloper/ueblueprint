import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import pinTitle from "./pinTitle.js"

/**
 * @param {ObjectEntity} entity
 * @returns {String?}
 */
export default function nodeSubtitle(entity) {
    switch (entity.getType()) {
        case Configuration.paths.addDelegate:
        case Configuration.paths.clearDelegate:
            return null
    }
    const targetPin = entity
        .getPinEntities()
        .find(pin => pin.PinName?.toString() === "self" && pinTitle(pin) === "Target")
    if (targetPin) {
        const target = entity.FunctionReference?.MemberParent?.getName()
            ?? targetPin.PinType?.PinSubCategoryObject?.getName()
            ?? "Untitled"
        return target.length > 0 ? `Target is ${Utility.formatStringName(target)}` : null
    }
    return null
}
