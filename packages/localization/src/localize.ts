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
import {Localizer} from './localizer-factory';

let internalLocalizer: Localizer;
/**
 * Default localizer initializer
 * @function
 * @name initializeLocalizer
 * @memberof Localization
 * @since v1.0.0
 * @param {Localization.Localizer} localizer LocalizerFactory
 * @returns {Localization.Localizer}
 * @example
 *
 * const localizer = localizerFactory('en', {en: {foo: 'bar'}}, {number: {EUR: {style: 'currency', currency: 'EUR'}}}, true);
 * const defaultLocalizer = initializeLocalizer(localizer);
 *
 */
export const initializeLocalizer = (localizer: Localizer): Localizer =>
  (internalLocalizer = localizer);

/**
 * Dispose default localizer
 * @function
 * @name disposeLocalizer
 * @memberof Localization
 * @since v1.0.0
 * @returns {void}
 * @example
 *
 * disposeLocalizer();
 *
 */
export const disposeLocalizer = (): undefined => (internalLocalizer = undefined);

/**
 * Localizer
 * @memberof Localization
 * @type {Localization.Localizer}
 * @name localize
 * @since v1.0.0
 * @param {string} key Message key of locale dictionary depending on default language
 * @param {...*} args Arguments to be used when calling IntlMessageFormat
 * @returns {(string | IntlMessageFormat)}
 * @throws Default localizer has not been initialized. Please, call initializeLocalizer firsT in order to create a default localizer
 * @throws Error propagated from IntlMessageFormat
 * @example
 *
 * const lf = localizerFactory('en', {en: {foo: 'bar'}}, {number: {EUR: {style: 'currency', currency: 'EUR'}}}, true);
 * lf('foo') //=> 'bar'
 * lf('qux') //=> ''
 */
export const localize: Localizer | never = (key, ...args) => {
  if (!internalLocalizer)
    throw new Error(
      'Default localizer has not been initialized. Please, call initializeLocalizer first in order to create a default localizer'
    );
  return internalLocalizer(key, ...args);
};
