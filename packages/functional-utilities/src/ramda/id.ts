import {prop} from 'ramda';

/**
 * Returns property 'id' of object
 * @function id
 * @memberof FunctionalUtilities.Ramda
 * @since v1.0.0
 * @param {object} input Input object
 * @returns {*}
 * @example
 *
 * id({id: 1}) //=> 1
 * id({foo: 'bar'}) //=> undefined
 */
export const id = prop('id');
