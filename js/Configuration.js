export default class Configuration {
    static fontSize = "13px"
    static gridSize = "16"
    static gridLineWidth = "2px"
    static gridLineColor = "#353535"
    static gridSet = "8"
    static gridSetLineColor = "#161616"
    static gridAxisLineColor = "black"
    static gridSnap = "16px"
    static nodeRadius = "8px"
    static deleteNodesKeyboardKey = "Delete"
    static expandGridSize = 400
    static selectAllKeyboardKey = "Ctrl+A"
    static keysSeparator = "+"
    static linkMinWidth = "20px"
    static linkRightSVGPath = (c1, c2) => `M 0 0 C ${c1} 0, ${c2} 0, 50 50 S ${100 - c1} 100, 100 100`
    static linkLeftSVGPath = "M 100 0 c 20 0, 30 0, 50 50 S 70 100, 100 100"
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
