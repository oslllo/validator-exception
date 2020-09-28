
![Cover Image](docs/images/cover.png)

[![build](https://img.shields.io/travis/oslllo/validator-exception)](https://travis-ci.org/github/oslllo/validator-exception)
[![npm](https://img.shields.io/npm/v/oslllo-validator-exception)](https://www.npmjs.com/package/oslllo-validator-exception)
[![Coverage Status](https://img.shields.io/coveralls/github/oslllo/validator-exception)](https://coveralls.io/github/oslllo/validator-exception?branch=master)

## Documentation, Installation, and Usage Instructions

> This package is a wrapper for [oslllo-validator](https://www.npmjs.com/package/oslllo-validator) therefore share the same documentaion with it.

See the full installation and usage documentation [HERE](https://docs.oslllo.com/validator/master/).

## The Objective

Create an all in one Javascript validator that throws an `exception` on `false`.

## The Problem / Why This Was Created

It was requested [HERE](https://github.com/oslllo/validator/issues/2)

### Usage Examples

#### Check if value is actual NaN

```js
const assert = require("oslllo-validator-exception");

assert.actualNaN(NaN); // => True
assert.actualNaN(null); // => Throws Error
assert.actualNaN(undefined); // => Throws Error
```

#### Check if value is actual NaN but throw an exception with a custom message on `false`

```js
const assert = require("oslllo-validator-exception");

assert.actualNaN(null, assert.msg("Invalid UUID")); // => Throws Error with custom message "Invalid UUID"

```

---
