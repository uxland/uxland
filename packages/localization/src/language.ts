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
import {publish} from '@uxland/event-aggregator';
import {LANGUAGE_RESET, LANGUAGE_UPDATED} from './events';

/**
 * Default language
 * @constant {string}
 * @memberof Localization
 * @name DEFAULT_LANGUAGE
 * @since v1.0.0
 */
export const DEFAULT_LANGUAGE = 'en';

let currentLanguage = DEFAULT_LANGUAGE;

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
  currentLanguage = language;
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
export const getLanguage = (): string => currentLanguage;

/**
 * Reset language to default language. Publishes an event `LANGUAGE_RESET` in order to inform all listeners of the language reset
 * @function
 * @memberof Localization
 * @name resetLanguage
 * @since v1.0.0
 */
export const resetLanguage = (): void => {
  currentLanguage = DEFAULT_LANGUAGE;
  publish(LANGUAGE_RESET, DEFAULT_LANGUAGE);
};
