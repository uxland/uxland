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
import { parse } from 'date-fns';
import * as R from 'ramda';

export const enum ValidationError {
  InvalidDateFormat = 'Date must be in format yyyyMMdd.',
  InvalidDateValue = 'Date must be a number',
  InvalidTimeFormat = 'Time must be in format hhmmss, hhmm or hh.',
  InvalidTimeValue = 'Time must be a number'
}

const thrower = (msg: string): never => {
  throw new Error(msg);
};

const isNumber = R.pipe(parseInt, R.complement(R.equals(NaN)));

const hasTSeparator = R.pipe(R.indexOf('T'), R.equals(-1), R.not);

const hasSpaceSeparator = R.pipe(R.indexOf(' '), R.equals(-1), R.not);
const splitTimestamp = (timestamp: string): string[] =>
  R.cond([
    [hasTSeparator, R.split('T')],
    [hasSpaceSeparator, R.split(' ')],
    [R.T, (timestamp: string): string[] => [timestamp, '120000']]
  ])(timestamp);
const parseDate = (date: string): string =>
  R.pipe(
    R.length,
    R.cond([
      [R.equals(8), R.always(date)],
      [R.T, (): never => thrower(ValidationError.InvalidDateFormat)]
    ])
  )(date);
const validateDate = R.cond([
  [isNumber, parseDate],
  [R.T, (): never => thrower(ValidationError.InvalidDateValue)]
]);

const parseTime = (time: string): string =>
  R.pipe(
    R.length,
    R.cond([
      [R.equals(6), R.always(time)],
      [R.equals(4), R.always(R.concat(time, '00'))],
      [R.equals(2), R.always(R.concat(time, '0000'))],
      [R.T, (): never => thrower(ValidationError.InvalidTimeFormat)]
    ])
  )(time);
const validateTime = R.cond([
  [isNumber, parseTime],
  [R.T, (): never => thrower(ValidationError.InvalidTimeValue)]
]);

const validateTimestamp = R.pipe(R.adjust(0, validateDate), R.adjust(1, validateTime));
export const parseTimestamp = R.pipe(splitTimestamp, validateTimestamp, R.join(' '));

export const SAPDateSerializer = (timestamp: string): Date =>
  timestamp && parse(parseTimestamp(timestamp), 'yyyyMMdd HHmmss', new Date());
