import Configuration from "../../Configuration.js"
import ObjectEntity from "../ObjectEntity.js"
import ObjectReferenceEntity from "../ObjectReferenceEntity.js"
import StringEntity from "../StringEntity.js"

export default class NiagaraClipboardContent extends ObjectEntity {

    /**
     * @param {BlueprintEntity} blueprint
     * @param {ObjectEntity[]} nodes
     */
    constructor(blueprint, nodes) {
        const typePath = Configuration.paths.niagaraClipboardContent
        const name = blueprint.takeFreeName("NiagaraClipboardContent")
        const exportPath = `/Engine/Transient.${name}`
        /** @type {Set<Number>} */
        const variableIndexes = new Set()
        let exported = ""
        for (const node of nodes) {
            if (node.exported) {
                node.getPinEntities()
                    .map(pin => blueprint.variableIndex(pin.PinName.toString()))
                    .filter(v => v != null)
                    .forEach(i => variableIndexes.add(i))
                exported += node.serialize()
            }
        }
        const scriptVariables = blueprint.ScriptVariables.valueOf().filter((v, i) => variableIndexes.has(i))
        const variableObjects = scriptVariables.concat(scriptVariables).map((v, i) => {
            const name = Configuration.subObjectAttributeNameFromReference(
                v.ScriptVariable,
                i >= scriptVariables.length // First take all the small objects then all name only
            )
            return [name, blueprint[name]]
        })
        super({
            Class: new ObjectReferenceEntity(typePath),
            Name: new StringEntity(name),
            ...Object.fromEntries(variableObjects),
            ExportPath: new ObjectReferenceEntity(typePath, exportPath),
            ScriptVariables: new (NiagaraClipboardContent.attributes.ScriptVariables)(scriptVariables),
            ExportedNodes: new StringEntity(btoa(exported))
        })
    }
}
