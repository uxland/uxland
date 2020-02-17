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
import { reject } from 'ramda';
import isNullOrEmpty from './is-null-or-empty';

/**
 * Filters out input of empty or null values/items
 * @function
 * @memberof FunctionalUtilities.Ramda
 * @since v1.0.0
 * @param {!Array} input Input to filter empty or null values/items
 * @returns {*|void}
 * @example
 *
 * rejectNilOrEmpty(1) //=>
 * rejectNilOrEmpty("1") //=>
 * rejectNilOrEmpty("") //=>
 * rejectNilOrEmpty([]) //=>
 * rejectNilOrEmpty(["foo"]) //=>
 * rejectNilOrEmpty(["foo","",{},{"foo":"bar"}]) //=>
 * rejectNilOrEmpty({}) //=> [object Object]
 * rejectNilOrEmpty({"foo":"bar"}) //=> [object Object]
 *
 */
const rejectNilOrEmpty = reject(isNullOrEmpty);
export default rejectNilOrEmpty;
