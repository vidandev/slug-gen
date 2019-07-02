"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var characterTables_1 = require("./characterTables");
var transliterate_1 = require("./transliterate");
exports.defaultOptions = {
    characterTables: [characterTables_1.latinExtendedA]
};
function slug(src, options) {
    if (src === undefined || src === null)
        throw new Error("Can not generate slug from null or undefined!");
    var mergedOptions = __assign({}, exports.defaultOptions, options);
    var text = typeof src === "string" ? src : src.toString();
    var lowerCaseWithoutWhiteSpace = text
        .toLowerCase()
        .replace(/(\s)+/g, "-");
    return (transliterate_1.transliterate(lowerCaseWithoutWhiteSpace, mergedOptions.characterTables)
        .replace(/[^a-z0-9\-]+/g, "")
        .replace(/-+/g, "-")
        .replace(/(^-+|-+$)/g, ""));
}
exports.slug = slug;
