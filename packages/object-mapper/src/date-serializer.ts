/*
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
import {parse} from 'date-fns';
import * as R from 'ramda';

export const enum ValidationError {
  InvalidDateFormat = 'Date must be in format yyyyMMdd.',
  InvalidDateValue = 'Date must be a number',
  InvalidTimeFormat = 'Time must be in format hhmmss, hhmm or hh.',
  InvalidTimeValue = 'Time must be a number',
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
    [R.T, (timestamp: string): string[] => [timestamp, '120000']],
  ])(timestamp);
const parseDate = (date: string): string =>
  R.pipe(
    R.length,
    R.cond([
      [R.equals(8), R.always(date)],
      [R.T, (): never => thrower(ValidationError.InvalidDateFormat)],
    ])
  )(date);
const validateDate = R.cond([
  [isNumber, parseDate],
  [R.T, (): never => thrower(ValidationError.InvalidDateValue)],
]);

const parseTime = (time: string): string =>
  R.pipe(
    R.length,
    R.cond([
      [R.equals(6), R.always(time)],
      [R.equals(4), R.always(R.concat(time, '00'))],
      [R.equals(2), R.always(R.concat(time, '0000'))],
      [R.T, (): never => thrower(ValidationError.InvalidTimeFormat)],
    ])
  )(time);
const validateTime = R.cond([
  [isNumber, parseTime],
  [R.T, (): never => thrower(ValidationError.InvalidTimeValue)],
]);

const validateTimestamp = R.pipe(R.adjust(0, validateDate), R.adjust(1, validateTime));
export const parseTimestamp = R.pipe(splitTimestamp, validateTimestamp, R.join(' '));

export const SAPDateSerializer = (timestamp: string): Date =>
  timestamp && parse(parseTimestamp(timestamp), 'yyyyMMdd HHmmss', new Date());
