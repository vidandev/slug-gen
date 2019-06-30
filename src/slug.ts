import { latinExtendedA } from "./characterTables";

// Replace to ASCII characters
function transliterate(src: string): string {
    if (!src.match(/[^a-z0-9\-]+/)) return src;
    return src
        .split("")
        .map(char => latinExtendedA[char] || char)
        .join("");
}

export function slug(src: any) {
    if (src === undefined || src === null) throw new Error("Can not generate slug from null or undefined!");

    const text = typeof src === "string" ? src : src.toString();

    const lowerCaseWithoutWhiteSpace = text
        // Node.js and IE >=9 supports UTF-8 toLowerCase()
        .toLowerCase()
        // Replace whitespace
        .replace(/(\s)+/g, "-");

    return (
        transliterate(lowerCaseWithoutWhiteSpace)
            // Remove misc non-alphanumeric or non-dash characters
            .replace(/[^a-z0-9\-]+/g, "")
            // Remove duplications
            .replace(/-+/g, "-")
            // Truncate
            .replace(/(^-+|-+$)/g, "")
    );
}
