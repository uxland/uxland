/*
 * MIT License
 *
 * Copyright (c) 2020 ${company}
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
import {subscribe} from '@uxland/event-aggregator';
import {Constructor, dedupeMixin} from '@uxland/utilities/dedupe-mixin';
import {
  FORMATTERS_RESET,
  FORMATTERS_UPDATED,
  LANGUAGE_RESET,
  LANGUAGE_UPDATED,
  LOCALES_RESET,
  LOCALES_UPDATED,
} from './events';
import {Localizer, localizerFactory, LocalizerFactory} from './localizer-factory';

export interface LocalizationMixin {
  localize: Localizer;
  useKeyIfMissing: boolean;
  formats: any;
  language: string;
  locales: Record<string, any>;
}

interface LocalizationMixinConstructor extends LocalizationMixin {
  new (...args: any[]): LocalizationMixin;
}

type LocaleMixinFunction = (superClass: any) => LocalizationMixinConstructor; //=>  MixinFunction<LocalizationMixinConstructor>;

/**
 * Mixin in order to give localization capabilities and to subscribe to locales and language changes
 * @function
 * @memberof Localization
 * @name localeMixin
 * @since v1.0.0
 * @param factory
 * @returns {Object}
 * @example
 *
 * ```typescript
 * const locale = localeMixin(() => localizerFactory('en', {en: {foo: 'bar'}}));
 *
 * export class Klass implements locale(BaseKlass){}
 * ```
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
let formats: any = {};
let language = 'en';
let locales: Record<string, any> = {};
const useKeyIfMissing = false;

export function localeMixin(factory: LocalizerFactory): LocaleMixinFunction {
  return dedupeMixin((superClass: Constructor) => {
    class localeMixin extends superClass implements LocalizationMixin {
      localize: Localizer;
      useKeyIfMissing: boolean = useKeyIfMissing;
      formats: any = formats;
      language = language;
      locales: Record<string, any> = locales;
      constructor() {
        super();
        subscribe(LOCALES_UPDATED, this.localesChanged.bind(this));
        subscribe(LOCALES_RESET, this.localesChanged.bind(this));
        subscribe(LANGUAGE_UPDATED, this.languageChanged.bind(this));
        subscribe(LANGUAGE_RESET, this.languageChanged.bind(this));
        subscribe(FORMATTERS_UPDATED, this.formattersChanged.bind(this));
        subscribe(FORMATTERS_RESET, this.formattersChanged.bind(this));
        this.localize = factory(language, locales, formats, useKeyIfMissing);
      }

      private localesChanged(newLocales: Record<string, any>): void {
        locales = newLocales;
        this.locales = newLocales;
        this.localize = factory(language, locales, formats, useKeyIfMissing);
      }
      public languageChanged(newLanguage: string): void {
        language = newLanguage;
        this.language = newLanguage;
        this.localize = factory(language, locales, formats, useKeyIfMissing);
      }
      public formattersChanged(newFormats: string): void {
        formats = newFormats;
        this.formats = newFormats;
        this.localize = factory(language, locales, formats, useKeyIfMissing);
      }
    }
    return localeMixin;
  });
}

/**
 * Default mixin in order to give localization capabilities and to subscribe to locales and language changes
 * @function
 * @memberof Localization
 * @name locale
 * @since v1.0.0
 * @returns {Object}
 */
export const locale = localeMixin(localizerFactory);
