import Utility from "../Utility.js"

/** @param {PinEntity} entity */
export default function pinTitle(entity) {
    let result = entity.PinFriendlyName
        ? entity.PinFriendlyName.toString()
        : Utility.formatStringName(entity.PinName?.valueOf() ?? "")
    let match
    if (
        entity.PinToolTip
        // Match up until the first \n excluded or last character
        && (match = entity.PinToolTip?.valueOf().match(/\s*(.+?(?=\n)|.+\S)\s*/))
    ) {
        if (match[1].toLowerCase() === result.toLowerCase()) {
            return match[1] // In case they match, then keep the case of the PinToolTip
        }
    }
    return result
}
