const div = document.createElement("div")

function sanitizeText(value) {
    div.textContent = value
    value = div.textContent
    div.innerHTML = ""
    return value
}

export default sanitizeText