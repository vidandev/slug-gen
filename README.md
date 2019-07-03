# Slug Generator
Zero dependency slug generator for the browser and Node.js with unicode support.

[![Build Status](https://travis-ci.org/vidandev/slug-gen.svg?branch=master)](https://travis-ci.org/vidandev/slug-gen)
![npm](https://img.shields.io/npm/v/slug-gen.svg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/slug-gen.svg)
![NPM](https://img.shields.io/npm/l/slug-gen.svg)

The library is written in TypeScript and provides typings, no need to install them separately.

## Usage
```javascript
import { slug } from "slug-gen";

console.log(slug("ĀāĂ ă Ą ą Ć ć Ĉ ĉ ĊċČčĎ"));
// -> aaa-a-a-a-c-c-c-c-ccccd
```

## Current unicode support

| Block range | Block name |
| ----------- | ---------- |
| U+0000..U+007F | Basic Latin |
| U+0080..U+00FF | Latin-1 Supplement |
| U+0100..U+017F | Latin Extended-A |
| U+0180..U+024F | Latin Extended-B |
| U+0370..U+03FF | Greek and Coptic |
| U+0400..U+04FF | Cyrillic |
| U+0500..U+052F | Cyrillic Supplement |