## Objects

<dl>
<dt><a href="#FunctionalUtilities">FunctionalUtilities</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Interfaces

<dl>
<dt><a href="#Entity">Entity</a></dt>
<dd><p>Entity interface</p>
</dd>
</dl>

<a name="Entity"></a>

## Entity

Entity interface

**Kind**: global interface  
<a name="Entity+id"></a>

### entity.id : <code>string</code>

Entity id

**Kind**: instance constant of [<code>Entity</code>](#Entity)  
<a name="FunctionalUtilities"></a>

## FunctionalUtilities : <code>object</code>

**Kind**: global namespace

- [FunctionalUtilities](#FunctionalUtilities) : <code>object</code>
  - [.Ramda](#FunctionalUtilities.Ramda) : <code>object</code>
    - [.idEq(key)](#FunctionalUtilities.Ramda.idEq) ⇒ <code>void</code>
    - [.id(input)](#FunctionalUtilities.Ramda.id) ⇒ <code>\*</code>
    - [.isNotEmpty(input)](#FunctionalUtilities.Ramda.isNotEmpty) ⇒ <code>boolean</code>
    - [.isNotNullNeitherEmpty(input)](#FunctionalUtilities.Ramda.isNotNullNeitherEmpty) ⇒ <code>boolean</code>
    - [.isNotNil(input)](#FunctionalUtilities.Ramda.isNotNil) ⇒ <code>boolean</code>
    - [.isNullOrEmpty(input)](#FunctionalUtilities.Ramda.isNullOrEmpty) ⇒ <code>boolean</code>
    - [.promiseAll(promises)](#FunctionalUtilities.Ramda.promiseAll) ⇒ <code>Array</code>
    - [.resolve(promise)](#FunctionalUtilities.Ramda.resolve) ⇒ <code>\*</code>
    - [.rejectEmpty(input)](#FunctionalUtilities.Ramda.rejectEmpty) ⇒ <code>\*</code> \| <code>void</code>
    - [.rejectNilOrEmpty(input)](#FunctionalUtilities.Ramda.rejectNilOrEmpty) ⇒ <code>\*</code> \| <code>void</code>
    - [.rejectNil(input)](#FunctionalUtilities.Ramda.rejectNil) ⇒ <code>\*</code> \| <code>void</code>
    - [.toDictionaryBy(key)](#FunctionalUtilities.Ramda.toDictionaryBy) ⇒ <code>T</code>
    - [.toDictionary(items)](#FunctionalUtilities.Ramda.toDictionary) ⇒ [<code>Entity</code>](#Entity)
    - [.toPath(path)](#FunctionalUtilities.Ramda.toPath) ⇒ <code>Array.&lt;string&gt;</code>
  - [.invariant(condition, [message])](#FunctionalUtilities.invariant) ⇒ <code>void</code> \| <code>never</code>
  - [.nop()](#FunctionalUtilities.nop) ⇒ <code>void</code>

<a name="FunctionalUtilities.Ramda"></a>

### FunctionalUtilities.Ramda : <code>object</code>

**Kind**: static namespace of [<code>FunctionalUtilities</code>](#FunctionalUtilities)

- [.Ramda](#FunctionalUtilities.Ramda) : <code>object</code>
  - [.idEq(key)](#FunctionalUtilities.Ramda.idEq) ⇒ <code>void</code>
  - [.id(input)](#FunctionalUtilities.Ramda.id) ⇒ <code>\*</code>
  - [.isNotEmpty(input)](#FunctionalUtilities.Ramda.isNotEmpty) ⇒ <code>boolean</code>
  - [.isNotNullNeitherEmpty(input)](#FunctionalUtilities.Ramda.isNotNullNeitherEmpty) ⇒ <code>boolean</code>
  - [.isNotNil(input)](#FunctionalUtilities.Ramda.isNotNil) ⇒ <code>boolean</code>
  - [.isNullOrEmpty(input)](#FunctionalUtilities.Ramda.isNullOrEmpty) ⇒ <code>boolean</code>
  - [.promiseAll(promises)](#FunctionalUtilities.Ramda.promiseAll) ⇒ <code>Array</code>
  - [.resolve(promise)](#FunctionalUtilities.Ramda.resolve) ⇒ <code>\*</code>
  - [.rejectEmpty(input)](#FunctionalUtilities.Ramda.rejectEmpty) ⇒ <code>\*</code> \| <code>void</code>
  - [.rejectNilOrEmpty(input)](#FunctionalUtilities.Ramda.rejectNilOrEmpty) ⇒ <code>\*</code> \| <code>void</code>
  - [.rejectNil(input)](#FunctionalUtilities.Ramda.rejectNil) ⇒ <code>\*</code> \| <code>void</code>
  - [.toDictionaryBy(key)](#FunctionalUtilities.Ramda.toDictionaryBy) ⇒ <code>T</code>
  - [.toDictionary(items)](#FunctionalUtilities.Ramda.toDictionary) ⇒ [<code>Entity</code>](#Entity)
  - [.toPath(path)](#FunctionalUtilities.Ramda.toPath) ⇒ <code>Array.&lt;string&gt;</code>

<a name="FunctionalUtilities.Ramda.idEq"></a>

#### Ramda.idEq(key) ⇒ <code>void</code>

Checks if property is 'id'

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param | Type                | Description            |
| ----- | ------------------- | ---------------------- |
| key   | <code>string</code> | Property to be checked |

**Example**

```js
idEq('id'); //=> true
idEq('foo'); //=> false
```

<a name="FunctionalUtilities.Ramda.id"></a>

#### Ramda.id(input) ⇒ <code>\*</code>

Returns property 'id' of object

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param | Type                | Description  |
| ----- | ------------------- | ------------ |
| input | <code>object</code> | Input object |

**Example**

```js
id({ id: 1 }); //=> 1
id({ foo: 'bar' }); //=> undefined
```

<a name="FunctionalUtilities.Ramda.isNotEmpty"></a>

#### Ramda.isNotEmpty(input) ⇒ <code>boolean</code>

Checks wether input is empty

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param | Type            | Description              |
| ----- | --------------- | ------------------------ |
| input | <code>\*</code> | Input to check emptiness |

**Example**

```js
isNotEmpty(undefined); //=> true
isNotEmpty(1); //=> true
isNotEmpty('1'); //=> true
isNotEmpty(''); //=> false
isNotEmpty([]); //=> false
isNotEmpty(['foo']); //=> true
isNotEmpty({}); //=> false
isNotEmpty({ foo: 'bar' }); //=> true
```

<a name="FunctionalUtilities.Ramda.isNotNullNeitherEmpty"></a>

#### Ramda.isNotNullNeitherEmpty(input) ⇒ <code>boolean</code>

Checks wether input is not null nor empty

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param | Type            | Description                         |
| ----- | --------------- | ----------------------------------- |
| input | <code>\*</code> | Input to check emptiness or nullity |

**Example**

```js
isNotNullNeitherEmpty(undefined); //=> false
isNotNullNeitherEmpty(1); //=> true
isNotNullNeitherEmpty('1'); //=> true
isNotNullNeitherEmpty(''); //=> false
isNotNullNeitherEmpty([]); //=> false
isNotNullNeitherEmpty(['foo']); //=> true
isNotNullNeitherEmpty({}); //=> false
isNotNullNeitherEmpty({ foo: 'bar' }); //=> true
```

<a name="FunctionalUtilities.Ramda.isNotNil"></a>

#### Ramda.isNotNil(input) ⇒ <code>boolean</code>

Checks whether input is undefined or null

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param | Type            | Description            |
| ----- | --------------- | ---------------------- |
| input | <code>\*</code> | Input to check nullity |

**Example**

```js
isNotNil(undefined); //=> false
isNotNil(1); //=> true
isNotNil('1'); //=> true
isNotNil(''); //=> true
isNotNil([]); //=> true
isNotNil(['foo']); //=> true
isNotNil({}); //=> true
isNotNil({ foo: 'bar' }); //=> true
```

<a name="FunctionalUtilities.Ramda.isNullOrEmpty"></a>

#### Ramda.isNullOrEmpty(input) ⇒ <code>boolean</code>

Checks whether input is null or empty

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param | Type            | Description                         |
| ----- | --------------- | ----------------------------------- |
| input | <code>\*</code> | Input to check emptiness or nullity |

**Example**

```js
isNullOrEmpty(undefined); //=> true
isNullOrEmpty(1); //=> true
isNullOrEmpty('1'); //=> true
isNullOrEmpty(''); //=> true
isNullOrEmpty([]); //=> true
isNullOrEmpty(['foo']); //=> true
isNullOrEmpty({}); //=> true
isNullOrEmpty({ foo: 'bar' }); //=> true
```

<a name="FunctionalUtilities.Ramda.promiseAll"></a>

#### Ramda.promiseAll(promises) ⇒ <code>Array</code>

Resolves Promise.all

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param    | Type                       | Description                      |
| -------- | -------------------------- | -------------------------------- |
| promises | <code>Array.Promise</code> | Array of promises to be resolved |

**Example**

```js
TBD;
```

<a name="FunctionalUtilities.Ramda.resolve"></a>

#### Ramda.resolve(promise) ⇒ <code>\*</code>

Resolves a promse

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param   | Type                 | Description            |
| ------- | -------------------- | ---------------------- |
| promise | <code>Promise</code> | Promise to be resolved |

**Example**

```js
TBD;
```

<a name="FunctionalUtilities.Ramda.rejectEmpty"></a>

#### Ramda.rejectEmpty(input) ⇒ <code>\*</code> \| <code>void</code>

Filters out input of empty values/items

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param | Type               | Description                        |
| ----- | ------------------ | ---------------------------------- |
| input | <code>Array</code> | Input to filter empty values/items |

**Example**

```js
rejectEmpty(1); //=>
rejectEmpty('1'); //=> 1
rejectEmpty(''); //=>
rejectEmpty([]); //=>
rejectEmpty(['foo', '', {}, { foo: 'bar' }]); //=> foo,[object Object]
rejectEmpty({}); //=> [object Object]
rejectEmpty({ foo: 'bar' }); //=> [object Object]
```

<a name="FunctionalUtilities.Ramda.rejectNilOrEmpty"></a>

#### Ramda.rejectNilOrEmpty(input) ⇒ <code>\*</code> \| <code>void</code>

Filters out input of empty or null values/items

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param | Type               | Description                                |
| ----- | ------------------ | ------------------------------------------ |
| input | <code>Array</code> | Input to filter empty or null values/items |

**Example**

```js
rejectNilOrEmpty(1); //=>
rejectNilOrEmpty('1'); //=>
rejectNilOrEmpty(''); //=>
rejectNilOrEmpty([]); //=>
rejectNilOrEmpty(['foo']); //=>
rejectNilOrEmpty(['foo', '', {}, { foo: 'bar' }]); //=>
rejectNilOrEmpty({}); //=> [object Object]
rejectNilOrEmpty({ foo: 'bar' }); //=> [object Object]
```

<a name="FunctionalUtilities.Ramda.rejectNil"></a>

#### Ramda.rejectNil(input) ⇒ <code>\*</code> \| <code>void</code>

Filters out input null or undefined values/items

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param | Type               | Description                                |
| ----- | ------------------ | ------------------------------------------ |
| input | <code>Array</code> | Input to filter empty or null values/items |

**Example**

```js
rejectNil(1); //=>
rejectNil('1'); //=> 1
rejectNil(''); //=>
rejectNil([]); //=>
rejectNil(['foo']); //=> foo
rejectNil(['foo', '', {}, { foo: 'bar' }]); //=> foo,,[object Object],[object Object]
rejectNil({}); //=> [object Object]
rejectNil({ foo: 'bar' }); //=> [object Object]
```

<a name="FunctionalUtilities.Ramda.toDictionaryBy"></a>

#### Ramda.toDictionaryBy(key) ⇒ <code>T</code>

Converts an array to dictionary using provided key as reference

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Throws**:

- Will throw an error with the message supplied if condition is not fulfilled.

**Since**: v1.0.0

| Param | Type                | Description                                                   |
| ----- | ------------------- | ------------------------------------------------------------- |
| key   | <code>string</code> | Message error to be thrown in case condition is not fulfilled |

**Example**

```js
toDictionaryBy('id')([
  { id: 1, description: 'foo' },
  { id: 2, description: 'bar' }
]); //=> {1: {}}
```

<a name="FunctionalUtilities.Ramda.toDictionary"></a>

#### Ramda.toDictionary(items) ⇒ [<code>Entity</code>](#Entity)

Check if condition is fulfilled, otherwise throws supplied message error

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Throws**:

- Will throw an error with the message supplied if condition is not fulfilled.

**See**: FunctionalUtilities.toDictionaryBy  
**Since**: v1.0.0

| Param | Type                         | Description                           |
| ----- | ---------------------------- | ------------------------------------- |
| items | <code>Array.&lt;T&gt;</code> | Items to be converted into dictionary |

**Example**

```js
toDictionary([
  { id: 1, foo: 'bar' },
  { id: 2, foo: 'bar' }
]); //=> {1: {foo: 'bar'}, 2: {foo: 'bar'}}
```

<a name="FunctionalUtilities.Ramda.toPath"></a>

#### Ramda.toPath(path) ⇒ <code>Array.&lt;string&gt;</code>

Splits path by '.' into a string array

**Kind**: static method of [<code>Ramda</code>](#FunctionalUtilities.Ramda)  
**Since**: v1.0.0

| Param | Type                                     |
| ----- | ---------------------------------------- |
| path  | <code>string</code> \| <code>Path</code> |

**Example**

```js
toPath('foo.bar') => ['foo', 'bar']
toPath('3') => ['3']
```

<a name="FunctionalUtilities.invariant"></a>

### FunctionalUtilities.invariant(condition, [message]) ⇒ <code>void</code> \| <code>never</code>

Check if condition is fulfilled, otherwise throws supplied message error

**Kind**: static method of [<code>FunctionalUtilities</code>](#FunctionalUtilities)  
**Throws**:

- Will throw an error with the message supplied if condition is not fulfilled.

**Since**: v1.0.0

| Param     | Type                                     | Description                                                   |
| --------- | ---------------------------------------- | ------------------------------------------------------------- |
| condition | <code>\*</code> \| <code>function</code> | Condition that must be complied                               |
| [message] | <code>string</code>                      | Message error to be thrown in case condition is not fulfilled |

**Example**

```js
invariant(R.is('number')(3), 'Supplied value is not a number'); //=> undefined
invariant(R.is('number')('3'), 'Supplied value is not a number'); //=> 'Supplied value is not a number'
```

<a name="FunctionalUtilities.nop"></a>

### FunctionalUtilities.nop() ⇒ <code>void</code>

Defines an empty function

**Kind**: static method of [<code>FunctionalUtilities</code>](#FunctionalUtilities)  
**Since**: v1.0.0  
**Example**

```js
nop(); //=> undefined
```
