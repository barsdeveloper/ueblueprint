import Configuration from "../Configuration.js"
import SVGIcon from "../SVGIcon.js"
import nodeTitle from "./nodeTitle.js"

/** @param {ObjectEntity} entity */
export default function nodeIcon(entity) {
    if (entity.isMaterial() || entity.isPcg() || entity.isNiagara()) {
        return null
    }
    switch (entity.getType()) {
        case Configuration.paths.addDelegate:
        case Configuration.paths.asyncAction:
        case Configuration.paths.callDelegate:
        case Configuration.paths.createDelegate:
        case Configuration.paths.functionEntry:
        case Configuration.paths.functionResult:
            return SVGIcon.node
        case Configuration.paths.customEvent: return SVGIcon.event
        case Configuration.paths.doN: return SVGIcon.doN
        case Configuration.paths.doOnce: return SVGIcon.doOnce
        case Configuration.paths.dynamicCast: return SVGIcon.cast
        case Configuration.paths.enumLiteral: return SVGIcon.enum
        case Configuration.paths.event: return SVGIcon.event
        case Configuration.paths.executionSequence:
        case Configuration.paths.multiGate:
            return SVGIcon.sequence
        case Configuration.paths.flipflop:
            return SVGIcon.flipflop
        case Configuration.paths.forEachElementInEnum:
        case Configuration.paths.forLoop:
        case Configuration.paths.forLoopWithBreak:
        case Configuration.paths.whileLoop:
            return SVGIcon.loop
        case Configuration.paths.forEachLoop:
        case Configuration.paths.forEachLoopWithBreak:
            return SVGIcon.forEachLoop
        case Configuration.paths.ifThenElse: return SVGIcon.branchNode
        case Configuration.paths.isValid: return SVGIcon.questionMark
        case Configuration.paths.makeArray: return SVGIcon.makeArray
        case Configuration.paths.makeMap: return SVGIcon.makeMap
        case Configuration.paths.makeSet: return SVGIcon.makeSet
        case Configuration.paths.makeStruct: return SVGIcon.makeStruct
        case Configuration.paths.metasoundEditorGraphExternalNode: return SVGIcon.metasoundFunction
        case Configuration.paths.select: return SVGIcon.select
        case Configuration.paths.spawnActorFromClass: return SVGIcon.spawnActor
        case Configuration.paths.timeline: return SVGIcon.timer
    }
    if (entity.switchTarget()) {
        return SVGIcon.switch
    }
    if (nodeTitle(entity).startsWith("Break")) {
        return SVGIcon.breakStruct
    }
    if (entity.getClass() === Configuration.paths.macro) {
        return SVGIcon.macro
    }
    const hidValue = entity.getHIDAttribute()?.toString()
    if (hidValue) {
        if (hidValue.includes("Mouse")) {
            return SVGIcon.mouse
        } else if (hidValue.includes("Gamepad_Special")) {
            return SVGIcon.keyboard // It is called Touchpad in UE
        } else if (hidValue.includes("Gamepad") || hidValue.includes("Steam")) {
            return SVGIcon.gamepad
        } else if (hidValue.includes("Touch")) {
            return SVGIcon.touchpad
        } else {
            return SVGIcon.keyboard
        }
    }
    if (entity.getDelegatePin()) {
        return SVGIcon.event
    }
    if (entity.ObjectRef?.type === Configuration.paths.ambientSound) {
        return SVGIcon.sound
    }
    return SVGIcon.functionSymbol
}
