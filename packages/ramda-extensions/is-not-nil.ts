import {complement, isNil} from 'ramda';

/**
 * Checks whether input is undefined or null
 * @function isNotNil
 * @memberof RamdaExtensions
 * @since v1.0.0
 * @param {*} input Input to check nullity
 * @returns {boolean}
 * @example
 *
 * isNotNil(undefined) //=> false
 * isNotNil(1) //=> true
 * isNotNil("1") //=> true
 * isNotNil("") //=> true
 * isNotNil([]) //=> true
 * isNotNil(["foo"]) //=> true
 * isNotNil({}) //=> true
 * isNotNil({"foo":"bar"}) //=> true
 *
 */
export const isNotNil = complement(isNil);
