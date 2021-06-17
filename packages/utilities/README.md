# UXL Utilities [![npm version](https://badge.fury.io/js/%40uxland%2Futilities.svg)](https://badge.fury.io/js/%40uxland%2Futilities)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# "Building Status") | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") |

## Installation

`npm i @uxland/utilities`

## Usage

### Collect

Returns nested object value and prototype from provided key.

```typescript
collect("foo", "foo"); //=> {}
collect({ foo: "bar" }); //=> {0: 'b', 1: 'a', 2: 'r'}
collect({ foo: { bar: "qux" } }); //=> {bar: 'qux'}
```

### Constant Builder

Converts a string to a new one with provided prefix and suffix in builder

```typescript
constantBuilder("PREFIX")("CONSTANT"); //=> 'PREFIX:CONSTANT'
constantBuilder("PREFIX", "SUFFIX")("CONSTANT"); //=> 'PREFIX:CONSTANT:SUFFIX'
constantBuilder("PREFIX", "SUFFIX", "$$")("CONSTANT"); //=> 'PREFIX$$CONSTANT$$SUFFIX'
```

### Invariant

Check if condition is fulfilled, otherwise throws supplied message error

```typescript
invariant(R.is("number")(3), "Supplied value is not a number"); //=> undefined
invariant(R.is("number")("3"), "Supplied value is not a number"); //=> 'Supplied value is not a number'
```

### No operation

Defines an empty function

```typescript
nop(); //=> undefined
```
