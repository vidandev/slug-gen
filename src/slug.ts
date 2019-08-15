import { CharTable, unicodeTable } from "./characterTables";
import { transliterate } from "./transliterate";

export type SlugOptions = {
    characterTables?: CharTable[];
    separator?: string;
    strict?: boolean; // setting this false will allow null or undefined input
};

const defaultOptions: SlugOptions = {
    characterTables: [unicodeTable],
    separator: "-",
    strict: true
};

export function slug(src: any, options?: Partial<SlugOptions>): string {
    if (options !== undefined && typeof options !== "object") throw new Error("Options argument must be an object!");

    const mergedOptions = { ...options };

    mergedOptions.characterTables = [...(mergedOptions.characterTables || []), ...defaultOptions.characterTables];
    mergedOptions.separator = mergedOptions.separator || defaultOptions.separator;
    mergedOptions.strict = mergedOptions.strict || defaultOptions.strict;

    if (mergedOptions.strict && (src === undefined || src === null))
        throw new Error("Can not generate slug from null or undefined!");

    if (!src) return "";

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
    if (!separator || separator === defaultOptions.separator) return prepared;

    if (typeof separator !== "string") {
        throw new Error("Separator must be a string!");
    }

    return prepared.replace(/-/g, separator);
}
