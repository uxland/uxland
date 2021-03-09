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
import {isNotNil} from '@uxland/ramda-extensions';
import {addDays, addHours, addMinutes, addSeconds, isBefore, isValid} from 'date-fns';
import {allPass, always, both, cond, either, equals, isNil, Pred, propEq, T} from 'ramda';
import {AsyncState, getDefaultState} from './create-async-reducer';

const defaultState = getDefaultState();
const durationAdders = {
  seconds: addSeconds,
  minutes: addMinutes,
  hours: addHours,
  days: addDays,
};

export interface Duration {
  amount: number;
  unit: DurationUnitType;
}

export type DurationUnitType = 'seconds' | 'minutes' | 'hours' | 'days';
const nilOrDefault = either(isNil, equals(defaultState));
const isFetching = propEq('isFetching', true);
const invalidatedOrError = either(propEq('didInvalidate', true), propEq('error', true));
const validStaleInterval = staleInterval => (): boolean => !isNil(staleInterval);
const validTimestamp = (state: AsyncState): boolean => both(isNotNil, isValid)(state.timestamp);

const validStaleInfo = (staleInterval: Duration): Pred =>
  allPass([validStaleInterval(staleInterval), validTimestamp]);

/**
 * Returns if asynchronous state is stale
 * @function
 * @memberof Redux
 * @name isAsyncStateStale
 * @since v1.0.0
 * @param {Redux.AsyncState} state - Asynchronous state
 * @param {Duration} staleInterval - Time to stale
 * @returns {boolean}
 */
export const isAsyncStateStale = <TIn>(state: AsyncState<TIn>, staleInterval?: Duration): boolean =>
  cond([
    [nilOrDefault, always(true)],
    [isFetching, always(false)],
    [invalidatedOrError, always(true)],
    [
      validStaleInfo(staleInterval),
      (): boolean =>
        isBefore(
          Date.now(),
          durationAdders[staleInterval.unit](state.timestamp, staleInterval.amount)
        ),
    ],
    [T, always(false)],
  ])(state);
