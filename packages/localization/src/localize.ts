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
import { Localizer } from './localizer-factory';

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
export const initializeLocalizer = (localizer: Localizer): Localizer => (internalLocalizer = localizer);

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
      'Default localizer has not been initialized. Please, call initializeLocalizer firsT in order to create a default localizer'
    );
  return internalLocalizer(key, ...args);
};
