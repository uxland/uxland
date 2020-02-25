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
import { publish } from '@uxland/event-aggregator';
import { LANGUAGE_RESET, LANGUAGE_UPDATED } from './events';

/**
 * Default language
 * @constant {string}
 * @memberof Localization
 * @name DEFAULT_LANGUAGE
 * @since v1.0.0
 */
export const DEFAULT_LANGUAGE = 'en';

let defaultLanguage = DEFAULT_LANGUAGE;

/**
 * Set new default language from provided value. Publishes an event `LANGUAGE_UPDATED` in order to inform all listeners of the language change
 * @function
 * @memberof Localization
 * @name setLanguage
 * @since v1.0.0
 * @param {string} language New default language
 * @returns {void}
 * @example
 *
 * setLocales({en: {foo: 'bar'}})
 *
 */
export const setLanguage = (language: string): void => {
  defaultLanguage = language;
  publish(LANGUAGE_UPDATED, language);
};

/**
 * Return default language
 * @function
 * @memberof Localization
 * @name getDefaultLanguage
 * @since v1.0.0
 * @returns {string}
 */
export const getDefaultLanguage = (): string => DEFAULT_LANGUAGE;

/**
 * Returns current default language
 * @function
 * @memberof Localization
 * @name getLanguage
 * @since v1.0.0
 * @returns {string}
 */
export const getLanguage = (): string => defaultLanguage;

/**
 * Reset language to default language. Publishes an event `LANGUAGE_RESET` in order to inform all listeners of the language reset
 * @function
 * @memberof Localization
 * @name resetLanguage
 * @since v1.0.0
 */
export const resetLanguage = (): void => {
  defaultLanguage = DEFAULT_LANGUAGE;
  publish(LANGUAGE_RESET, DEFAULT_LANGUAGE);
};
