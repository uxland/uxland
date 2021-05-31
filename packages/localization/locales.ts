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
import {publish} from '@uxland/event-aggregator/event-aggregator';
import {mergeDeepRight} from 'ramda';
import {LOCALES_RESET, LOCALES_UPDATED} from './events';

const defaultLocales: Record<string, any> = {};
let localesCollection: Record<string, any> = {};

/**
 * Set new locales from provided object. Publishes an event `LOCALES_UPDATED` in order to inform all listeners of the locales change
 * @function
 * @memberof Localization
 * @name setLocales
 * @since v1.0.0
 * @param {Object} locales New locales collection
 * @returns {void}
 * @example
 *
 * setLocales({en: {foo: 'bar'}})
 *
 */
export const setLocales = (locales: Record<string, any>): void => {
  // localesCollection = { ...defaultLocales, ...localesCollection, ...locales };
  localesCollection = mergeDeepRight(defaultLocales, localesCollection);
  localesCollection = mergeDeepRight(localesCollection, locales);
  publish(LOCALES_UPDATED, localesCollection);
};

/**
 * Return default locales collection
 * @function
 * @memberof Localization
 * @name getDefaultLocales
 * @since v1.0.0
 * @returns {Object}
 */
export const getDefaultLocales = (): Record<string, any> => ({
  ...defaultLocales,
});

/**
 * Returns current locales collection
 * @function
 * @memberof Localization
 * @name getLocales
 * @since v1.0.0
 * @returns {Object}
 */
export const getLocales = (): Record<string, any> => ({...localesCollection});

/**
 * Reset locales collection to default collection. Publishes an event `LOCALES_RESET` in order to inform all listeners of the locales reset
 * @function
 * @memberof Localization
 * @name resetLocales
 * @since v1.0.0
 */
export const resetLocales = (): void => {
  localesCollection = {...defaultLocales};
  publish(LOCALES_RESET, localesCollection);
};
