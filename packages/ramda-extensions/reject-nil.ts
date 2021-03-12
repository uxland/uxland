import {isNil, reject} from 'ramda';

/**
 * Filters out input null or undefined values/items
 * @function rejectNil
 * @memberof RamdaExtensions
 * @since v1.0.0
 * @param {!Array} input Input to filter empty or null values/items
 * @returns {*|void}
 * @example
 *
 * rejectEmpty([]) //=> []
 * rejectEmpty(["foo","",{},{"foo":"bar"}, undefined]) //=> [foo,'',{"foo":"bar"}]
 * rejectEmpty({}) //=> {}
 * rejectEmpty({foo: 'bar', qux: '', quux: undefined}) //=> {foo: 'bar', qux: ''}
 *
 */
export const rejectNil = reject(isNil);
