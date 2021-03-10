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
