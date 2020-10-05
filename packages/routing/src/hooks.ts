/*
 * MIT License
 *
 * Copyright (c) 2020 UXLand
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
 * THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
