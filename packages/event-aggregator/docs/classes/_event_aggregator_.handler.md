[@uxland/event-aggregator](../README.md) › [Globals](../globals.md) › ["event-aggregator"](../modules/_event_aggregator_.md) › [Handler](_event_aggregator_.handler.md)

# Class: Handler

Event Aggregator handler

**`since`** v1.0.0

## Hierarchy

* **Handler**

## Index

### Constructors

* [constructor](_event_aggregator_.handler.md#constructor)

### Properties

* [callback](_event_aggregator_.handler.md#private-callback)
* [messageType](_event_aggregator_.handler.md#private-messagetype)

### Methods

* [handle](_event_aggregator_.handler.md#handle)

## Constructors

###  constructor

\+ **new Handler**(`messageType`: any, `callback`: [EventCallback](../modules/_event_aggregator_.md#eventcallback)): *[Handler](_event_aggregator_.handler.md)*

Defined in event-aggregator.ts:63

Handler constructor

**`since`** v1.0.0

**`example`** 

`new Handler('click', (ev) => console.log(ev))`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`messageType` | any | Handler message type |
`callback` | [EventCallback](../modules/_event_aggregator_.md#eventcallback) | Handler callback |

**Returns:** *[Handler](_event_aggregator_.handler.md)*

## Properties

### `Private` callback

• **callback**: *[EventCallback](../modules/_event_aggregator_.md#eventcallback)*

Defined in event-aggregator.ts:63

Handler calback

**`since`** v1.0.0

___

### `Private` messageType

• **messageType**: *any*

Defined in event-aggregator.ts:54

Handler messageType

**`const`** 

**`since`** v1.0.0

## Methods

###  handle

▸ **handle**(`message`: any): *void*

Defined in event-aggregator.ts:88

Handle event

**`function`** 

**`since`** v1.0.0

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | any | Message  |

**Returns:** *void*
