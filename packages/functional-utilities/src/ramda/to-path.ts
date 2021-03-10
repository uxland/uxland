import {is, split, when} from 'ramda';

const pathSplit = split('.');

/**
 * Splits path by '.' into a string array
 * @function toPath
 * @memberof FunctionalUtilities.Ramda
 * @since v1.0.0
 * @param {(string|Path)} path
 * @returns {string[]}
 * @example
 *
 * toPath('foo.bar') => ['foo', 'bar']
 * toPath('3') => ['3']
 */
export const toPath = when(is(String), pathSplit);
