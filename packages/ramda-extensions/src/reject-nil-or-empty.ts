import {reject} from 'ramda';
import {isNullOrEmpty} from './is-null-or-empty';

/**
 * Filters out input of empty or null values/items
 * @function rejectNilOrEmpty
 * @memberof RamdaExtensions
 * @since v1.0.0
 * @param {!Array} input Input to filter empty or null values/items
 * @returns {*|void}
 * @example
 *
 * rejectEmpty([]) //=> []
 * rejectEmpty(["foo","",{},{"foo":"bar"}, undefined]) //=> foo,{"foo":"bar"}
 * rejectEmpty({}) //=> {}
 * rejectEmpty({foo: 'bar', qux: '', quux: undefined}) //=> {foo: 'bar'}
 *
 */
export const rejectNilOrEmpty = reject(isNullOrEmpty);
