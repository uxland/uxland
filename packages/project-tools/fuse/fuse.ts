import { fusebox, pluginSass, pluginLink, pluginCSS } from "fuse-box";
import { IDevServerProps } from "fuse-box/devServer/devServerProps";
import { join } from "path";
// import { runUpdateSimulation } from './simulate';
require("dotenv").config();

const workspaceRoot = join(__dirname, "../../../../");
console.log("Workspace Root:", workspaceRoot);

// set AUTOMOD to true to automatically update some files to trigger the watcher
// runUpdateSimulation(!!process.env.AUTOMOD);

let STUB = 1;
/**
 * Fuse configuration
 * @interface FuseConfig
 * @memberof ProjectTools
 * @since v1.0.0
 * @property {string} entry Demo entry point
 * @property {string} baseStyles Base scss styles path
 * @property {string} webIndex Demo entry html
 * @property {boolean|Object} devServer Run server configuration
 * @property {string=} publicPath Public path
 * @property {string[]=} workspaces Workspaces ids
 * @property {*=} env Environment variables
 */
interface FuseConfig {
  entry: string;
  baseStyles: string;
  webIndex: string;
  devServer: boolean | IDevServerProps;
  publicPath?: string;
  workspaces?: string[];
  env?: any;
}
STUB = 1;

/**
 * Fuse base constructor
 * @memberof ProjectTools
 * @function
 * @name fuse
 * @param {ProjectTools.FuseConfig} config Fuse configuration
 
 */
export function fuse(config: FuseConfig) {
  return fusebox({
    cache: true,
    compilerOptions: {
      tsConfig: "tsconfig.json",
    },
    devServer: config.devServer,
    hmr: true,
    entry: config.entry,
    env: config.env || {},
    target: "browser",
    watcher: {
      root: (config.workspaces || ["packages"]).map((w) =>
        join(workspaceRoot, w)
      ),
    },
    stylesheet: {
      macros: {
        "~": join(__dirname, "../../../"),
      },
      autoImport: config.baseStyles
        ? (config.workspaces || ["packages"]).map((w) => ({
            file: config.baseStyles,
            capture: `${w}/*/src`,
          }))
        : undefined,
    },
    plugins: [
      pluginSass("*.scss", { asText: true }),
      pluginCSS("*.css", { asText: true }),
      pluginLink(/.+\.png/, { useDefault: true }),
      pluginLink(/.+\.svg/, { useDefault: true }),
    ],
    webIndex: {
      template: config.webIndex,
      publicPath: config.publicPath || "/",
    },
    resources: {
      resourcePublicRoot: `${config.publicPath || "/"}resources/`,
      resourceFolder: `resources/`,
    },
  });
}
