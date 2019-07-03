import { CharTable } from "./characterTables";

function replaceFromCharTable(char: string, characterTables: CharTable[]): string {
    for (let i = 0; i < characterTables.length; ++i) {
        if (characterTables[i][char]) return characterTables[i][char];
    }

    return char;
}

// Replace to ASCII characters
export function transliterate(src: string, characterTables: CharTable[]): string {
    if (!src.match(/[^a-z0-9\-]+/)) return src;
    return src
        .split("")
        .map((char): string => replaceFromCharTable(char, characterTables))
        .join("");
}
