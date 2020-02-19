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
import { isNil, reject } from 'ramda';

/**
 * Filters out input null or undefined values/items
 * @function rejectNil
 * @memberof FunctionalUtilities.Ramda
 * @since v1.0.0
 * @param {!Array} input Input to filter empty or null values/items
 * @returns {*|void}
 * @example
 *
 * rejectNil(1) //=>
 * rejectNil("1") //=> 1
 * rejectNil("") //=>
 * rejectNil([]) //=>
 * rejectNil(["foo"]) //=> foo
 * rejectNil(["foo","",{},{"foo":"bar"}]) //=> foo,,[object Object],[object Object]
 * rejectNil({}) //=> [object Object]
 * rejectNil({"foo":"bar"}) //=> [object Object]
 *
 */
export const rejectNil = reject(isNil);
