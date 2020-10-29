import { fusebox, pluginSass, pluginLink, pluginReplace } from "fuse-box";
import { join, resolve } from "path";
// import { runUpdateSimulation } from './simulate';
require("dotenv").config();

const workspaceRoot = join(__dirname, "../../../../");
console.log("Workspace Root:", workspaceRoot);

// set AUTOMOD to true to automatically update some files to trigger the watcher
// runUpdateSimulation(!!process.env.AUTOMOD);

/**
 * Fuse base constructor
 * @param {string} entry Demo entry point
 * @param {string} baseStyles Base scss styles path
 * @param {string} webIndex Demo entry html
 * @param {boolean} devServer Run server
 * @param {string} publicPath Public path
 * @param {*} env Environment variables
 */
export const fuse = (
  entry: string,
  baseStyles: string,
  webIndex: string,
  devServer: boolean,
  publicPath = "/",
  env: any = {}
) =>
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
        ? [{ file: baseStyles, capture: "packages/*/src" }]
        : undefined,
    },
    plugins: [
      pluginSass("*.scss", { asText: true }),
      pluginLink(/.+\.png/, { useDefault: true }),
      pluginLink(/.+\.svg/, { useDefault: true }),
    ],
    webIndex: { template: webIndex, publicPath },
    resources: {
      resourcePublicRoot: `${publicPath}resources/`,
      resourceFolder: `resources/`,
    },
  });
