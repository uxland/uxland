# UXL Localization [![npm version](https://badge.fury.io/js/%40uxland%2Flocalization.svg)](https://badge.fury.io/js/%40uxland%2Flocalization)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# 'Building Status') | ![Statements](#statements# 'Make me better!') | ![Branches](#branches# 'Make me better!') | ![Functions](#functions# 'Make me better!') | ![Lines](#lines# 'Make me better!') |

## Installation

`npm i @uxland/localization`

## Usage

A mixin is provided in order to be able to use localization functionalities and subscribe to language and locales changes.

```typescript
export class Klass implements locale(BaseKlass) {}
```

### Update current language

Set the current language that will be used in order to retrieve proper localization. Each time locales are updated, the event `LANGUAGE_UPDATED` will be published in order to inform all subscribers that the locales dictionary has changed

```typescript
setLanguage('en');
```

### Set locales dictionary

Locales must follow the next format:

```typescript
const locales = [language]: {
		foo: {
			title: 'Title',
			subtitle: 'Subtitle'
		}
	};
```

Each time locales are updated, the event `LOCALES_UPDATED` will be published in order to inform all subscribers that the locales dictionary has changed.

```typescript
setLocales(locales);
```

### Localize

When localizing, the current language is used to retrieve language's locales. Providing a path to the `localize` function, this will return the corresponding string defined in locales dictonary.

```typescript
const locales = [language]: {
		foo: {
			title: 'Title',
			subtitle: 'Subtitle',
			greetings: 'Hi!'
		}
	};
setLocales(locales);
localize(`foo.title`); // => "Title"
```

Arguments can also be provided to `localize` in order to get dynamic locales as it is specified bellow:

```typescript
const locales = [language]: {
		foo: {
			title: 'Title',
			subtitle: 'Subtitle',
			greetings: 'Hi {name}!'
		}
setLocales(locales);
localize(`foo.greetings`, 'id', 'John Doe'); // => "Hello John Doe"
```
