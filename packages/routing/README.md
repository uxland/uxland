# UXL Routing [![npm version](https://badge.fury.io/js/%40uxland%2Frouting.svg)](https://badge.fury.io/js/%40uxland%2Frouting)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](https://img.shields.io/badge/Build-Passing-brightgreen.svg "Building Status") | ![Statements](https://img.shields.io/badge/Coverage-92.26%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-82.64%25-yellow.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-95.24%25-brightgreen.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-92.55%25-brightgreen.svg "Make me better!") |

## Installation

`npm i @uxland/routing`

## Usage

### Initialization

Create an instance of router. The constructor accepts three parameters: routes array, router root url and hash character.

```typescript
const routes: Route[] = [{ route: "dummy" }, { route: "foo" }];
const router = new Router(routes);
```

### Registering routes

It is possible to register new routes at any moment using provided `registerRoutes` function. It accepts a single route or an array of routes:

```typescript
router.registerRoutes({ route: "bar" });
router.registerRoutes([{ route: "qux" }]);
```

#### Get registered routes

```typescript
const router = new Router([{ route: "dummy" }]);
console.log(router.routes); //=> [{route: 'dummy'}]
```

#### Dynamic routes

It is possible to define dynamic routes with parameters:

```typescript
router.registerRoutes({ route: "dummy/:id/:action" });

// When navigating to dummy/foo/bar, parameters are:
// id: foo
// action: bar
```

#### Route hooks

Route can have before and after navigation hooks that determine the possibility of navigation by returning a boolean promise and follow the next interface:

```typescript
export type HookFn = (
  url: string,
  params: RouteParams,
  queryString: RouteQueryString
) => Promise<boolean>;

router.registerRoutes({
  route: "dummy/:id",
  hooks: { canNavigateFrom, canNavigateTo, navigatedFrom },
});
```

##### canNavigateFrom

This hook is executed before navigation happens and it is used in order to check if it is possible to navigate from current route.

##### canNavigateTo

This hook is executed before navigation happens and it is used in order to check if it is possible to navigate to new route.

##### navigatedFrom

This hook is executed after navigation happends and it is used as a callback function to be executed to perform actions after navigation has been completed.

### Not Found Handler

When navigating to a route that is not registered, it is possible to provide a handler that will be executed:

```typescript
const router = new Router([{ route: "dummy" }]);
router.notFound((url: string) => console.log(`${url} not registered`));
router.navigate("foo");
//=> Console output: "foo not registered"
```

### Navigate

Use navigate method to change location:

```typescript
router.navigate("dummy");
router.navigate("http://localhost/dummy");
```

#### Last resolved url

After navigation happens (successfully or not), last resolved url is stored

```typescript
const router = new Router([{ route: "dummy" }]);
router.navigate("dummy");
console.log(router.lastResolvedUrl); //=> 'dummy'
```

### Destroy

Resets router instance by emptying registered routes and last resolved url

```typescript
const router = new Router([{ route: "dummy" }, { route: "foo" }]);
router.getRoutes(); //=> [{route: 'dummy'}, {route: 'foo'}]
router.navigate("dummy");
router.lastResolvedUrl; //=> 'dummy'
router.destroy();
router.getRoutes(); //=> []
router.lastResolvedUrl; //=> ''
```
