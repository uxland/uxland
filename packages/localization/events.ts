import {constantBuilder} from '@uxland/utilities/constant-builder';

const eventBuilder = constantBuilder('LOCALIZATION', undefined, '::');

export const LOCALES_RESET = eventBuilder('LOCALES-RESET');
export const LOCALES_UPDATED = eventBuilder('LOCALES-UPDATED');
export const LANGUAGE_UPDATED = eventBuilder('LANGUAGE-UPDATED');
export const LANGUAGE_RESET = eventBuilder('LANGUAGE-RESET');
export const FORMATTERS_UPDATED = eventBuilder('FORMATERS-UPDATED');
export const FORMATTERS_RESET = eventBuilder('FORMATERS-RESET');
