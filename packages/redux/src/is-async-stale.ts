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
import { isNotNil } from '@uxland/functional-utilities';
import { addDays, addHours, addMinutes, addSeconds, isBefore, isValid } from 'date-fns';
import { allPass, always, both, cond, either, equals, isNil, propEq, T } from 'ramda';
import { AsyncState, getDefaultState } from './create-async-reducer';

const defaultState = getDefaultState();
const durationAdders = {
  seconds: addSeconds,
  minutes: addMinutes,
  hours: addHours,
  days: addDays
};

export interface Duration {
  amount: number;
  unit: DurationUnitType;
}

export type DurationUnitType = 'seconds' | 'minutes' | 'hours' | 'days';
const nilOrDefault = either(isNil, equals(defaultState));
const isFetching = propEq('isFetching', true);
const invalidatedOrError = either(propEq('didInvalidate', true), propEq('error', true));
const validStaleInterval = staleInterval => () => !isNil(staleInterval);
const validTimestamp = (state: AsyncState) => both(isNotNil, isValid)(state.timestamp);

const validStaleInfo = (staleInterval: Duration) => allPass([validStaleInterval(staleInterval), validTimestamp]);
export const isAsyncStateStale = <TIn>(state: AsyncState<TIn>, staleInterval?: Duration): boolean =>
  cond([
    [nilOrDefault, always(true)],
    [isFetching, always(false)],
    [invalidatedOrError, always(true)],
    [
      validStaleInfo(staleInterval),
      () => isBefore(Date.now(), durationAdders[staleInterval.unit](state.timestamp, staleInterval.amount))
    ],
    [T, always(false)]
  ])(state);
