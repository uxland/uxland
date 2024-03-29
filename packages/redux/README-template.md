# UXL Redux [![npm version](https://badge.fury.io/js/%40uxland%2Fredux.svg)](https://badge.fury.io/js/%40uxland%2Fredux)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# "Building Status") | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") |

## Installation

`npm i @uxland/redux`

## Usage

### Reset Action

Dispatch this action to reset all resetable reducers

```
dispatch(resetAction())
```

### Create Async Slice

Creates a slice that can be used to control asynchronous cases in state

```
createAsyncSlice('sliceName', {status: AsyncStateStatus.idle, data: {foo: 'bar'}, error: null});
store.getState() //=> {sliceName: {status: 'idle', data: {foo: 'bar'}, error: null}}
```

### Store Service
Creates a Redux store

```
const defaultSlice = createAsyncSlice('sliceName', {status: AsyncStateStatus.idle, data: {foo: 'bar'}, error: null})
const store = new StoreService({sliceName: defaultSlice.reducer}, 'store-name', true);
store.dispatch(defaultSlice.actions.setStatus(AsyncStateStatus.error))
store.getState() //=> {sliceName: {status: 'error', data: {foo: 'bar'}, error: null}}
```
