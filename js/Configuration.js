export default class Configuration {
    static deleteNodesKeyboardKey = "Delete"
    static expandGridSize = 400
    static fontSize = "13px"
    static gridAxisLineColor = "black"
    static gridLineColor = "#353535"
    static gridLineWidth = 2 // pixel
    static gridSet = 8
    static gridSetLineColor = "#161616"
    static gridSize = 16 // pixel
    static keysSeparator = "+"
    static linkCurveHeight = 15 // pixel
    static linkCurveWidth = 80 // pixel
    static linkMinWidth = 100 // pixel
    /**
     * @param {Number} start 
     * @param {Number} c1 
     * @param {Number} c2 
     * @returns {String}
     */
    static linkRightSVGPath = (start, c1, c2) => {
        let end = 100 - start
        return `M ${start} 0 C ${c1} 0, ${c2} 0, 50 50 S ${end - c1 + start} 100, ${end} 100`
    }
    static nodeDeleteEventName = "ueb-node-delete"
    static nodeDragEventName = "ueb-node-drag"
    static nodeDragLocalEventName = "ueb-node-drag-local"
    static nodeRadius = 8 // in pixel
    static selectAllKeyboardKey = "Ctrl+A"
    static trackingMouseEventName = {
        begin: "ueb-tracking-mouse-begin",
        end: "ueb-tracking-mouse-end"
    }
    static ModifierKeys = [
        "Ctrl",
        "Shift",
        "Alt",
        "Meta"
    ]
    static Keys = {
        /* UE name: JS name */
        "Backspace": "Backspace",
        "Tab": "Tab",
        "Enter": "Enter",
        "Pause": "Pause",
        "CapsLock": "CapsLock",
        "Escape": "Escape",
        "Space": "Space",
        "PageUp": "PageUp",
        "PageDown": "PageDown",
        "End": "End",
        "Home": "Home",
        "ArrowLeft": "ArrowLeft",
        "ArrowUp": "ArrowUp",
        "ArrowRight": "ArrowRight",
        "ArrowDown": "ArrowDown",
        "PrintScreen": "PrintScreen",
        "Insert": "Insert",
        "Delete": "Delete",
        "Digit0": "Digit0",
        "Digit1": "Digit1",
        "Digit2": "Digit2",
        "Digit3": "Digit3",
        "Digit4": "Digit4",
        "Digit5": "Digit5",
        "Digit6": "Digit6",
        "Digit7": "Digit7",
        "Digit8": "Digit8",
        "Digit9": "Digit9",
        "A": "KeyA",
        "B": "KeyB",
        "C": "KeyC",
        "D": "KeyD",
        "E": "KeyE",
        "F": "KeyF",
        "G": "KeyG",
        "H": "KeyH",
        "I": "KeyI",
        "K": "KeyK",
        "L": "KeyL",
        "M": "KeyM",
        "N": "KeyN",
        "O": "KeyO",
        "P": "KeyP",
        "Q": "KeyQ",
        "R": "KeyR",
        "S": "KeyS",
        "T": "KeyT",
        "U": "KeyU",
        "V": "KeyV",
        "W": "KeyW",
        "X": "KeyX",
        "Y": "KeyY",
        "Z": "KeyZ",
        "Numpad0": "Numpad0",
        "Numpad1": "Numpad1",
        "Numpad2": "Numpad2",
        "Numpad3": "Numpad3",
        "Numpad4": "Numpad4",
        "Numpad5": "Numpad5",
        "Numpad6": "Numpad6",
        "Numpad7": "Numpad7",
        "Numpad8": "Numpad8",
        "Numpad9": "Numpad9",
        "NumpadMultiply": "NumpadMultiply",
        "NumpadAdd": "NumpadAdd",
        "NumpadSubtract": "NumpadSubtract",
        "NumpadDecimal": "NumpadDecimal",
        "NumpadDivide": "NumpadDivide",
        "F1": "F1",
        "F2": "F2",
        "F3": "F3",
        "F4": "F4",
        "F5": "F5",
        "F6": "F6",
        "F7": "F7",
        "F8": "F8",
        "F9": "F9",
        "F10": "F10",
        "F11": "F11",
        "F12": "F12",
        "NumLock": "NumLock",
        "ScrollLock": "ScrollLock",
    }
}
