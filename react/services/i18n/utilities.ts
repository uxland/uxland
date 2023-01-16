/*
 * @license
 * BSD License
 *
 * Copyright (c) 2023, UXLand
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

import i18n from "i18next";
import { useTranslation } from "react-i18next";

/**
 * Adds new locale resources to the specified language and namespace
 * @function
 * @name addLocaleBundle
 * @memberof ReactServices
 * @param {String} lang - Language
 * @param {String} namespace - Namespace of resources
 * @param {*} resources - Localization resources
 * @since v1.0.0
 * @returns {void}
 * @example
 *
 * addLocaleBundle("ca", "ns", {foo: {bar: "dummy"}});
 */
export const addLocaleBundle = (
  lang: string,
  namespace: string,
  resources: any
) => {
  i18n.addResourceBundle(lang, namespace, resources);
};

/**
 * React hook that returns the content of the provided key from the
 * localization resources dictionary without specifying the namespace
 * @function
 * @name useGlobalPath
 * @memberof ReactServices
 * @since v1.0.0
 * @returns {string}
 * @example
 *
 * const globalPath = useGlobalPath();
 * globalPath("ns.foo.bar") // => dummy
 */
export const useGlobalPath = () => {
  const { t } = useTranslation();

  function globalPath(path: string, args?: any) {
    // If no namespace is provided, namespace must be included in path
    const options = { ...args, ns: path.split(".")[0] };
    return t(`${path.split(".").slice(1).join(".")}`, {
      ...options,
    });
  }

  return globalPath;
};

/**
 * React hook that returns the content of the provided key from the
 * localization resources dictionary for the specific namespace
 * @function
 * @name useLocalePath
 * @memberof ReactServices
 * @since v1.0.0
 * @param {string} namespace - Localization namespace
 * @param {string} basePath - Localization path
 * @returns {string}
 * @example
 *
 * const localePath = useLocalePath("ns");
 * localePath("foo.bar") // => dummy
 */
export const useLocalePath = (namespace?: string, basePath?: string) => {
  const { t } = useTranslation(namespace);

  function localePath(path: string, args?: any) {
    return basePath ? t(`${basePath}.${path}`, args) : t(`${path}`, args);
  }

  return localePath;
};

/**
 * Function that returns correspongind locale value by provided
 * @function
 * @name useLocalePath
 * @memberof ReactServices
 * @since v1.0.0
 * @param {string} namespace - Localization namespace
 * @param {string} path - Localization path
 * @param {*} options - Localization payload
 * @returns {string}
 * @example
 *
 * translate('ns', 'foo.bar', {dummy: 0})
 */
export const translate = (namespace: string, path: string, options?: any) => {
  return i18n.t(path, { ...options, ns: namespace, lng: i18n.language });
};
