import {reduce} from 'ramda';

/**
 * Converts an array to dictionary using provided key as reference
 * @function toDictionaryBy
 * @memberof RamdaExtensions
 * @since v1.0.0
 * @param {string} key Message error to be thrown in case condition is not fulfilled
 * @returns {object}
 * @throws Will throw an error with the message supplied if condition is not fulfilled.
 * @example
 *
 * toDictionaryBy('id')([{id: 1, description: 'foo'}, {id: 2, description: 'bar'}]) //=> {1: {id: 1, description: 'foo'}, 2: {id: 2, description: 'bar'}}
 *
 */
export const toDictionaryBy = (key: string) => (input: any[]): any =>
  reduce((acc, elem) => ({...acc, [elem[key]]: elem}), {})(input);
