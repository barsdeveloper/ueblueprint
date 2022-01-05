const div = document.createElement("div")

const tagReplacement = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
}

function sanitizeText(value) {
    if (value.constructor === String) {
        return value.replace(/[&<>'"]/g, tag => tagReplacement[tag])
    }
    return value
}

export default sanitizeText