/*
 * @license
 * BSD License
 *
 * Copyright (c) 2020, UXLand
 *
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaime
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software must display the following acknowledgement: This product includes software developed by the <copyright holder>.
 * 4. Neither the name of the <copyright holder> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import {parse} from 'date-fns';
import adjust from 'ramda/es/adjust';
import always from 'ramda/es/always';
import complement from 'ramda/es/complement';
import concat from 'ramda/es/concat';
import cond from 'ramda/es/cond';
import equals from 'ramda/es/equals';
import indexOf from 'ramda/es/indexOf';
import join from 'ramda/es/join';
import length from 'ramda/es/length';
import not from 'ramda/es/not';
import pipe from 'ramda/es/pipe';
import split from 'ramda/es/split';
import T from 'ramda/es/T';

export const enum ValidationError {
  InvalidDateFormat = 'Date must be in format yyyyMMdd.',
  InvalidDateValue = 'Date must be a number',
  InvalidTimeFormat = 'Time must be in format hhmmss, hhmm or hh.',
  InvalidTimeValue = 'Time must be a number',
}

const thrower = (msg: string): never => {
  throw new Error(msg);
};

const isNumber = pipe(parseInt, complement(equals(NaN)));

const hasTSeparator = pipe(indexOf('T'), equals(-1), not);

const hasSpaceSeparator = pipe(indexOf(' '), equals(-1), not);
const splitTimestamp = (timestamp: string): string[] =>
  cond([
    [hasTSeparator, split('T')],
    [hasSpaceSeparator, split(' ')],
    [T, (timestamp: string): string[] => [timestamp, '120000']],
  ])(timestamp);
const parseDate = (date: string): string =>
  pipe(
    length,
    cond([
      [equals(8), always(date)],
      [T, (): never => thrower(ValidationError.InvalidDateFormat)],
    ])
  )(date);
const validateDate = cond([
  [isNumber, parseDate],
  [T, (): never => thrower(ValidationError.InvalidDateValue)],
]);

const parseTime = (time: string): string =>
  pipe(
    length,
    cond([
      [equals(6), always(time)],
      [equals(4), always(concat(time, '00'))],
      [equals(2), always(concat(time, '0000'))],
      [T, (): never => thrower(ValidationError.InvalidTimeFormat)],
    ])
  )(time);
const validateTime = cond([
  [isNumber, parseTime],
  [T, (): never => thrower(ValidationError.InvalidTimeValue)],
]);

const validateTimestamp = pipe(adjust(0, validateDate), adjust(1, validateTime));
export const parseTimestamp = pipe(splitTimestamp, validateTimestamp, join(' '));

export const SAPDateSerializer = (timestamp: string): Date =>
  timestamp && parse(parseTimestamp(timestamp), 'yyyyMMdd HHmmss', new Date());
