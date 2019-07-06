# Slug Generator
Zero dependency slug generator with unicode support.

[![Build Status](https://travis-ci.org/vidandev/slug-gen.svg?branch=master)](https://travis-ci.org/vidandev/slug-gen)
[![npm](https://img.shields.io/npm/v/slug-gen.svg)](https://www.npmjs.com/package/slug-gen)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/slug-gen.svg)](https://bundlephobia.com/result?p=slug-gen)
[![NPM](https://img.shields.io/npm/l/slug-gen.svg)](https://github.com/vidandev/slug-gen/blob/master/LICENSE)

- Written in TypeScript and provides typings, no need to install them separately
- No dependencies
- Unicode support
- Small size (~2kb minzipped)
- Respects [RFC-3986](https://tools.ietf.org/html/rfc3986) with default options
- Supports IE9+, all modern browsers and Node.js 

## Usage
```javascript
import slug from "slug-gen";

console.log(slug("ĀāĂ ă Ą ą Ć ć Ĉ ĉ ĊċČčĎ"));
//=> aaa-a-a-a-c-c-c-c-ccccd

// Add your own character tables
console.log(slug("some unicode text with characters like ♥", { 
    characterTables: [{ "♥": "love" }]
}))
//=> some-unicode-text-with-characters-like-love
```

## API
### slug(string, [options])
Generates slug from the given string.

#### Options
```javascript
{
    characterTables?: CharTable[],
    separator?: string
}
```
## Currently supported unicode blocks
Unsupported characters will be removed from the result.

| Block range | Block name |
| ----------- | ---------- |
| U+0000..U+007F | Basic Latin |
| U+0080..U+00FF | Latin-1 Supplement |
| U+0100..U+017F | Latin Extended-A |
| U+0180..U+024F | Latin Extended-B |
| U+0370..U+03FF | Greek and Coptic |
| U+0400..U+04FF | Cyrillic |
| U+0500..U+052F | Cyrillic Supplement |