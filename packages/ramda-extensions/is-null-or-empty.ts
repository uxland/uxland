import {anyPass, isEmpty, isNil} from 'ramda';

/**
 * Checks whether input is null or empty
 * @function isNullOrEmpty
 * @memberof RamdaExtensions
 * @since v1.0.0
 * @param {*} input Input to check emptiness or nullity
 * @returns {boolean}
 * @example
 *
 * isNullOrEmpty(undefined) //=> true
 * isNullOrEmpty(1) //=> true
 * isNullOrEmpty("1") //=> true
 * isNullOrEmpty("") //=> true
 * isNullOrEmpty([]) //=> true
 * isNullOrEmpty(["foo"]) //=> true
 * isNullOrEmpty({}) //=> true
 * isNullOrEmpty({"foo":"bar"}) //=> true
 *
 */
export const isNullOrEmpty = anyPass([isNil, isEmpty]);
