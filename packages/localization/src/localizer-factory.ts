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
import IntlMessageFormat from 'intl-messageformat';
import {Lens, lensPath, view} from 'ramda';

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
 * Localizer Factory. Use this factory in order to use localization capabilities without the need of a mixin
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
