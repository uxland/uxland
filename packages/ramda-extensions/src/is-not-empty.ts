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
import {complement, isEmpty} from 'ramda';

/**
 * Checks whether input is empty
 * @function isNotEmpty
 * @memberof RamdaExtensions
 * @since v1.0.0
 * @param {*} input Input to check emptiness
 * @returns {boolean}
 * @example
 *
 * isNotEmpty(undefined) //=> true
 * isNotEmpty(1) //=> true
 * isNotEmpty("1") //=> true
 * isNotEmpty("") //=> false
 * isNotEmpty([]) //=> false
 * isNotEmpty(["foo"]) //=> true
 * isNotEmpty({}) //=> false
 * isNotEmpty({"foo":"bar"}) //=> true
 *
 */
export const isNotEmpty = complement(isEmpty);