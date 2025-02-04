import Configuration from "../Configuration.js"
import SVGIcon from "../SVGIcon.js"
import nodeTitle from "./nodeTitle.js"

const p = Configuration.paths

/** @param {ObjectEntity} entity */
export default function nodeIcon(entity) {
    if (entity.isMaterial() || entity.isPcg() || entity.isNiagara()) {
        return null
    }
    switch (entity.getType()) {
        case p.addDelegate:
        case p.asyncAction:
        case p.callDelegate:
        case p.clearDelegate:
        case p.createDelegate:
        case p.functionEntry:
        case p.functionResult:
        case p.removeDelegate:
            return SVGIcon.node
        case p.customEvent: return SVGIcon.event
        case p.doN: return SVGIcon.doN
        case p.doOnce: return SVGIcon.doOnce
        case p.dynamicCast: return SVGIcon.cast
        case p.enumLiteral: return SVGIcon.enum
        case p.event: return SVGIcon.event
        case p.executionSequence:
        case p.multiGate:
            return SVGIcon.sequence
        case p.flipflop:
            return SVGIcon.flipflop
        case p.forEachElementInEnum:
        case p.forLoop:
        case p.forLoopWithBreak:
        case p.whileLoop:
            return SVGIcon.loop
        case p.forEachLoop:
        case p.forEachLoopWithBreak:
            return SVGIcon.forEachLoop
        case p.ifThenElse: return SVGIcon.branchNode
        case p.isValid: return SVGIcon.questionMark
        case p.makeArray: return SVGIcon.makeArray
        case p.makeMap: return SVGIcon.makeMap
        case p.makeSet: return SVGIcon.makeSet
        case p.makeStruct: return SVGIcon.makeStruct
        case p.metasoundEditorGraphExternalNode: return SVGIcon.metasoundFunction
        case p.select: return SVGIcon.select
        case p.spawnActorFromClass: return SVGIcon.spawnActor
        case p.timeline: return SVGIcon.timer
    }
    if (entity.switchTarget()) {
        return SVGIcon.switch
    }
    if (nodeTitle(entity).startsWith("Break")) {
        return SVGIcon.breakStruct
    }
    if (entity.getClass() === p.macro) {
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
    if (entity.ObjectRef?.type === p.ambientSound) {
        return SVGIcon.sound
    }
    return SVGIcon.functionSymbol
}
