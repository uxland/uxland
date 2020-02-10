# UXL Style Utilities [![npm version](https://badge.fury.io/js/%40uxland%2Fstyle-utilities.svg)](https://badge.fury.io/js/%40uxland%2Fstyle-utilities)

## Installation

`npm i @uxland/style-utilities`

## Usage

Add import statement to SCSS style file

Example:

```
@import "@uxland/style-utilities/flex-layout-styles"
@import "@uxland/style-utilities/units-styles"
@import "@uxland/style-utilities/mediaqueries-styles"
```

### Available `style-utilities` files:

`flex-layout-styles`: Flex layout

`units-styles`: Custom UXL units

`mediaqueries-styles`: Custom UXL Media queries

#### UXL Media Queries

##### SASS Variables

The following custom properties and mixins are available for styling:

| Variable                             | Description                                | Default  |
| ------------------------------------ | ------------------------------------------ | -------- |
| `$uxl-mediaqueries-phone`            | Max Width Breakpoint Mobile phone          | `599px`  |
| `$uxl-mediaqueries-tablet`           | Min Width Breakpoint Tablet                | `600px`  |
| `$uxl-mediaqueries-tablet-landscape` | Min Width Breakpoint Tablet landscape view | `900px`  |
| `$uxl-mediaqueries-desktop`          | Min Width Breakpoint Desktop view          | `1200px` |
| `$uxl-mediaqueries-desktop-hd`       | Min Width Breakpoint Desktop HD view       | `1800px` |

##### SASS Mixins

The following custom properties and mixins are available for styling:

| Mixin Name         | Description                      | Use                               |
| ------------------ | -------------------------------- | --------------------------------- |
| `phone`            | Use for Phone styles             | `@include phone {...}`            |
| `tablet`           | Use from Tablet styles           | `@include tablet {...}`           |
| `tablet-landscape` | Use from Tablet Landscape styles | `@include tablet-landscape {...}` |
| `desktop`          | Use from Desktop styles          | `@include desktop {...}`          |
| `desktop-hd`       | Use from Desktop HD styles       | `@include desktop-hd {...}`       |

##### In a SCSS file

```
div {
    @include phone {
        background-color: red;
        ...
    }
    @include tablet {
        background-color: blue;
        ...
    }
    @include tablet-landscape {
        background-color: grey;
        ...
    }
    @include desktop {
        background-color: orange;
        ...
    }
    @include desktop-hd {
        background-color: green;
        ...
    }
}
```
