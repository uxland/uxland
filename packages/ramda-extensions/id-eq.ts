import {propEq} from 'ramda';

/**
 * Checks if input value is equal to object's id
 * @function idEq
 * @memberof RamdaExtensions
 * @since v1.0.0
 * @param {*} value Value to be checked
 * @returns {void}
 * @example
 *
 * idEq('id')({id: 'id'}) //=> true
 * idEq('foo')({id: 'id'}) //=> false
 * idEq(undefined)({foo: 'bar'}) //=> true
 */

export const idEq = propEq('id');
