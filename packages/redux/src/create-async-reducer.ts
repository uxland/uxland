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
import {nop} from '@uxland/utilities';
import {
  always,
  cond,
  equals,
  ifElse,
  is,
  isNil,
  Lens,
  lensProp,
  pipe,
  propEq,
  set,
  T as Tr,
  view,
  when,
} from 'ramda';
import {Action} from './create-action';
import {BasicOptions} from './create-basic-reducer';
import {PathResolver, resolvePath} from './path-resolver';

export interface Options<T = any> extends BasicOptions<T> {
  timestampAccessor?: (action: Action) => Date;
  payloadAccessor?: (action: Action) => T;
  pathResolver?: Lens | PathResolver;
  keepPreviousStateOnStarted?: boolean;
}

export interface AsyncState<TState = any> {
  isFetching: boolean;
  error?: boolean;
  errorDescription?: string;
  exceptions?: any;
  state?: TState;
  didInvalidate?: boolean;
  timestamp?: Date;
  elapsed?: number;
}

const defaultState: AsyncState = {
  error: false,
  didInvalidate: false,
  isFetching: false,
};

const fetchingState = {...defaultState, isFetching: true};
export const getDefaultState = (): AsyncState => ({...defaultState});
const actionCreator = (base: string) => (action: string): string => `${base}_${action}`;
const actionsCreator = (base: string): any => {
  const creator = actionCreator(base);
  return {
    startedAction: creator('STARTED'),
    succeededAction: creator('SUCCEEDED'),
    failedAction: creator('FAILED'),
    endedAction: creator('ENDED'),
    invalidatedAction: creator('INVALIDATED'),
  };
};

const extractExceptions = (action: Action): any =>
  action.payload
    ? is(Array, action.payload)
      ? action.payload
      : {exceptions: [action.payload]}
    : {};
const extractErrorDescription = (action: Action): ((payload: any) => void | string) =>
  ifElse(
    isNil,
    nop,
    payload =>
      ({
        errorDescription: isNil(payload.message) ? String(payload) : payload.message,
      } as AsyncState)
  )(action.payload);

type StateFactory = (state: any, action: Action) => any;
const typeEqual = propEq('type');
type CurrentStateGetter = (options: Options) => (state: any, action: Action) => any;
const getState: CurrentStateGetter = options => (state, action): any =>
  options.pathResolver ? view(resolvePath(options.pathResolver, action), state) : state;
const keepPreviousStateGetter: (defState: any) => CurrentStateGetter = (
  defState = defaultState
) => (options: any): ((state, action) => any) => {
  const getter = getState(options);
  return (state, action): any =>
    options.keepPreviousStateOnStarted ? getter(state, action) : defState;
};
export const createAsyncReducer = <T>(actionName: string, options: Options<T> = {}): any => {
  const initialValue: any = isNil(options.defValue)
    ? {...defaultState}
    : {...defaultState, state: options.defValue};
  const defValue: any = options.pathResolver ? {} : initialValue;
  const {
    startedAction,
    succeededAction,
    failedAction,
    endedAction,
    invalidatedAction,
  } = actionsCreator(actionName);
  const isStarted = typeEqual(startedAction),
    isFailed = typeEqual(failedAction),
    isSucceeded = typeEqual(succeededAction),
    isEnded = typeEqual(endedAction),
    isInvalidated = typeEqual(invalidatedAction);
  const stateGetter = getState(options);
  const fetchingStateGetter = keepPreviousStateGetter(
    options.defValue
      ? {
          ...initialValue,
          isFetching: true,
        }
      : fetchingState
  )(options);
  const failedStateGetter = keepPreviousStateGetter(defaultState)(options);
  const getPayload = (action: Action): any =>
    options.payloadAccessor ? options.payloadAccessor(action) : action.payload;
  const setTimestamp = (action: Action) => (state: AsyncState<T>): any => {
    const timestamp = options.timestampAccessor
      ? options.timestampAccessor(action)
      : action.timestamp;
    return timestamp ? set(lensProp('timestamp'), timestamp, state) : state;
  };
  const startedStateFactory: StateFactory = pipe(
    fetchingStateGetter,
    when(
      () => options.keepPreviousStateOnStarted,
      s => ({
        ...fetchingState,
        state: s.state,
      })
    )
  );
  const succeedFactory: StateFactory = (state, action) =>
    set(lensProp('state'), getPayload(action), defaultState);
  const failedFactory: StateFactory = (state, action) =>
    pipe(failedStateGetter, s => ({
      ...s,
      ...defaultState,
      ...extractExceptions(action),
      ...extractErrorDescription(action),
      error: true,
    }))(state, action);
  const endedFactory: StateFactory = (state, action) =>
    action.elapsed || action.payload
      ? {
          ...stateGetter(state, action),
          elapsed: action.elapsed || action.payload,
        }
      : stateGetter(state, action);
  const invalidatedFactory: StateFactory = (state, action) =>
    set(lensProp('didInvalidate'), true, stateGetter(state, action));

  const updateState = (state, action, newState) => (): any =>
    options.pathResolver
      ? set(resolvePath(options.pathResolver, action), newState, state)
      : newState;
  const setState = (state, action) => (newState: any): any =>
    pipe(
      stateGetter,
      ifElse(equals(newState), always(state), updateState(state, action, newState))
    )(state, action);
  const stateFactory = (factory: StateFactory) => state => (action: any): any =>
    pipe(factory, setTimestamp(action), setState(state, action))(state, action);
  return (state = defValue, action: Action): any =>
    cond([
      [isStarted, stateFactory(startedStateFactory)(state)],
      [isSucceeded, stateFactory(succeedFactory)(state)],
      [isFailed, stateFactory(failedFactory)(state)],
      [isEnded, stateFactory(endedFactory)(state)],
      [isInvalidated, stateFactory(invalidatedFactory)(state)],
      [Tr, (): any => state],
    ])(action);
};
