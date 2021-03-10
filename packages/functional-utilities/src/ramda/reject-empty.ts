import {isEmpty, reject} from 'ramda';

/**
 * Filters out input of empty values/items
 * @function rejectEmpty
 * @memberof FunctionalUtilities.Ramda
 * @since v1.0.0
 * @param {!Array} input Input to filter empty values/items
 * @returns {*|void}
 * @example
 *
 * rejectEmpty([]) //=> []
 * rejectEmpty(["foo","",{},{"foo":"bar"}, undefined]) //=> [foo,{"foo":"bar"}, undefined]
 * rejectEmpty({}) //=> {}
 * rejectEmpty({foo: 'bar', qux: '', quux: undefined}) //=> {foo: 'bar'}
 *
 */
export const rejectEmpty = reject(isEmpty);
