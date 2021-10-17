export default class ReferenceTypeName {

    /**
     * 
     * @param {String} reference 
     * @returns 
     */
    static splitReference(reference) {
        const pathBegin = reference.search(/['"]/)
        const referenceType = reference.substr(0, pathBegin > 0 ? pathBegin : undefined) // reference example Class'"/Script/Engine.PlayerCameraManager"'
        const referencePath = pathBegin > 0 ? reference.substr(pathBegin) : ""
        switch (referenceType) {
            case "None":
                if (referencePath.length > 0) {
                    return false // None cannot have a path
                }
            default:
                return [referenceType, referencePath]
        }
    }

    /**
     * 
     * @param {String} reference 
     */
    constructor(reference) {
        reference = ReferenceTypeName.splitReference(reference)
        if (!reference) {
            throw new Error('Invalid reference: ' + reference)
        }
        this.reference = reference
    }

    toString() {
        return this.value
    }
}