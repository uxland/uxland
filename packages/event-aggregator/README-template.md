# UXL Event Aggregator [![npm version](https://badge.fury.io/js/%40uxland%2Fevent-aggregator.svg)](https://badge.fury.io/js/%40uxland%2Fevent-aggregator)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# 'Building Status') | ![Statements](#statements# 'Make me better!') | ![Branches](#branches# 'Make me better!') | ![Functions](#functions# 'Make me better!') | ![Lines](#lines# 'Make me better!') |

## Installation

`npm i @uxland/event-aggregator`

## Usage

### Event publish

To publish an event you must specify an eventId and an optional payload that will be collected by subscriber.

```typescript
const payload = { foo: 'bar' };
publish('EVENT-ID', payload);
```

### Event subscription

In order to subscribe to an event you must specify an eventId and a callback function that will be called when that event is received.

```typescript
const callback = (payload: any): void => {};
subscribe('EVENT-ID', callback);
```

### Event subscription (only once)

In order to subscribe to an event, only once, you must specify an eventId and a callback function that will be called when that event is received. For the next publishes of that event, this subscriber will not receive that event.

```typescript
const callback = (payload: any): void => {};
subscribeOnce('EVENT-ID', callback);
```
