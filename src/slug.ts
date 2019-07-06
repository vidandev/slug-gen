import { CharTable, defaultCharTable } from "./characterTables";
import { transliterate } from "./transliterate";

export type SlugOptions = {
    characterTables?: CharTable[];
    separator?: string;
};

export function slug(src: any, options?: Partial<SlugOptions>): string {
    if (src === undefined || src === null) throw new Error("Can not generate slug from null or undefined!");

    const mergedOptions = { ...options };
    mergedOptions.characterTables = [...(mergedOptions.characterTables || []), defaultCharTable];

    // Ensure string
    const text = typeof src === "string" ? src : src.toString();

    const lowerCaseWithoutWhiteSpace = text
        // Node.js and IE >=9 supports UTF-8 toLowerCase()
        .toLowerCase()
        // Replace whitespace
        .replace(/(\s)+/g, "-");

    const prepared = transliterate(lowerCaseWithoutWhiteSpace, mergedOptions.characterTables)
        // Remove misc non-alphanumeric or non-dash characters
        .replace(/[^a-z0-9\-]+/g, "")
        // Remove duplications
        .replace(/-+/g, "-")
        // Truncate
        .replace(/(^-+|-+$)/g, "");

    const { separator } = mergedOptions;
    if (!separator) return prepared;

    if (typeof separator !== "string") {
        throw new Error("Separator must be a string!");
    }

    return prepared.replace(/-/g, separator);
}
