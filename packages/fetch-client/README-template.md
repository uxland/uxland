# UXL Fetch Client [![npm version](https://badge.fury.io/js/%40uxland%2Ffetch-client.svg)](https://badge.fury.io/js/%40uxland%2Ffetch-client)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# "Building Status") | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") |

## Installation

`npm i @uxland/fetch-client`

## Usage

### Configuration

**_Set Base URL_**

All relative fetch will use provided url as its own base URL. If using absolute uri when fetching, this will not be taken into account.

```typescript
import { setBaseUrl } from "@uxland/fetch-client";
setBaseUrl("http://localhost");
```

**_Register response handlers_**

Register a response handler to manipulate result.

```typescript
import { registerResponseHandler } from "@uxland/fetch-client";
registerResponseHandler((response) => JSON.stringify(response));
```

**_Change fetch client configuration_**

Change configuration globally. All fetch requests will use this configuration.

```typescript
import { configure } from '@uxland/fetch-client';
configure({mode: 'no-cors',{ headers: {authorization: 'Bearer <token>' }}});
```

**_Change fetch client headers_**

Change headers globally. All fetch requests will use specified headers.

```typescript
import { setHeaders } from "@uxland/fetch-client";
setHeaders({ authorization: "Bearer <token>" });
```

**_Delete specific header_**

Remove a header from global headers using provided id.

```typescript
import { removeHeader } from "@uxland/fetch-client";
removeHeader("authorization");
```

**_Reset fetch client headers_**

Reset global headers to default.

```typescript
import { resetHeaders } from "@uxland/fetch-client";
resetHeaders();
```

### Fetch data

```typescript
import { doFetch } from "@uxland/fetch-client";
const response = doFetch("/dummy", { mode: "no-cors" }, { foo: "bar" })
  .then((r) => r)
  .catch((e) => e);
```

In addition, fetchClient also publishes (via `@uxland/event-aggregator`) two events INVALID_CREDENTIALS_EVENT and INVALID_REQUEST_EVENT when credentials are invalid or request has failed.
