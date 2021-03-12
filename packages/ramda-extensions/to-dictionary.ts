import {toDictionaryBy} from './to-dictionary-by';

let STUB = 1;
/**
 * Entity interface
 * @memberof RamdaExtensions
 * @interface Entity
 * @property {string} id Entity ID
 */
STUB = 1;
interface Entity {
  id: string;
}

/**
 * Converts an array to dictionary using id as key
 * @function toDictionary
 * @memberof RamdaExtensions
 * @since v1.0.0
 * @param {T[]} items Items to be converted into dictionary
 * @returns {RamdaExtensions.Entity}
 * @throws Will throw an error with the message supplied if condition is not fulfilled.
 * @see RamdaExtensions.toDictionaryBy
 * @example
 *
 * toDictionary([{id: 1, description: 'foo'}, {id: 2, description: 'bar'}]) //=> {1: {id: 1, description: 'foo'}, 2: {id: 2, description: 'bar'}}
 *
 */
export const toDictionary = toDictionaryBy('id');
