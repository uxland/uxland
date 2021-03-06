import {isNotNil} from '@uxland/ramda-extensions';
import * as R from 'ramda';

let STUB = 1;
/**
 * Returns a string from provided prefix, suffix, separator and using constant input
 * @typedef {function} ConstantBuilder
 * @memberof Utilities
 * @since v1.0.0
 * @param {string} constant Constant to be prefixed and suffixed
 * @returns {string}
 */
STUB = 1;
export type ConstantBuilder = (constant: string) => string;

/**
 * Converts a string to a new one with provided prefix and suffix in builder
 * @function
 * @name constantBuilder
 * @memberof Utilities
 * @since v1.0.0
 * @param {string} prefix String prefix to appended at the beginning of the constant provided
 * @param {string=} suffix String suffix to be appended at the end of the constant provided
 * @param {string} separator String to separate prefix/suffix from the constant
 * @returns {Utilities.ConstantBuilder}
 * @throws Throws error if prefix is not provided
 * @example
 *
 * constantBuilder('PREFIX')('CONSTANT') //=> 'PREFIX:CONSTANT'
 * constantBuilder('PREFIX', 'SUFFIX')('CONSTANT') //=> 'PREFIX:CONSTANT:SUFFIX'
 * constantBuilder('PREFIX', 'SUFFIX', '$$')('CONSTANT') //=> 'PREFIX$$CONSTANT$$SUFFIX'
 *
 */
export const constantBuilder = (
  prefix: string,
  suffix?: string,
  separator = ':'
): ConstantBuilder => (constant: string): string =>
  R.cond([
    [
      (): boolean => R.isNil(prefix),
      (): never => {
        throw new Error('prefix is needed');
      },
    ],
    [
      (): boolean => isNotNil(suffix),
      (): string => `${prefix}${separator}${constant}${separator}${suffix}`,
    ],
    [R.T, (): string => `${prefix}${separator}${constant}`],
  ])();
