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

let STUB = 1;
/**
 * Condition Factory type definition
 * @typedef {function} ConditionFactory
 * @memberof FunctionalUtilities
 * @since v1.0.0
 * @returns {*}
 */
STUB = 1;
export type ConditionFactory = () => any;

/**
 * Check if condition is fulfilled, otherwise throws supplied message error
 * @function invariant
 * @memberof FunctionalUtilities
 * @since v1.0.0
 * @param {ConditionFactory} condition Condition that must be complied
 * @param {string=} message Message error to be thrown in case condition is not fulfilled
 * @returns {void|never}
 * @throws Will throw an error with the message supplied if condition is not fulfilled.
 * @example
 *
 * invariant(R.is('number')(3), 'Supplied value is not a number'); //=> undefined
 * invariant(R.is('number')('3'), 'Supplied value is not a number'); //=> 'Supplied value is not a number'
 *
 */
export const invariant = (condition: any | ConditionFactory, message?: string): void | never => {
  condition = typeof condition === 'function' ? condition() : condition;
  if (!condition) throw new Error(message);
};
