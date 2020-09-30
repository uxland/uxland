import { RouteParams, RouteQueryString } from "./router";

let STUB = 1;
/**
 * RouterHook type
 * @memberof Routing
 * @since v1.0.0
 * @typedef {function} HookFn
 * @param {string} url URL
 * @param {Routing.RouteParams} params URL parameters
 * @param {Routing.RouteQueryString} queryString URL query string parameters
 * @returns {Promise<boolean>}
 */
STUB = 1;
export type HookFn = (
  url: string,
  params: RouteParams,
  queryString: RouteQueryString
) => Promise<boolean>;

/**
 * RouterHooks interface
 * @memberof Routing
 * @since v1.0.0
 * @interface RouterHooks
 * @property {Routing.HookFn} canNavigateFrom Checks if routing can be done from current location
 * @property {Routing.HookFn} canNavigateTo Checks if routing can be done to new location
 * @property {Routing.HookFn} navigatedFrom Performs actions after navigation
 */
STUB = 1;
export interface RouterHooks {
  canNavigateFrom?: HookFn;
  canNavigateTo?: HookFn;
  navigatedFrom?: HookFn;
}
