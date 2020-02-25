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
import { allPass } from 'ramda';
import { isNotEmpty } from './is-not-empty';
import { isNotNil } from './is-not-nil';

/**
 * Checks whether input is not null nor empty
 * @function isNotNullNeitherEmpty
 * @memberof FunctionalUtilities.Ramda
 * @since v1.0.0
 * @param {*} input Input to check emptiness or nullity
 * @returns {boolean}
 * @example
 *
 * isNotNullNeitherEmpty(undefined) //=> false
 * isNotNullNeitherEmpty(1) //=> true
 * isNotNullNeitherEmpty("1") //=> true
 * isNotNullNeitherEmpty("") //=> false
 * isNotNullNeitherEmpty([]) //=> false
 * isNotNullNeitherEmpty(["foo"]) //=> true
 * isNotNullNeitherEmpty({}) //=> false
 * isNotNullNeitherEmpty({"foo":"bar"}) //=> true
 *
 */
export const isNotNullNeitherEmpty = allPass([isNotNil, isNotEmpty]);