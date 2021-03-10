"use strict";

const babel = require("rollup-plugin-babel");
// uglify handles only es5 code, so this also acts as smoke test against shipping es2015+ syntax
const uglify = require("rollup-plugin-uglify").uglify;

const buildConfig = (pkg) => {
  const banner = `// ${pkg.description} v${pkg.version}
// ${pkg.homepage}
// (c) 2020-${new Date().getFullYear()} UXLand
// UXLand libraries may be freely distributed under the MIT license.\n`;

  const input = "lib/index.js";

  const config = {
    input: input,
    output: {
      format: "umd",
      name: pkg.name,
      exports: "named",
      // banner: banner
    },
    plugins: [
      babel({ presets: [["@babel/preset-env", { targets: { ie: "11" } }]] }),
    ],
  };

  if (process.env.NODE_ENV === "production") {
    config.plugins.push(
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
        warnings: false,
      })
    );
  }

  return config;
};

module.exports = buildConfig;
