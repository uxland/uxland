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
