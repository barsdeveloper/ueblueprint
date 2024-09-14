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
        let exported = ""
        for (const node of nodes) {
            if (node.exported) {
                exported += node.serialize()
            }
        }
        const result = nodes.filter(n => !n.exported).map(n => n.serialize())
        super({
            Class: new ObjectReferenceEntity(typePath),
            Name: new StringEntity(name),
            ExportPath: new ObjectReferenceEntity(typePath, exportPath),
            ExportedNodes: new StringEntity(btoa(exported))
        })
    }
}
