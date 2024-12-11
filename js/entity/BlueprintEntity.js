import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import ObjectEntity from "./ObjectEntity.js"

export default class BlueprintEntity extends ObjectEntity {

    /** @type {Map<String, Number>} */
    #objectEntitiesNameCounter = new Map()
    #variableNames = new Set()

    /** @type {ObjectEntity[]}" */
    #objectEntities = []
    get objectEntities() {
        return this.#objectEntities
    }

    static attributes = {
        ...super.attributes,
        ScriptVariables: super.attributes.ScriptVariables.asUniqueClass(true).withDefault(),
    }

    /** @param {ObjectEntity} entity */
    getHomonymObjectEntity(entity) {
        const name = entity.getObjectName()
        return this.#objectEntities.find(entity => entity.getObjectName() == name)
    }

    /** @param {String} name */
    takeFreeName(name) {
        name = name.replace(/_\d+$/, "")
        const counter = (this.#objectEntitiesNameCounter.get(name) ?? -1) + 1
        this.#objectEntitiesNameCounter.set(name, counter)
        return Configuration.nodeTitle(name, counter)
    }

    /** @param {ObjectEntity} entity */
    addObjectEntity(entity) {
        if (!this.#objectEntities.includes(entity)) {
            this.#objectEntities.push(entity)
            const [name, counter] = entity.getNameAndCounter()
            this.#objectEntitiesNameCounter.set(
                name,
                Math.max((this.#objectEntitiesNameCounter.get(name) ?? 0), counter)
            )
            return true
        }
        return false
    }

    /** @param {ObjectEntity} entity */
    removeObjectEntity(entity) {
        const index = this.#objectEntities.indexOf(entity)
        if (index >= 0) {
            const last = this.#objectEntities.pop()
            if (index < this.#objectEntities.length) {
                this.#objectEntities[index] = last
            }
            return true
        }
        return false
    }

    /**
     * @param {ObjectReferenceEntity} variable
     * @param {IEntity} entity
     */
    renameScriptVariable(variable, entity) {
        const name = variable.getName()
        const newName = this.takeFreeName(name)
        {
            [true, false].forEach(v => {
                /** @type {ObjectEntity} */
                let object = this[Configuration.subObjectAttributeNameFromReference(variable, v)]
                object.Name.value = newName
                object.Name = object.Name
            })
        }
        variable.path.replace(name, newName)
    }

    /** @param {ObjectEntity} entity */
    mergeWith(entity) {
        if ((entity.ScriptVariables?.length ?? 0) === 0) {
            // The entity does not add new variables
            return this
        }
        let scriptVariables = Utility.mergeArrays(
            this.ScriptVariables.valueOf(),
            entity.ScriptVariables.valueOf(),
            (l, r) => l.OriginalChangeId.value == r.OriginalChangeId.value,
            added => {
                const name = added.ScriptVariable.getName()
                if (this.#variableNames.has(name)) {
                    this.renameScriptVariable(added.ScriptVariable, entity)
                }
            }
        )
        if (scriptVariables.length === this.ScriptVariables.length) {
            // The entity does not add new variables
            return this
        }
        scriptVariables.reverse()
        const entries = scriptVariables.concat(scriptVariables).map((v, i) => {
            const name = Configuration.subObjectAttributeNameFromReference(
                v.ScriptVariable,
                i >= scriptVariables.length // First take all the small objects then all name only
            )
            const object = this[name] ?? entity[name]
            return object ? [name, object] : null
        }).filter(v => v)
        entries.push(
            ...Object.entries(this).filter(([k, v]) =>
                !k.startsWith(Configuration.subObjectAttributeNamePrefix)
                && k !== "ExportedNodes"
            ),
            ["ScriptVariables", new (BlueprintEntity.attributes.ScriptVariables)(scriptVariables.reverse())]
        )
        return new BlueprintEntity(Object.fromEntries(entries))
    }

    /** @param {ObjectEntity[]} entities */
    getVariablesAttributesReferringTo(...entities) {
        let pins = new Set(...entities.flatMap(entity => entity.getPinEntities()).map(pin => pin.PinName.toString()))
        let attributes = this.ScriptVariables
            .valueOf()
            .map(v => {
                const keySimple = Configuration.subObjectAttributeNameFromReference(v.ScriptVariable, false)
                const keyFull = Configuration.subObjectAttributeNameFromReference(v.ScriptVariable, true)
                return {
                    simple: [keySimple, this[keySimple]],
                    full: [keyFull, this[keyFull]],
                    variable: v,
                }
            })
            .filter(v => pins.has(v.full?.["Variable"]?.["Name"]))
            .reduce(
                (acc, cur) => {
                    acc.simple.push([cur.simple[0], cur.simple[1]])
                    acc.full.push([cur.full[0], cur.full[1]])
                    acc.ScriptVariables.push(cur.variable)
                    return acc
                },
                ({ simple: [], full: [], ScriptVariables: [] })
            )
        return {

        }
    }
}
