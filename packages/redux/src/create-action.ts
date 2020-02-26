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
import { invariant } from '@uxland/functional-utilities';
import { identity, is, isNil } from 'ramda';
import { Action as ReduxAction } from 'redux';

export type ActionFunctionAny<R> = (...args: any[]) => R;

export interface Action<Payload = any, Meta = any> extends ReduxAction {
  payload?: Payload;
  meta?: Meta;
  error?: boolean;
  timestamp?: Date;
  elapsed?: number;
}

export type PayloadCreator<Payload = any> = (...args: any[]) => Payload;
export type MetaCreator<Meta = any> = (...args: any) => Meta;
export type ActionCreator<Payload = any, Meta = any> = (...args: any[]) => Action<Payload, Meta>;
export type ActionCreatorFactory = <Payload = any, Meta = any>(
  type: string,
  payloadCreator?: PayloadCreator<Payload>,
  metaCreator?: MetaCreator<Meta>
) => ActionCreator<Payload, Meta>;

export const createAction: <Payload = any, Meta = any>(
  type: string,
  payloadCreator?: PayloadCreator<Payload>,
  metaCreator?: (...args: any[]) => Meta
) => ActionCreator = (type, payloadCreator = identity, metaCreator) => {
  invariant(
    is(Function, payloadCreator) || isNil(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null'
  );
  const hasMeta = is(Function, metaCreator);

  const finalPayloadCreator: (...args: any[]) => any =
    isNil(payloadCreator) || payloadCreator === identity
      ? identity
      : (head, ...args): Error | Record<string, any> => (head instanceof Error ? head : payloadCreator(head, ...args));
  const actionCreator = (...args: any[]): Action => {
    const action = { type } as Action;
    const payload = args.length ? finalPayloadCreator(...args) : finalPayloadCreator(null);
    if (!isNil(payload)) action.payload = payload;
    if (hasMeta) action.meta = metaCreator(...args);
    if (action.payload instanceof Error) action.error = true;
    return action;
  };
  actionCreator.toString = (): string => type;
  return actionCreator;
};
