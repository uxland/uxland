import {publish} from '@uxland/event-aggregator';
import {FORMATTERS_RESET, FORMATTERS_UPDATED} from './events';

let currentFormats = {};

/**
 * Set new current formats from provided value. Publishes an event `FORMATTERS_UPDATED` in order to inform all listeners of the formatters change
 * @function
 * @memberof Localization
 * @name setFormatters
 * @since v1.0.0
 * @param {*} formats New formatters
 * @returns {void}
 * @example
 *
 * setFormatters({ number: { EUR: { style: 'currency', currency: 'EUR' } } })
 *
 */
export const setFormatters = (formats: any): void => {
  currentFormats = formats;
  publish(FORMATTERS_UPDATED, currentFormats);
};

/**
 * Returns current formats
 * @function
 * @memberof Localization
 * @name getFormatters
 * @since v1.0.0
 * @returns {*}
 */
export const getFormatters = (): any => currentFormats;

/**
 * Reset formats to default formats. Publishes an event `FORMATTERS_RESET` in order to inform all listeners of the formatters reset
 * @function
 * @memberof Localization
 * @name resetFormatters
 * @since v1.0.0
 */
export const resetFormatters = (): void => {
  currentFormats = {};
  publish(FORMATTERS_RESET, {});
};
