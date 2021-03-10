# UXL Localization [![npm version](https://badge.fury.io/js/%40uxland%2Flocalization.svg)](https://badge.fury.io/js/%40uxland%2Flocalization)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](https://img.shields.io/badge/Build-Passing-brightgreen.svg "Building Status") | ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-92.86%25-brightgreen.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") |

## Installation

`npm i @uxland/localization`

## Usage

A default mixin is provided in order to be able to use localization functionalities and subscribe to language and locales changes.

```typescript
export class Klass implements locale(BaseKlass) {}
```

In order to use custom formats in localization, define a new mixin provinding a factory including the desired formats.

```typescript
const customLocale = localeMixin(() =>
  localizerFactory('en', {}, { number: { EUR: { style: 'currency', currency: 'EUR' } } })
);

export class Klass implements customLocale(BaseKlass) {}
```

### Update current language

Set the current language that will be used in order to retrieve proper localization. Each time locales are updated, the event `LANGUAGE_UPDATED` will be published in order to inform all subscribers that the language has changed

```typescript
setLanguage('en');
```

To retrieve current language from anywhere in the code, use:

```typescript
getLanguage();
```

It is possible to reset locales to its default. This action will publish a `LANGUAGE_RESET` event.

```typescript
resetLanguage();
```

> By default, language is set to english `en`.

### Update current formatters

Set the current formatters that will be used in order to retrieve proper localization. Each time locales are updated, the event `FORMATTERS_UPDATED` will be published in order to inform all subscribers that the formatters has changed.

> Formatters must follow

```typescript
setFormatters({ number: { EUR: { style: 'currency', currency: 'EUR' } } });
```

To retrieve current formatters from anywhere in the code, use:

```typescript
getFormatters();
```

It is possible to reset locales to its default. This action will publish a `FORMATTERS_RESET` event.

```typescript
resetFormatters();
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

To retrieve current locales dictionary, use:

```typescript
getLocales();
```

It is possible to reset locales to its default dictionary. This action will publish a `LOCALES_RESET` event.

```typescript
resetLocales();
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
localize(`foo.greetings`, {id: 'John Doe'}); // => "Hello John Doe"
```

It is also possible to use pluralization as follows:

```typescript
const locales = [language]: {
		foo: {
			title: 'Title',
			subtitle: 'Subtitle',
			greetings: 'Hi {name}!',
			cats: '{cats, plural, =0 {No cats} =1 {A cat} other {# cats}}'
		}
setLocales(locales);
localize(`foo.cats`, 'cats', 0); // => "No cats"
localize(`foo.cats`, 'cats', 1); // => "A cat"
localize(`foo.cats`, 'cats', 3); // => "3 cats"
```

Also currency can be localized as follows:

```typescript
const locales = [language]: {
		foo: {
			title: 'Title',
			subtitle: 'Subtitle',
			greetings: 'Hi {name}!',
			cats: '{cats, plural, =0 {No cats} =1 {A cat} other {# cats}}',
			salary: 'Your salary is {salary, number, EUR}'
		}
setLocales(locales);
setFormatters({
        number: { EUR: { style: 'currency', currency: 'EUR' } },
      });
localize(`foo.salary`, { salary: 2000 }); // => "Your salary is €2,000.00"
```
