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
