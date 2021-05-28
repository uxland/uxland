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
import {invariant} from '@uxland/utilities/invariant';
import {identity, is, isNil} from 'ramda';
import {Action as ReduxAction} from 'redux';

export type ActionFunctionAny<R> = (...args: any[]) => R;

export interface Action<Payload = any, Meta = any> extends ReduxAction {
  payload?: Payload;
  meta?: Meta;
  error?: boolean;
  timestamp?: Date;
  elapsed?: number;
}

let STUB = 1;
/**
 * Payload creator
 * @typedef {function} PayloadCreator
 * @memberof Redux
 * @since v1.0.0
 * @param {...*} args Action arguments
 * @returns {Payload}
 */
STUB = 1;
export type PayloadCreator<Payload = any> = (...args: any[]) => Payload;

/**
 * Meta creator
 * @typedef {function} MetaCreator
 * @memberof Redux
 * @since v1.0.0
 * @param {...*} args Action arguments
 * @returns {Meta}
 */
STUB = 1;
export type MetaCreator<Meta = any> = (...args: any[]) => Meta;

/**
 * Action creator
 * @typedef {function} ActionCreator
 * @memberof Redux
 * @since v1.0.0
 * @param {...*} args Action arguments
 * @returns {Action<Payload, Meta>}
 */
STUB = 1;
export type ActionCreator<Payload = any, Meta = any> = (...args: any[]) => Action<Payload, Meta>;

/**
 * Action creator
 * @function
 * @memberof Redux
 * @name createAction
 * @since v1.0.0
 * @param {string} type Action identificator
 * @param {Redux.PayloadCreator=} payloadCreator Function to transform payload
 * @param {Redux.MetaCreator=} metaCreator Function to transform meta
 * @returns {Redux.ActionCreator}
 * @throws Throws error if payloadCreator is not a function, undefined or null
 */
export const createAction: <Payload = any, Meta = any>(
  type: string,
  payloadCreator?: PayloadCreator<Payload>,
  metaCreator?: MetaCreator<Meta>
) => ActionCreator = (type, payloadCreator = identity, metaCreator) => {
  invariant(
    is(Function, payloadCreator) || isNil(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null'
  );
  const hasMeta = is(Function, metaCreator);

  const finalPayloadCreator: (...args: any[]) => any =
    isNil(payloadCreator) || payloadCreator === identity
      ? identity
      : (head, ...args): Error | Record<string, any> =>
          head instanceof Error ? head : payloadCreator(head, ...args);
  const actionCreator = (...args: any[]): Action => {
    const action = {type} as Action;
    const payload = args.length ? finalPayloadCreator(...args) : finalPayloadCreator(null);
    if (!isNil(payload)) action.payload = payload;
    if (hasMeta) action.meta = metaCreator(...args);
    if (action.payload instanceof Error) action.error = true;
    return action;
  };
  actionCreator.toString = (): string => type;
  return actionCreator;
};
