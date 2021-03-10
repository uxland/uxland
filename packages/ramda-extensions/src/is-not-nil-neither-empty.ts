import {allPass} from 'ramda';
import {isNotEmpty} from './is-not-empty';
import {isNotNil} from './is-not-nil';

/**
 * Checks whether input is not null nor empty
 * @function isNotNullNeitherEmpty
 * @memberof RamdaExtensions
 * @since v1.0.0
 * @param {*} input Input to check emptiness or nullity
 * @returns {boolean}
 * @example
 *
 * isNotNullNeitherEmpty(undefined) //=> false
 * isNotNullNeitherEmpty(1) //=> true
 * isNotNullNeitherEmpty("1") //=> true
 * isNotNullNeitherEmpty("") //=> false
 * isNotNullNeitherEmpty([]) //=> false
 * isNotNullNeitherEmpty(["foo"]) //=> true
 * isNotNullNeitherEmpty({}) //=> false
 * isNotNullNeitherEmpty({"foo":"bar"}) //=> true
 *
 */
export const isNotNullNeitherEmpty = allPass([isNotNil, isNotEmpty]);
