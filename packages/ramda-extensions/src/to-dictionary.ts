/*
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
