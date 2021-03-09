# UXL Project Tools [![npm version](https://badge.fury.io/js/%40uxland%2Fproject-tools.svg)](https://badge.fury.io/js/%40uxland%2Fproject-tools)

<!-- | Build Status                                    | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![BuildStatus](#buildstatus# 'Building Status') | ![Statements](#statements# 'Make me better!') | ![Branches](#branches# 'Make me better!') | ![Functions](#functions# 'Make me better!') | ![Lines](#lines# 'Make me better!') | -->

## Installation

`npm i @uxland/project-tools`

## Usage

### Build tools

#### _rollup_

```javascript
const buildConfig = require("@uxland/project-tools/build/rollup.config");
const pkg = require("./package.json");
const config = buildConfig(pkg);
module.exports = config;
```

#### _TSConfig_

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./lib",
    "composite": true
  },
  "extends": "@uxland/project-tools/build/tsconfig.json",
  "include": ["src/**/*.ts"]
}
```

### Documentation tools

```javascript
const baseConfig = require('@uxland/project-tools/documentation/jsdoc.config');
module.exports = { ...baseConfig, opts: { ...baseConfig.opts, template: <templatePath> } };
```

### Fuse

#### _devServer_

```javascript
const { fuse } = require("<node_modules>/@uxland/project-tools/fuse/start");
const pkg = require("./package.json");
fuse("demo/index.ts", "../styles/styles.scss", "demo/index.html", true, {
  APP_VERSION: pkg.version,
}).runDev();
```

#### _productionBuild_

```javascript
const { fuse } = require("<node_modules>/@uxland/project-tools/fuse/start");
const pkg = require("./package.json");
fuse("demo/index.ts", "../styles/styles.scss", "demo/index.html", true, {
  APP_VERSION: pkg.version,
}).runProd({
  uglify: false,
  target: "browser",
  bundles: {
    app: "app.$hash.js",
    vendor: "vendor.$hash.js",
  },
});
```

### Lint tools

Use provided configurations to use lint in your project

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged -c node_modules/@uxland/project-tools/lint/lint-staged.config.js",
      "commit-msg": "commitlint --config node_modules/@uxland/project-tools/lint/commitlint.config.js -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### Testing tools

```javascript
const config = require("@uxland/project-tools/test/jest.config");
const pack = require("./package");

module.exports = { ...config, name: pack.name, displayName: pack.name };
```
