import * as utilities from '@uxland/utilities';
import { appsBaseRouteSelector } from "./options";
import { store } from "./store";
import { ModuleInfo } from "./user";
export const calculateModuleBaseRoute: (moduleInfo: ModuleInfo) => string = moduleInfo => moduleInfo.url ?
    moduleInfo.url.substring(0, moduleInfo.url.indexOf('/main.js')) : `${utilities['rootPath']}${appsBaseRouteSelector(store.getState())}${moduleInfo.folder}`;