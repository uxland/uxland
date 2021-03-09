# UXL Browser Utilities [![npm version](https://badge.fury.io/js/%40uxland%2Fbrowser-utilities.svg)](https://badge.fury.io/js/%40uxland%2Fbrowser-utilities)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# "Building Status") | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") |

## Installation

`npm i @uxland/browser-utilities`

## Usage

### Get browser's language

Returns language depending on user's navigator languages

```typescript
getBrowserLang(); //=> 'ca'
```

### Meta

Display's meta information such as browser version, UA, LitElement version

```typescript
displayMetaInformation();
```

### Layout sizing

Display's layout sizing

```typescript
displayLayoutSizing(true);
```

### Convert file to base64

```typescript
const file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});
await toBase64(file); //=> data:text/plain;base64,Zm9v
```

### Browser's device

Returns true depending on device type

```typescript
isTabletBrowser(); //=> true | false
isMobileBrowser(); //=> true | false
isMobileOrTabletBrowser(); //=> true | false
```

### Animation frame

Asynchronous task that will call provided callback in next window animation frame

```typescript
const callback = () => console.log("task ended");
const handler = animationFrame.run(callback); //=> 'task ended'
// To cancel asynchronous task
animationFrame.cancel(handler);
```

### Asynchronous queue

Creates an asynchronous queue instance that will call provided function when possible

```typescript
const executor = (...args: any[]) => console.log("Queue Executor", args);
const queue = new AsyncQueue(executor);
queue.enqueueItem(1); //=> 'Queue Executor' 1;
```

### Debouncer

https://polymer-library.polymer-project.org/3.0/api/utils/debounce

### Idle Period

### Micro task

https://polymer-library.polymer-project.org/3.0/api/utils/async

### Time out

https://polymer-library.polymer-project.org/3.0/api/utils/async
