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
import { reduce } from 'ramda';

/**
 * Converts an array to dictionary using provided key as reference
 * @function toDictionaryBy
 * @memberof FunctionalUtilities.Ramda
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
  reduce((acc, elem) => ({ ...acc, [elem[key]]: elem }), {})(input);
