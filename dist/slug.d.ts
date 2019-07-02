import { CharTable } from "./characterTables";
export declare type SlugOptions = {
    characterTables: CharTable[];
};
export declare const defaultOptions: SlugOptions;
export declare function slug(src: any, options?: SlugOptions): string;
