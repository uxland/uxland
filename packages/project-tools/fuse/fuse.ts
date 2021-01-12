import { fusebox, pluginSass, pluginLink, pluginCSS } from "fuse-box";
import { join } from "path";
// import { runUpdateSimulation } from './simulate';
require("dotenv").config();

const workspaceRoot = join(__dirname, "../../../../");
console.log("Workspace Root:", workspaceRoot);

// set AUTOMOD to true to automatically update some files to trigger the watcher
// runUpdateSimulation(!!process.env.AUTOMOD);

/**
 * Fuse base constructor
 * @param {Object} config Fuse configuration
 * @param {string} config.entry Demo entry point
 * @param {string} config.baseStyles Base scss styles path
 * @param {string} config.webIndex Demo entry html
 * @param {boolean} config.devServer Run server
 * @param {string=} config.publicPath Public path
 * @param {string[]=} config.workspaces Workspaces ids
 * @param {*=} config.env Environment variables
 */
export const fuse = ({
  entry,
  baseStyles,
  webIndex,
  devServer,
  publicPath = "/",
  workspaces = ["packages"],
  env = {},
}) =>
  fusebox({
    cache: false,
    compilerOptions: {
      tsConfig: "tsconfig.json",
    },
    devServer,
    hmr: true,
    entry,
    env,
    target: "browser",
    watcher: {
      root: [workspaceRoot],
    },
    stylesheet: {
      macros: {
        "~": join(__dirname, "../../../"),
      },
      autoImport: baseStyles
        ? workspaces.map((w) => ({ file: baseStyles, capture: `${w}/*/src` }))
        : undefined,
    },
    plugins: [
      pluginSass("*.scss", { asText: true }),
      pluginCSS("*.css", { asText: true }),
      pluginLink(/.+\.png/, { useDefault: true }),
      pluginLink(/.+\.svg/, { useDefault: true }),
    ],
    webIndex: { template: webIndex, publicPath },
    resources: {
      resourcePublicRoot: `${publicPath}resources/`,
      resourceFolder: `resources/`,
    },
  });
