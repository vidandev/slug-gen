import { CharTable, latinExtendedA } from "./characterTables";
import { transliterate } from "./transliterate";

export type SlugOptions = {
    characterTables: CharTable[];
};

export const defaultOptions: SlugOptions = {
    characterTables: [latinExtendedA]
};

export function slug(src: any, options?: SlugOptions): string {
    if (src === undefined || src === null) throw new Error("Can not generate slug from null or undefined!");

    const mergedOptions = { ...defaultOptions, ...options };

    // Ensure string
    const text = typeof src === "string" ? src : src.toString();

    const lowerCaseWithoutWhiteSpace = text
        // Node.js and IE >=9 supports UTF-8 toLowerCase()
        .toLowerCase()
        // Replace whitespace
        .replace(/(\s)+/g, "-");

    return (
        transliterate(lowerCaseWithoutWhiteSpace, mergedOptions.characterTables)
            // Remove misc non-alphanumeric or non-dash characters
            .replace(/[^a-z0-9\-]+/g, "")
            // Remove duplications
            .replace(/-+/g, "-")
            // Truncate
            .replace(/(^-+|-+$)/g, "")
    );
}
