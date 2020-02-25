# UXL Localization [![npm version](https://badge.fury.io/js/%40uxland%2Flocalization.svg)](https://badge.fury.io/js/%40uxland%2Flocalization)

| Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# 'Building Status') | ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'Make me better!') | ![Branches](https://img.shields.io/badge/Coverage-92.31%25-brightgreen.svg 'Make me better!') | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'Make me better!') | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'Make me better!') |

## Installation

`npm i @uxland/localization`

## Usage

```typescript
const locales = ca: {
		[moduleName]: {}
	},
	en: {
		[moduleName]: {}
	},
	es: {
        [moduleName]: {
            key:  'Esto es la cadena'
        }
    }
props.localize(`${moduleName}.key`)
```

With arguments

```typescript
const locales = ca: {
		[moduleName]: {}
	},
	en: {
		[moduleName]: {}
	},
	es: {
        [moduleName]: {
            order:  'Pedido con id {id}'
        }
    }
props.localize(`${moduleName}.key`, 'id', '12345');
```
