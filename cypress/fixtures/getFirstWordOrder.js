/** @param {String[]} words */
export default function getFirstWordOrder(words) {
    return new RegExp("(?:.|\\n)+" + words.map(word => word + "(?:.|\\n)+").join("") + "(?:.|\\n)+")
}
