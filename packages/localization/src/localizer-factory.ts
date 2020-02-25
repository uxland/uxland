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
import IntlMessageFormat from 'intl-messageformat';
import { Lens, lensPath, view } from 'ramda';

const getArgs = (args: any[]): any[] => {
  let result = args;
  if (args && args.length == 1) {
    if (Object.prototype.toString.call(args[0]) === '[object Array]') result = args[0];
    else if (typeof args[0] === 'object') {
      const argObj = args[0];
      result = Object.keys(argObj).reduce((previous: any[], currentKey: string) => {
        return previous.concat(currentKey, argObj[currentKey]);
      }, []);
    }
  }

  return result;
};
const getLens = (key: string): Lens => lensPath(String(key).split('.'));
let STUB = 1;
/**
 * Localizer
 * @memberof Localization
 * @typedef {function} Localizer
 * @since v1.0.0
 * @param {string} key Message key of locale dictionary depending on default language
 * @param {...*} args Arguments to be used when calling IntlMessageFormat
 * @returns {(string | IntlMessageFormat)}
 * @throws Error propagated from IntlMessageFormat
 * @example
 *
 * const lf = localizerFactory('en', {en: {foo: 'bar'}}, {number: {EUR: {style: 'currency', currency: 'EUR'}}}, true);
 * lf('foo') //=> 'bar'
 * lf('qux') //=> ''
 */
STUB = 1;
export type Localizer = (key: string, ...args: any[]) => IntlMessageFormat | string;
export type LocalizerFactory = (
  language: string,
  locales: Record<string, any>,
  formats?: any,
  useKeyIfMissing?: boolean
) => Localizer;

/**
 * Localizer Factory
 * @name localizerFactory
 * @function
 * @memberof Localization
 * @since v1.0.0
 * @param {string} language Default language
 * @param {object} locales Locales collection
 * @param {object=} formats Custom defined formats
 * @param {boolean=} useKeyIfMissing Return key if locale is not defined
 * @returns {Localization.Localizer}
 * @throws Describe throw condition
 * @example
 *
 * localizerFactory('en', {en: {foo: 'bar'}}, {number: {EUR: {style: 'currency', currency: 'EUR'}}}, true)
 *
 */
export const localizerFactory: LocalizerFactory = (
  language: string,
  locales: Record<string, any>,
  formats = {},
  useKeyIfMissing = false
) =>
  function localize(key: string, ...args: any[]): IntlMessageFormat | string {
    if (!key || !locales || !language || !locales[language]) return '';
    const translatedValue: string = view(getLens(key), locales[language]);
    if (!translatedValue) return useKeyIfMissing ? key : '';
    if (!args || !args.length) return translatedValue;

    const cachedMessages: Record<string, IntlMessageFormat> = {};
    const messageKey = `${key}${translatedValue}`;
    let translatedMessage = cachedMessages[messageKey];
    if (!translatedMessage) {
      translatedMessage = new IntlMessageFormat(translatedValue, language, formats);
      cachedMessages[messageKey] = translatedMessage;
    }

    args = getArgs(args);
    const arg = {};
    for (let i = 0; i < args.length; i += 2) arg[args[i]] = args[i + 1];
    return translatedMessage.format(arg);
  };
