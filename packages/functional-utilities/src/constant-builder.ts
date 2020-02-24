import * as R from 'ramda';
import { isNotNil } from './ramda';

/**
 * Constant Builder
 * @function
 * @memberof FunctionalUtilities
 * @since v1.0.0
 * @param {string} prefix String prefix to appended at the beginning of the constant provided
 * @param {string=} suffix String suffix to be appended at the end of the constant provided
 * @param {string} separator String to separate prefix/suffix from the constant
 * @param {string} name Constant to be prefixed/suffixed
 * @returns {string}
 * @throws Throws error if prefix is not provided
 * @example
 *
 * constantBuilder('PREFIX')('CONSTANT') //=> 'PREFIX:CONSTANT'
 * constantBuilder('PREFIX', 'SUFFIX')('CONSTANT') //=> 'PREFIX:CONSTANT:SUFFIX'
 * constantBuilder('PREFIX', 'SUFFIX', '$$')('CONSTANT') //=> 'PREFIX$$CONSTANT$$SUFFIX'
 *
 */
export const constantBuilder = (prefix: string, suffix?: string, separator = ':') => (name: string) =>
  R.cond([
    [
      (): boolean => R.isNil(prefix),
      (): never => {
        throw new Error('prefix is needed');
      }
    ],
    [(): boolean => isNotNil(suffix), (): string => `${prefix}${separator}${name}${separator}${suffix}`],
    [R.T, (): string => `${prefix}${separator}${name}`]
  ])();
