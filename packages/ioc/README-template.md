# UXL IOC [![npm version](https://badge.fury.io/js/%40uxland%2Fioc.svg)](https://badge.fury.io/js/%40uxland%2Fioc)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# "Building Status") | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") |

## Installation

`npm i @uxland/ioc`

## Usage

### Register constructor singleton to iocContainer

Registers a constructor singleton to the InversionOfControl container. Each time a reference of the constructor or abstract class is provided with inversify, the container will provide with its singleton pair.

```typescript
@provideSingleton()
class IOCAdapter {
  method(): void {
    console.log("Calling `method` from `IOCAdapter`");
  }
}

class Adapter {
  constructor(@inject(IOCAdapter) protected adapter: IOCAdapter) {
    this.adapter.method(); // => 'Calling `method` from `IOCAdapter`'
  }
}
```

### Set Mediator resolver

This method overrides the mediator default resolver to use our own container.

```typescript
const container: Container = new Container();
setMediatorResolver(container);
```
