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
import { nop } from '@uxland/functional-utilities';
import { always, cond, equals, ifElse, is, isNil, Lens, lensProp, pipe, propEq, set, T as Tr, view, when } from 'ramda';
import { Action } from './create-action';
import { BasicOptions } from './create-basic-reducer';
import { PathResolver, resolvePath } from './path-resolver';

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
  isFetching: false
};

const fetchingState = { ...defaultState, isFetching: true };
export const getDefaultState = (): AsyncState => ({ ...defaultState });
const actionCreator = (base: string) => (action: string): string => `${base}_${action}`;
const actionsCreator = (base: string): any => {
  const creator = actionCreator(base);
  return {
    startedAction: creator('STARTED'),
    succeededAction: creator('SUCCEEDED'),
    failedAction: creator('FAILED'),
    endedAction: creator('ENDED'),
    invalidatedAction: creator('INVALIDATED')
  };
};

const extractExceptions = (action: Action): any =>
  action.payload ? (is(Array, action.payload) ? action.payload : { exceptions: [action.payload] }) : {};
const extractErrorDescription = (action: Action): ((payload: any) => void | string) =>
  ifElse(
    isNil,
    nop,
    payload => ({ errorDescription: isNil(payload.message) ? String(payload) : payload.message } as AsyncState)
  )(action.payload);

type StateFactory = (state: any, action: Action) => any;
const typeEqual = propEq('type');
type CurrentStateGetter = (options: Options) => (state: any, action: Action) => any;
const getState: CurrentStateGetter = options => (state, action): any =>
  options.pathResolver ? view(resolvePath(options.pathResolver, action), state) : state;
const keepPreviousStateGetter: (defState: any) => CurrentStateGetter = (defState = defaultState) => options => {
  const getter = getState(options);
  return (state, action): any => (options.keepPreviousStateOnStarted ? getter(state, action) : defState);
};
export const createAsyncReducer = <T>(actionName: string, options: Options<T> = {}) => {
  const initialValue: any = isNil(options.defValue)
    ? { ...defaultState }
    : { ...defaultState, state: options.defValue };
  const defValue: any = options.pathResolver ? {} : initialValue;
  const { startedAction, succeededAction, failedAction, endedAction, invalidatedAction } = actionsCreator(actionName);
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
          isFetching: true
        }
      : fetchingState
  )(options);
  const failedStateGetter = keepPreviousStateGetter(defaultState)(options);
  const getPayload = (action: Action) => (options.payloadAccessor ? options.payloadAccessor(action) : action.payload);
  const setTimestamp = (action: Action) => (state: AsyncState<T>) => {
    const timestamp = options.timestampAccessor ? options.timestampAccessor(action) : action.timestamp;
    return timestamp ? set(lensProp('timestamp'), timestamp, state) : state;
  };
  const startedStateFactory: StateFactory = pipe(
    fetchingStateGetter,
    when(
      () => options.keepPreviousStateOnStarted,
      s => ({
        ...fetchingState,
        state: s.state
      })
    )
  );
  const succeedFactory: StateFactory = (state, action) => set(lensProp('state'), getPayload(action), defaultState);
  const failedFactory: StateFactory = (state, action) =>
    pipe(failedStateGetter, s => ({
      ...s,
      ...defaultState,
      ...extractExceptions(action),
      ...extractErrorDescription(action),
      error: true
    }))(state, action);
  const endedFactory: StateFactory = (state, action) =>
    action.elapsed || action.payload
      ? {
          ...stateGetter(state, action),
          elapsed: action.elapsed || action.payload
        }
      : stateGetter(state, action);
  const invalidatedFactory: StateFactory = (state, action) =>
    set(lensProp('didInvalidate'), true, stateGetter(state, action));

  const updateState = (state, action, newState) => () =>
    options.pathResolver ? set(resolvePath(options.pathResolver, action), newState, state) : newState;
  const setState = (state, action) => newState =>
    pipe(stateGetter, ifElse(equals(newState), always(state), updateState(state, action, newState)))(state, action);
  const stateFactory = (factory: StateFactory) => state => action =>
    pipe(factory, setTimestamp(action), setState(state, action))(state, action);
  return (state = defValue, action: Action) =>
    cond([
      [isStarted, stateFactory(startedStateFactory)(state)],
      [isSucceeded, stateFactory(succeedFactory)(state)],
      [isFailed, stateFactory(failedFactory)(state)],
      [isEnded, stateFactory(endedFactory)(state)],
      [isInvalidated, stateFactory(invalidatedFactory)(state)],
      [Tr, () => state]
    ])(action);
};
