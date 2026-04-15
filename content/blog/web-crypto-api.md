---
title: "Building Developer Tools with the Web Crypto API"
description: "The Web Crypto API provides SHA-1, SHA-256, and SHA-512 hashing natively in every modern browser. Here is how to use it without any libraries."
datePublished: "2026-04-12"
readTime: "5 min read"
---

## What Is the Web Crypto API?

`crypto.subtle` is a browser-native API for cryptographic operations including hashing, signing, and key derivation. It has been available in all major browsers since 2015 and requires no external libraries.

For hash generation, it supports SHA-1, SHA-256, SHA-384, and SHA-512. All operations are asynchronous and return Promises.

## Computing a SHA-256 Hash

The pattern is three steps: encode the string to bytes, call `crypto.subtle.digest`, convert the ArrayBuffer result to hex.

```javascript
async function sha256(input) {
  const data = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
```

The `TextEncoder` converts a string to bytes. `crypto.subtle.digest` returns an `ArrayBuffer`. Converting to hex is three lines of standard JavaScript.

## Why Not Use a Library?

For SHA-256 and SHA-512, there is no reason to import a library. The browser implementation is battle-tested, hardware-accelerated on supported platforms, and available with zero download cost.

MD5 is the exception -- it was removed from the Web Crypto API spec because it is cryptographically broken. If you need MD5 (for legacy compatibility, not security), a pure-JS implementation is necessary. devkit includes one at around 80 lines of code.

## devkit's Implementation

devkit's Hash Generator computes all four algorithms simultaneously when you click "Compute hashes." The page shows MD5, SHA-1, SHA-256, and SHA-512 side by side. Each result has a one-click copy button.
