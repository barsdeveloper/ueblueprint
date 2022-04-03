// @ts-check

const div = document.createElement("div")

const tagReplacement = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
}

function sanitizeText(value) {
    return value.toString().replace(/[&<>'"]/g, tag => tagReplacement[tag])
}

export default sanitizeText
