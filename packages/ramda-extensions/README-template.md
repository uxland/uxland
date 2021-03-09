# UXL Ramda Extensions [![npm version](https://badge.fury.io/js/%40uxland%2Framda-extensions.svg)](https://badge.fury.io/js/%40uxland%2Framda-extensions)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# "Building Status") | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") |

## Installation

`npm i @uxland/ramda-extensions`

## Usage

### Id equality

Checks if input value is equal to object's id

```typescript
idEq("id")({ id: "id" }); //=> true
idEq("foo")({ id: "id" }); //=> false
idEq(undefined)({ foo: "bar" }); //=> true
```

### Id

Returns property 'id' of object

```typescript
id({ id: 1 }); //=> 1
id({ foo: "bar" }); //=> undefined
```

### Is not empty

Checks whether input is empty

```typescript
isNotEmpty(undefined); //=> true
isNotEmpty(1); //=> true
isNotEmpty("1"); //=> true
isNotEmpty(""); //=> false
isNotEmpty([]); //=> false
isNotEmpty(["foo"]); //=> true
isNotEmpty({}); //=> false
isNotEmpty({ foo: "bar" }); //=> true
```

### Is not null neither empty

Checks whether input is not null nor empty

```typescript
isNotNullNeitherEmpty(undefined); //=> false
isNotNullNeitherEmpty(1); //=> true
isNotNullNeitherEmpty("1"); //=> true
isNotNullNeitherEmpty(""); //=> false
isNotNullNeitherEmpty([]); //=> false
isNotNullNeitherEmpty(["foo"]); //=> true
isNotNullNeitherEmpty({}); //=> false
isNotNullNeitherEmpty({ foo: "bar" }); //=> true
```

### Is not nil

Checks whether input is undefined or null

```typescript
isNotNil(undefined); //=> false
isNotNil(1); //=> true
isNotNil("1"); //=> true
isNotNil(""); //=> true
isNotNil([]); //=> true
isNotNil(["foo"]); //=> true
isNotNil({}); //=> true
isNotNil({ foo: "bar" }); //=> true
```

### Is null or empty

Checks whether input is null or empty

```typescript
isNullOrEmpty(undefined); //=> true
isNullOrEmpty(1); //=> true
isNullOrEmpty("1"); //=> true
isNullOrEmpty(""); //=> true
isNullOrEmpty([]); //=> true
isNullOrEmpty(["foo"]); //=> true
isNullOrEmpty({}); //=> true
isNullOrEmpty({ foo: "bar" }); //=> true
```

### Promise.all

Resolves Promise.all

### Reject empty

Filters out input of empty values/items

```typescript
rejectEmpty([]); //=> []
rejectEmpty(["foo", "", {}, { foo: "bar" }, undefined]); //=> [foo,{"foo":"bar"}, undefined]
rejectEmpty({}); //=> {}
rejectEmpty({ foo: "bar", qux: "", quux: undefined }); //=> {foo: 'bar'}
```

### Reject nil or empty

Filters out input of empty or null values/items

```typescript
rejectEmpty([]); //=> []
rejectEmpty(["foo", "", {}, { foo: "bar" }, undefined]); //=> foo,{"foo":"bar"}
rejectEmpty({}); //=> {}
rejectEmpty({ foo: "bar", qux: "", quux: undefined }); //=> {foo: 'bar'}
```

### Reject nil

Filters out input null or undefined values/items

```typescript
rejectEmpty([]); //=> []
rejectEmpty(["foo", "", {}, { foo: "bar" }, undefined]); //=> [foo,'',{"foo":"bar"}]
rejectEmpty({}); //=> {}
rejectEmpty({ foo: "bar", qux: "", quux: undefined }); //=> {foo: 'bar', qux: ''}
```

### Array to dictionary by key

Converts an array to dictionary using provided key as reference

```typescript
toDictionaryBy("id")([
  { id: 1, description: "foo" },
  { id: 2, description: "bar" },
]); //=> {1: {id: 1, description: 'foo'}, 2: {id: 2, description: 'bar'}}
```

### Array to dictionary

Converts an array to dictionary using ID as key

```typescript
toDictionary([
  { id: 1, description: "foo" },
  { id: 2, description: "bar" },
]); //=> {1: {id: 1, description: 'foo'}, 2: {id: 2, description: 'bar'}}
```

### Path to array

Splits path by '.' into a string array

```typescript
toPath('foo.bar') => ['foo', 'bar']
toPath('3') => ['3']
```
