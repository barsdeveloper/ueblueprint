import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import ObjectEntity from "./ObjectEntity.js"

export default class BlueprintEntity extends ObjectEntity {

    /** @type {Map<String, Number>} */
    #objectEntitiesNameCounter = new Map()

    /** @type {ObjectEntity[]}" */
    #objectEntities = []
    get objectEntities() {
        return this.#objectEntities
    }

    /** @param {ObjectEntity} entity */
    getHomonymObjectEntity(entity) {
        const name = entity.getObjectName(false)
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

    /** @param {ObjectEntity} entity */
    mergeWith(entity) {
        if (!entity.ScriptVariables || entity.ScriptVariables.length === 0) {
            return this
        }
        if (!this.ScriptVariables || this.ScriptVariables.length === 0) {
            this.ScriptVariables = entity.ScriptVariables
        }
        let scriptVariables = Utility.mergeArrays(
            this.ScriptVariables.valueOf(),
            entity.ScriptVariables.valueOf(),
            (l, r) => l.OriginalChangeId.value == r.OriginalChangeId.value
        )
        if (scriptVariables.length === this.ScriptVariables.length) {
            return this
        }
        const entries = scriptVariables.concat(scriptVariables).map((v, i) => {
            const name = Configuration.subObjectAttributeNameFromReference(v.ScriptVariable, i >= scriptVariables.length)
            return [
                name,
                this[name] ?? entity[name]
            ]
        })
        entries.push(
            ...Object.entries(this).filter(([k, v]) =>
                !k.startsWith(Configuration.subObjectAttributeNamePrefix)
                && k !== "ExportedNodes"
            )
        )
        return new BlueprintEntity(Object.fromEntries(entries))
    }
}
