# UXL React Services [![npm version](https://badge.fury.io/js/%40uxland%2Freact-services.svg)](https://badge.fury.io/js/%40uxland%2Freact-services)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# "Building Status") | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!") |

## Installation

`npm i @uxland/react-services`

## Usage

### Get Hook

```
getHook('hookName', {foo: 'bar'});
```

### Notification Service

```
const service = new NotificationService();
service.notify('foo', {position: 'bottom-right'});
service.notifyError('foo', {position: 'bottom-right'});
```

### I18N

#### Setup i18n

```
setupI18n({foo: 'bar'}, 'es', '-');
```

#### Translation Service

```
const service = new TranslationService();
service.translate('foo');
```

#### Add locale bundle

```
addLocaleBundle("ca", "ns", {foo: {bar: "dummy"}});
```

#### Global path hook

```
const globalPath = useGlobalPath();
globalPath("ns.foo.bar") // => dummy
```

#### Locale path hook

```
const localePath = useLocalePath("ns");
localePath("foo.bar") // => dummy
```

#### Translate

```
translate('ns', 'foo.bar', {dummy: 0})
```
