import Utility from "../Utility.js"

/** @param {PinEntity} entity */
export default function pinTitle(entity) {
    let result = entity.PinFriendlyName
        ? entity.PinFriendlyName.valueOf()
        : Utility.formatStringName(entity.PinName?.valueOf() ?? "")
    let match
    if (match = entity.PinToolTip?.valueOf().match(/\s*(.+?(?=\n)|.+\S)\s*/)) {
        if (match[1].toLowerCase() === result.toLowerCase()) {
            return match[1] // In case they match, then keep the case of the PinToolTip
        }
    }
    return result
}
