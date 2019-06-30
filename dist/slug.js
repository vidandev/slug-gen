"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var characterTables_1 = require("./characterTables");
function transliterate(src) {
    if (!src.match(/[^a-z0-9\-]+/))
        return src;
    return src
        .split("")
        .map(function (char) { return characterTables_1.latinExtendedA[char] || char; })
        .join("");
}
function slug(src) {
    if (src === undefined || src === null)
        throw new Error("Can not generate slug from null or undefined!");
    var text = typeof src === "string" ? src : src.toString();
    var lowerCaseWithoutWhiteSpace = text
        .toLowerCase()
        .replace(/(\s)+/g, "-");
    return (transliterate(lowerCaseWithoutWhiteSpace)
        .replace(/[^a-z0-9\-]+/g, "")
        .replace(/-+/g, "-")
        .replace(/(^-+|-+$)/g, ""));
}
exports.slug = slug;
