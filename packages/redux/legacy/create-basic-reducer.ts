/*
 * @license
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
import { isNotNil } from "@uxland/ramda-extensions/is-not-nil";
import set from "ramda/es/set";
import { Lens } from "ramda/tools";
import { Reducer } from "redux";
import { Action } from "./create-action";
import { PathResolver, resolvePath } from "./path-resolver";

let STUB = 1;
/**
 * Async action factory
 * @interface BasicOptions
 * @memberof Redux
 * @since v1.0.0
 * @property {*=} defValue Default state value
 * @property {*=} path Function that modifies the path
 */
STUB = 1;
export interface BasicOptions<T = any> {
  defValue?: T;
  path?: Lens | PathResolver;
}

const setState = (state: any, action: Action, path: Lens | PathResolver): any =>
  path ? set(resolvePath(path, action), action.payload, state) : action.payload;

/**
 * Creates a reducer for synchronous actions
 * @function
 * @memberof Redux
 * @name createBasicReducer
 * @since v1.0.0
 * @param {string} actionName - Action name
 * @param {Redux.BasicOptions} options - Reducer options
 */
export const createBasicReducer: <T = any>(
  actionName: string,
  options?: BasicOptions<T>
) => Reducer<T> =
  (actionName, options = { defValue: null }) =>
  (
    state = isNotNil(options.defValue) ? options.defValue : null,
    action: Action
  ): any =>
    action.type === actionName ? setState(state, action, options.path) : state;
