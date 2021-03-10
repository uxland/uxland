import {complement, isEmpty} from 'ramda';

/**
 * Checks whether input is empty
 * @function isNotEmpty
 * @memberof FunctionalUtilities.Ramda
 * @since v1.0.0
 * @param {*} input Input to check emptiness
 * @returns {boolean}
 * @example
 *
 * isNotEmpty(undefined) //=> true
 * isNotEmpty(1) //=> true
 * isNotEmpty("1") //=> true
 * isNotEmpty("") //=> false
 * isNotEmpty([]) //=> false
 * isNotEmpty(["foo"]) //=> true
 * isNotEmpty({}) //=> false
 * isNotEmpty({"foo":"bar"}) //=> true
 *
 */
export const isNotEmpty = complement(isEmpty);
