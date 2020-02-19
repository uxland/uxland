[@uxland/event-aggregator](../README.md) › [Globals](../globals.md) › ["event-aggregator"](../modules/_event_aggregator_.md) › [EventAggregator](_event_aggregator_.eventaggregator.md)

# Class: EventAggregator

Event Aggregator

**`since`** v1.0.0

**`example`** 

`TBD`

## Hierarchy

* **EventAggregator**

## Index

### Constructors

* [constructor](_event_aggregator_.eventaggregator.md#constructor)

### Properties

* [eventLookup](_event_aggregator_.eventaggregator.md#eventlookup)
* [messageHandlers](_event_aggregator_.eventaggregator.md#messagehandlers)

### Methods

* [publish](_event_aggregator_.eventaggregator.md#publish)
* [subscribe](_event_aggregator_.eventaggregator.md#subscribe)
* [subscribeOnce](_event_aggregator_.eventaggregator.md#subscribeonce)

## Constructors

###  constructor

\+ **new EventAggregator**(): *[EventAggregator](_event_aggregator_.eventaggregator.md)*

Defined in event-aggregator.ts:158

EventAggregator constructor

**`since`** v1.0.0

**Returns:** *[EventAggregator](_event_aggregator_.eventaggregator.md)*

## Properties

###  eventLookup

• **eventLookup**: *object*

Defined in event-aggregator.ts:151

Event collection

**`since`** v1.0.0

___

###  messageHandlers

• **messageHandlers**: *Array‹any›*

Defined in event-aggregator.ts:158

Message Handlers

**`since`** v1.0.0

## Methods

###  publish

▸ **publish**(`event`: string, `data`: any): *void | never*

Defined in event-aggregator.ts:184

Publishes a message

**`function`** 

**`since`** v1.0.0

**`throws`** Event channel/type is invalid

**`example`** 

`TBD`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | string | The event or channel to publish to |
`data` | any | The data to publish on the channel |

**Returns:** *void | never*

___

###  subscribe

▸ **subscribe**(`event`: string, `callback`: [EventCallback](../modules/_event_aggregator_.md#eventcallback)): *[Subscription](../interfaces/_event_aggregator_.subscription.md)*

Defined in event-aggregator.ts:225

Subscribes to a message channel or message type

**`function`** 

**`since`** v1.0.0

**`throws`** Event channel/type is invalid

**`example`** 

`TBD`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | string | The event channel or event data type |
`callback` | [EventCallback](../modules/_event_aggregator_.md#eventcallback) | The callback to be invoked when when the specified message is published |

**Returns:** *[Subscription](../interfaces/_event_aggregator_.subscription.md)*

___

###  subscribeOnce

▸ **subscribeOnce**(`event`: string, `callback`: [EventCallback](../modules/_event_aggregator_.md#eventcallback)): *[Subscription](../interfaces/_event_aggregator_.subscription.md)*

Defined in event-aggregator.ts:265

Subscribes to a message channel or message type, then disposes the subscription automatically after the first message is received

**`function`** 

**`since`** v1.0.0

**`example`** 

`TBD`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | string | The event channel or event data type |
`callback` | [EventCallback](../modules/_event_aggregator_.md#eventcallback) | The callback to be invoked when when the specified message is published |

**Returns:** *[Subscription](../interfaces/_event_aggregator_.subscription.md)*
