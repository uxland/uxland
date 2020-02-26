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
import { always, drop, ifElse, is } from 'ramda';
import { ActionCreator, createAction, MetaCreator } from './create-action';

const createMeta = (mc: MetaCreator) => (...args: any): any => mc(...drop(1, args));
type ActionThunkFactoryFn = (...args: any[]) => (dispatch: any, getState?: any, extra?: any) => Promise<any> | never;
interface ActionThunkFactory extends ActionThunkFactoryFn {
  NAME: string;
  START: string;
  SUCCEEDED: string;
  FAILED: string;
  ENDED: string;
}

export const createActionThunk = (
  type: string,
  fn: Function,
  metaCreator?: (...args: any[]) => any
): ActionThunkFactory => {
  const TYPE_START = `${type}_STARTED`;
  const TYPE_SUCCEEDED = `${type}_SUCCEEDED`;
  const TYPE_FAILED = `${type}_FAILED`;
  const TYPE_ENDED = `${type}_ENDED`;

  const finalMetaCreator: (mc: any) => MetaCreator = ifElse(is(Function), createMeta, always(undefined));
  const actionCreators = {
    [TYPE_START]: createAction(TYPE_START, () => undefined, metaCreator),
    [TYPE_SUCCEEDED]: createAction(TYPE_SUCCEEDED, undefined, finalMetaCreator(metaCreator)),
    [TYPE_FAILED]: createAction(TYPE_FAILED, undefined, finalMetaCreator(metaCreator)),
    [TYPE_ENDED]: createAction(TYPE_ENDED, undefined, finalMetaCreator(metaCreator))
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
            elapsed: endedAt - startedAt
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
            elapsed: endedAt - startedAt
          },
          ...args
        )
      );
      throw err;
    };
    try {
      result = fn(...args, { getState, dispatch, extra });
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
