[@uxland/event-aggregator](../README.md) › [Globals](../globals.md) › ["event-aggregator"](_event_aggregator_.md)

# External module: "event-aggregator"

## Index

### Classes

* [EventAggregator](../classes/_event_aggregator_.eventaggregator.md)
* [Handler](../classes/_event_aggregator_.handler.md)

### Interfaces

* [Subscription](../interfaces/_event_aggregator_.subscription.md)

### Type aliases

* [EventCallback](_event_aggregator_.md#eventcallback)

### Functions

* [invokeCallback](_event_aggregator_.md#const-invokecallback)
* [invokeHandler](_event_aggregator_.md#const-invokehandler)

## Type aliases

###  EventCallback

Ƭ **EventCallback**: *function*

Defined in event-aggregator.ts:39

EventCallback type

#### Type declaration:

▸ (`data`: any, `event?`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`event?` | string |

## Functions

### `Const` invokeCallback

▸ **invokeCallback**(`callback`: [EventCallback](_event_aggregator_.md#eventcallback), `data`: any, `event`: string): *void | never*

Defined in event-aggregator.ts:108

Invoke Callback and catches if error

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`callback` | [EventCallback](_event_aggregator_.md#eventcallback) | Callback to be called |
`data` | any | Callback payload |
`event` | string | Callback event-related to pass as argument to callback |

**Returns:** *void | never*

___

### `Const` invokeHandler

▸ **invokeHandler**(`handler`: [Handler](../classes/_event_aggregator_.handler.md), `data`: any): *void | never*

Defined in event-aggregator.ts:128

Invoke Handler and catches if error

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handler` | [Handler](../classes/_event_aggregator_.handler.md) | Handler to be called |
`data` | any | Handler payload |

**Returns:** *void | never*
