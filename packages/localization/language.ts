import {publish} from '@uxland/event-aggregator/event-aggregator';
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
