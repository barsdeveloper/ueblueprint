import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"

export default class MacroGraphReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MacroGraph: ObjectReferenceEntity,
        GraphBlueprint: ObjectReferenceEntity,
        GraphGuid: GuidEntity,
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values)
        /** @type {InstanceType<typeof MacroGraphReferenceEntity.attributes.MacroGraph>} */ this.MacroGraph
        /** @type {InstanceType<typeof MacroGraphReferenceEntity.attributes.GraphBlueprint>} */ this.GraphBlueprint
        /** @type {InstanceType<typeof MacroGraphReferenceEntity.attributes.GraphGuid>} */ this.GraphGuid
    }

    static createGrammar() {
        return /** @type {P<MacroGraphReferenceEntity>} */(
            Grammar.createEntityGrammar(this)
        )
    }

    getMacroName() {
        const colonIndex = this.MacroGraph.path.search(":")
        return this.MacroGraph.path.substring(colonIndex + 1)
    }
}
