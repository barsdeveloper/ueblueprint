import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"

export default class MacroGraphReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MacroGraph: new AttributeInfo({
            type: ObjectReferenceEntity,
            default: () => new ObjectReferenceEntity(),
        }),
        GraphBlueprint: new AttributeInfo({
            type: ObjectReferenceEntity,
            default: () => new ObjectReferenceEntity(),
        }),
        GraphGuid: new AttributeInfo({
            type: GuidEntity,
            default: () => new GuidEntity(),
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values) {
        super(values)
        /** @type {ObjectReferenceEntity} */ this.MacroGraph
        /** @type {ObjectReferenceEntity} */ this.GraphBlueprint
        /** @type {GuidEntity} */ this.GuidEntity
    }

    getMacroName() {
        const colonIndex = this.MacroGraph.path.search(":")
        return this.MacroGraph.path.substring(colonIndex + 1)
    }
}
