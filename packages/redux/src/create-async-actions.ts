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
let STUB = 1;
/**
 * Async Actions
 * @interface AsyncActions
 * @memberof Redux
 * @since v1.0.0
 * @property {string} started Action started ID
 * @property {string} failed Action failed ID
 * @property {string} succeeded Action succeeded ID
 * @property {string} ended Action ended ID
 * @property {string} invalidated Action invalidated ID
 */
STUB = 1;
export interface AsyncActions {
  started: string;
  failed: string;
  succeeded: string;
  ended: string;
  invalidated: string;
}

export const ENDED_SUFFIX = '_ENDED';
export const FAILED_SUFFIX = '_FAILED';
export const STARTED_SUFFIX = '_STARTED';
export const SUCCEEDED_SUFFIX = '_SUCCEEDED';
export const INVALIDATED_SUFFIX = '_INVALIDATED';

/**
 * Async action ids creator
 * @function
 * @memberof Redux
 * @name createAsyncActions
 * @since v1.0.0
 * @param {string} actionName Action name to compose async action ids
 * @returns {Redux.AsyncActions}
 * @example
 *
 * createAsyncActions('ACTION') //=> { failed: 'ACTION_FAILED', started: 'ACTION_STARTED', ended: 'ACTION_ENDED', succeeded: 'ACTION_SUCCEEDED', invalidated: 'ACTION_INVALIDATED' }
 *
 */
export const createAsyncActions: (actionName: string) => AsyncActions = actionName => {
  return {
    failed: `${actionName}${FAILED_SUFFIX}`,
    started: `${actionName}${STARTED_SUFFIX}`,
    ended: `${actionName}${ENDED_SUFFIX}`,
    succeeded: `${actionName}${SUCCEEDED_SUFFIX}`,
    invalidated: `${actionName}${INVALIDATED_SUFFIX}`
  };
};
