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
import {always, drop, ifElse, is} from 'ramda';
import {ActionCreator, createAction, MetaCreator} from './create-action';

const createMeta = (mc: MetaCreator) => (...args: any): any => mc(...drop(1, args));

let STUB = 1;
/**
 * @typedef {function} ActionThunkFactoryFnFn
 * @memberof Redux
 * @since v1.0.0
 * @param {*} dispatch Redux dispatcher
 * @param {*=} getState Redux state getter
 * @param {*=} extra
 */
/**
 * description
 * @typedef {function} ActionThunkFactoryFn
 * @memberof Redux
 * @since v1.0.0
 * @param {...*} args Arguments
 * @returns {ActionThunkFactoryFnFn}
 */
type ActionThunkFactoryFn = (
  ...args: any[]
) => (dispatch: any, getState?: any, extra?: any) => Promise<any> | never;

/**
 * Async action factory
 * @interface ActionThunkFactory
 * @augments Redux.ActionThunkFactoryFn
 * @memberof Redux
 * @since v1.0.0
 * @property {string} NAME Action name
 * @property {string} START Action started id
 * @property {string} SUCCEEDED Action succeeded id
 * @property {string} FAILED Action failed id
 * @property {string} ENDED Action ended id
 */
STUB = 1;
interface ActionThunkFactory extends ActionThunkFactoryFn {
  (...args: any[]): (dispatch: any, getState?: any, extra?: any) => Promise<any> | never;
  NAME: string;
  START: string;
  SUCCEEDED: string;
  FAILED: string;
  ENDED: string;
}

/**
 * Async action creator
 * @function
 * @name createActionThunk
 * @memberof Redux
 * @since v1.0.0
 * @param {string} type Action ID
 * @returns {Redux.ActionThunkFactory}
 * @throws Describe throw condition
 * @example
 *
 * createActionThunk('ACTION', () => true, (id, child) => ({id, child}))
 *
 */
export const createActionThunk = (
  type: string,
  fn: (...args: any[]) => any,
  metaCreator?: (...args: any[]) => any
): ActionThunkFactory => {
  const TYPE_START = `${type}_STARTED`;
  const TYPE_SUCCEEDED = `${type}_SUCCEEDED`;
  const TYPE_FAILED = `${type}_FAILED`;
  const TYPE_ENDED = `${type}_ENDED`;

  const finalMetaCreator: (mc: any) => MetaCreator = ifElse(
    is(Function),
    createMeta,
    always(undefined)
  );
  const actionCreators = {
    [TYPE_START]: createAction(TYPE_START, () => undefined, metaCreator),
    [TYPE_SUCCEEDED]: createAction(TYPE_SUCCEEDED, undefined, finalMetaCreator(metaCreator)),
    [TYPE_FAILED]: createAction(TYPE_FAILED, undefined, finalMetaCreator(metaCreator)),
    [TYPE_ENDED]: createAction(TYPE_ENDED, undefined, finalMetaCreator(metaCreator)),
  };

  const factory: ActionThunkFactory = (...args: any[]) => (
    dispatch: ActionCreator,
    getState?: any,
    extra?: any
  ): Promise<any> | never => {
    let result: Promise<any>;
    const startedAt = new Date().getTime();
    dispatch(actionCreators[TYPE_START](...args));
    const succeeded = (data: any): any => {
      dispatch(actionCreators[TYPE_SUCCEEDED](data, ...args));
      const endedAt = new Date().getTime();
      dispatch(
        actionCreators[TYPE_ENDED](
          {
            elapsed: endedAt - startedAt,
          },
          ...args
        )
      );
      return data;
    };
    const failed = (err: Error): never => {
      const endedAt = new Date().getTime();
      dispatch(actionCreators[TYPE_FAILED](err, ...args));
      dispatch(
        actionCreators[TYPE_ENDED](
          {
            elapsed: endedAt - startedAt,
          },
          ...args
        )
      );
      throw err;
    };
    try {
      result = fn(...args, {getState, dispatch, extra});
    } catch (error) {
      failed(error);
    }
    // in case of async (promise), use success and fail callbacks.
    if (result && result.then) {
      return result.then(succeeded, failed);
    }
    return succeeded(result);
  };

  factory.NAME = type;
  factory.START = actionCreators[TYPE_START].toString();
  factory.SUCCEEDED = actionCreators[TYPE_SUCCEEDED].toString();
  factory.FAILED = actionCreators[TYPE_FAILED].toString();
  factory.ENDED = actionCreators[TYPE_ENDED].toString();

  return factory;
};
