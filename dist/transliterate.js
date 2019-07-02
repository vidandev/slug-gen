"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replaceFromCharTable(char, characterTables) {
    for (var i = 0; i < characterTables.length; ++i) {
        if (characterTables[i][char])
            return characterTables[i][char];
    }
    return char;
}
function transliterate(src, characterTables) {
    if (!src.match(/[^a-z0-9\-]+/))
        return src;
    return src
        .split("")
        .map(function (char) { return replaceFromCharTable(char, characterTables); })
        .join("");
}
exports.transliterate = transliterate;
