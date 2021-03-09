# UXL Event Aggregator [![npm version](https://badge.fury.io/js/%40uxland%2Fevent-aggregator.svg)](https://badge.fury.io/js/%40uxland%2Fevent-aggregator)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](https://img.shields.io/badge/Build-Passing-brightgreen.svg "Building Status") | ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-81.25%25-yellow.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") |

## Installation

`npm i @uxland/event-aggregator`

## Usage

### Event Aggregator instance

It is possible to define numerous instances of the Event Aggregator within a project, each one with the same or different events subscribed, simulating each instance as a new channel of communication.

```typescript
const EA = new EventAggregator();
const EA2 = new EventAggregator();

EA.subscribe('event', () => {...});
EA2.subscribe('event2', () => {...});
EA.subscribe('common-event', () => {...});
EA2.subscribe('common-event', () => {...});
```

### Event publish

To publish an event you must specify an eventId and an optional payload that will be collected by subscriber.

```typescript
const payload = { foo: "bar" };
publish("EVENT-ID", payload);
```

It is possible also to provide a class instead of a string event

```typescript
publish(new Klass(), callback);
```

If a subscription is done with provided class, the callback provided at the subscription moment will be called.

### Event subscription

In order to subscribe to an event you must specify an eventId and a callback function that will be called when that event is received.

```typescript
const callback = (payload: any): void => {};
subscribe("EVENT-ID", callback);
```

It is possible also to provide a class instead of a string event

```typescript
subscribe(Klass, callback);
```

### Event subscription (only once)

In order to subscribe to an event, only once, you must specify an eventId and a callback function that will be called when that event is received. For the next publishes of that event, this subscriber will not receive that event.

```typescript
const callback = (payload: any): void => {};
subscribeOnce("EVENT-ID", callback);
```
