import GuidEntity from "./GuidEntity"
import IEntity from "./IEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"

export default class MacroGraphReferenceEntity extends IEntity {

    static attributes = {
        MacroGraph: ObjectReferenceEntity,
        GraphBlueprint: ObjectReferenceEntity,
        GraphGuid: GuidEntity,
    }

    constructor(options = {}) {
        super(options)
        /** @type {ObjectReferenceEntity} */ this.MacroGraph
        /** @type {ObjectReferenceEntity} */ this.GraphBlueprint
        /** @type {GuidEntity} */ this.GuidEntity
    }

    getMacroName() {
        const colonIndex = this.MacroGraph.path.search(":")
        return this.MacroGraph.path.substring(colonIndex + 1)
    }
}
