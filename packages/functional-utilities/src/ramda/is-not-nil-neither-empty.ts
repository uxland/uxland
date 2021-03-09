/*
 * @license
 * BSD License
 *
 * Copyright (c) 2020, UXLand
 *
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software must display the following acknowledgement: This product includes software developed by the <copyright holder>.
 * 4. Neither the name of the <copyright holder> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import {allPass} from 'ramda';
import {isNotEmpty} from './is-not-empty';
import {isNotNil} from './is-not-nil';

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
