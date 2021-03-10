import {toDictionaryBy} from './to-dictionary-by';

let STUB = 1;
/**
 * Entity interface
 * @memberof FunctionalUtilities
 * @interface Entity
 * @property {string} id Entity ID
 */
STUB = 1;
interface Entity {
  id: string;
}

/**
 * Check if condition is fulfilled, otherwise throws supplied message error
 * @function toDictionary
 * @memberof FunctionalUtilities.Ramda
 * @since v1.0.0
 * @param {T[]} items Items to be converted into dictionary
 * @returns {FunctionalUtilities.Entity}
 * @throws Will throw an error with the message supplied if condition is not fulfilled.
 * @see FunctionalUtilities.Ramda.toDictionaryBy
 * @example
 *
 * toDictionary([{id: 1, description: 'foo'}, {id: 2, description: 'bar'}]) //=> {1: {id: 1, description: 'foo'}, 2: {id: 2, description: 'bar'}}
 *
 */
export const toDictionary = toDictionaryBy('id');
