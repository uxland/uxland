import {
  localeMixin,
  LocaleMixinFunction,
  localizationSelectors,
  localizerFactory,
  setFormatsActionCreator,
  setLanguageActionCreator,
  setLocalesActionCreator
} from '@uxland/localization';
import { store } from '../store';

export const locale: LocaleMixinFunction = localeMixin(store, localizationSelectors, localizerFactory);
export const setFormats = (formats: any) => store.dispatch(setFormatsActionCreator(formats));
export const setLanguage = (language: string) => store.dispatch(setLanguageActionCreator(language));
export const setLocales = (locales: Object) => store.dispatch(setLocalesActionCreator(locales));
