/*
 * MIT License
 *
 * Copyright (c) 2020 UXLand
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
 * THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
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
 * @memberof RamdaExtensions
 * @since v1.0.0
 * @param {T[]} items Items to be converted into dictionary
 * @returns {FunctionalUtilities.Entity}
 * @throws Will throw an error with the message supplied if condition is not fulfilled.
 * @see RamdaExtensions.toDictionaryBy
 * @example
 *
 * toDictionary([{id: 1, description: 'foo'}, {id: 2, description: 'bar'}]) //=> {1: {id: 1, description: 'foo'}, 2: {id: 2, description: 'bar'}}
 *
 */
export const toDictionary = toDictionaryBy('id');
