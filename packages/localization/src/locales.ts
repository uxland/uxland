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
import { publish } from "@uxland/event-aggregator";
import { mergeDeepRight } from "ramda";
import { LOCALES_RESET, LOCALES_UPDATED } from "./events";

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
export const getLocales = (): Record<string, any> => ({ ...localesCollection });

/**
 * Reset locales collection to default collection. Publishes an event `LOCALES_RESET` in order to inform all listeners of the locales reset
 * @function
 * @memberof Localization
 * @name resetLocales
 * @since v1.0.0
 */
export const resetLocales = (): void => {
  localesCollection = { ...defaultLocales };
  publish(LOCALES_RESET, localesCollection);
};
