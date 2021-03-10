import {bind} from 'ramda';

/**
 * Resolves Promise.all
 * @function promiseAll
 * @memberof FunctionalUtilities.Ramda
 * @since v1.0.0
 * @param {Array.Promise} promises Array of promises to be resolved
 * @returns {Array}
 * @example
 *
 * TBD
 *
 */
export const promiseAll = bind(Promise.all, Promise);

/**
 * Resolves a promse
 * @function resolve
 * @memberof FunctionalUtilities.Ramda
 * @since v1.0.0
 * @param {Promise} promise Promise to be resolved
 * @returns {*}
 * @example
 *
 * TBD
 *
 */
export const resolve = bind(Promise.resolve, Promise);
