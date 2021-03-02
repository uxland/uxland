/*
 * BSD License
 *
 * Copyright (c) 2020, UXLand
 *
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software must display the following acknowledgement: This product includes software developed by the <copyright holder>.
 * 4. Neither the name of the <copyright holder> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
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
    invalidated: `${actionName}${INVALIDATED_SUFFIX}`,
  };
};
