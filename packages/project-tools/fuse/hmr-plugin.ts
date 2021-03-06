export default function hmrUpdate(FuseBox: any, moduleNames: any) {
  window.location.reload();
}

/**
 * TODO:
 * Wait for complete HMR Plugin documentation.
 *
 * TODO:
 * CustomElements HMR is not working due to re-defined custom-elements.
 * The following project is not working in our case yet.
 * https://github.com/simple-html/starter-web
 * https://www.npmjs.com/package/custom-elements-hmr-polyfill
 *
 */

// https://github.com/basarat/fuse-hmr/blob/master/src/index.ts
// const customizedHMRPlugin = {
//   hmrUpdate: ({ type, path, content }) => {
//     if (type === "js") {
//       const isModuleNameInPath = (path) => statefulModules.some(name => path.includes(name));

//       /** If a stateful module has changed reload the window */
//       if (isModuleNameInPath(path)) {
//         window.location.reload();
//       }

//       /** Otherwise flush the other modules */
//       _userFuseBox.flush(function(fileName) {
//         return !isModuleNameInPath(fileName);
//       });
//       /** Patch the module at give path */
//       _userFuseBox.dynamic(path, content);

//       /** Re-import / run the mainFile */
//       if (_userFuseBox.mainFile) {
//         _userFuseBox.import(_userFuseBox.mainFile)
//       }

//       /** We don't want the default behavior */
//       return true;
//     }
//   }
// }

// /** Only register the plugin once */
// let alreadyRegistered = false;

// /** Current names of stateful modules */
// let statefulModules = [];

// /** FuseBox instance in the user code base */
// let _userFuseBox: any;

// /**
//  * Registers given module names as being stateful
//  * @param modulesNames full or partial path to module name
//  */
// export const setStatefulModules = (FuseBox: any, moduleNames: string[]) => {
//   if (!alreadyRegistered) {
//     alreadyRegistered = true;
//     FuseBox.addPlugin(customizedHMRPlugin);
//     _userFuseBox = FuseBox;
//   }
//   statefulModules = moduleNames;
// }
