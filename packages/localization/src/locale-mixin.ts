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
import { subscribe } from "@uxland/event-aggregator";
import { LANGUAGE_UPDATED, LOCALES_UPDATED } from "./events";
import {
  Localizer,
  localizerFactory,
  LocalizerFactory,
} from "./localizer-factory";

interface LocalizationMixin {
  localize: Localizer;
  useKeyIfMissing: boolean;
  formats: any;
  language: string;
  locales: Record<string, any>;
}

interface LocalizationMixinConstructor extends LocalizationMixin {
  new (...args: any[]): LocalizationMixin;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MixinFunction<T> {}
type LocaleMixinFunction = MixinFunction<LocalizationMixinConstructor>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const localeMixin: (factory: LocalizerFactory) => LocaleMixinFunction = (
  factory
) => (superClass: any) =>
  class LocaleMixin extends superClass implements LocalizationMixin {
    localize: Localizer;
    useKeyIfMissing: boolean;
    formats: any;
    language = "en";
    locales: Record<string, any> = {};
    constructor() {
      super();
      subscribe(LOCALES_UPDATED, this.localesChanged.bind(this));
      subscribe(LANGUAGE_UPDATED, this.languageChanged.bind(this));
      this.localize = factory(
        this.language,
        this.locales,
        this.formats,
        this.useKeyIfMissing
      );
    }

    private localesChanged(locales: Record<string, any>): void {
      this.locales = locales;
      this.localize = factory(
        this.language,
        this.locales,
        this.formats,
        this.useKeyIfMissing
      );
    }
    public languageChanged(language: string): void {
      this.language = language;
      this.localize = factory(
        this.language,
        this.locales,
        this.formats,
        this.useKeyIfMissing
      );
    }
  };

export const locale = localeMixin(localizerFactory);
