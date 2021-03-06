/*
 * @license
 * BSD License
 *
 * Copyright (c) 2020, UXLand
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
import {Configuration, QueryParams, ResponseHandler} from './domain';
import {handleErrors} from './handlers/handle-errors';
import {handleResponse} from './handlers/handle-response';
import {getRequestUrl} from './helpers/get-request-url';
import {mergeRequest} from './helpers/merge-request';

const CONTENT_TYPE_JSON = 'application/json';

let baseUrl: string;
const responseHandlers: ResponseHandler[] = [];
const defaultHeaders = {
  'Content-Type': CONTENT_TYPE_JSON,
};
let configuration: Configuration = {
  headers: {...defaultHeaders},
  credentials: 'include',
  mode: 'cors',
};

/**
 * Updates fetch client's base url. All relative fetch will use this as it's own base URL.
 * @memberof FetchClient
 * @function
 * @name setBaseUrl
 * @since v1.0.0
 * @param base {string} Base URL
 * @returns {void|never}
 * @example
 *
 * ```typescript
 * setBaseUrl('http://localhost')
 * ```
 *
 */
export const setBaseUrl = (base: string) => (baseUrl = base);

/* istanbul ignore next */
export const getBaseUrl = (): string => baseUrl;

/**
 * Adds a response handler
 * @memberof FetchClient
 * @function
 * @name registerResponseHandler
 * @since v1.0.0
 * @param {FetchClient.ResponseHandler} handler Response handler
 * @returns {void|never}
 * @example
 *
 * ```typescript
 * registerResponseHandler((response) => JSON.stringify(response))
 * ```
 *
 */
export const registerResponseHandler = (handler: ResponseHandler): void => {
  responseHandlers.push(handler);
};

/* istanbul ignore next */
export const getResponseHandlers = () => responseHandlers;

/**
 * Updates fetch client's configuration globally
 * @memberof FetchClient
 * @function
 * @name configure
 * @since v1.0.0
 * @param {FetchClient.Configuration} config Configuration
 * @returns {void|never}
 * @example
 *
 * ```typescript
 * configure({mode: 'no-cors'})
 * ```
 *
 */
export const configure = (config: Configuration): void => {
  configuration = {...configuration, ...config};
};

/* istanbul ignore next */
export const getConfiguration = (): Configuration => configuration;

/**
 * Updates fetch client's headers globally
 * @memberof FetchClient
 * @function
 * @name setHeaders
 * @since v1.0.0
 * @param {*} headers Headers
 * @returns {void|never}
 * @example
 *
 * ```typescript
 * setHeaders({authorization: 'Bearer <token>'})
 * ```
 *
 */
export const setHeaders = (headers: any): void => {
  configuration = {
    ...configuration,
    headers: {...configuration.headers, ...headers},
  };
};

/* istanbul ignore next */
export const getHeaders = (): any => configuration?.headers;

/**
 * Removes provided header by ID
 * @memberof FetchClient
 * @function
 * @name removeHeader
 * @since v1.0.0
 * @param {string} key Header key to be removed
 * @returns {void|never}
 * @example
 *
 * ```typescript
 * removeHeader('authorization')
 * ```
 *
 */
export const removeHeader = (key: string): void => {
  if (configuration?.headers[key]) delete configuration.headers[key];
};

/**
 * Resets fetch client's headers to default
 * @memberof FetchClient
 * @function
 * @name resetHeaders
 * @since v1.0.0
 * @returns {void|never}
 * @example
 *
 * ```typescript
 * resetHeaders()
 * ```
 *
 */
export const resetHeaders = (): void => {
  configuration = {...configuration, headers: {...defaultHeaders}};
};

/**
 * Fetch data from provided uri and configuration
 * @memberof FetchClient
 * @function
 * @name doFetch
 * @since v1.0.0
 * @param {string} uri Absolute or relative url to be fetch
 * @param {RequestInit=} requestInit Request configuration
 * @param {FetchClient.QueryParams=} queryParams Request query parameters as collection
 * @throws Fetch error
 * @returns {Promise<*>}
 * @example
 *
 * ```typescript
 * doFetch('/dummy', {headers: {authorization: 'Bearer <token>'}}, {foo: 'bar'})
 * ```
 *
 */
export const doFetch = async <T>(
  uri: string,
  requestInit?: RequestInit,
  queryParams?: QueryParams
): Promise<T> => {
  const result = await fetch(
    getRequestUrl(baseUrl, uri, queryParams),
    mergeRequest(requestInit, configuration)
  );
  const response = await handleErrors(result);
  const data = await handleResponse<T>(response, responseHandlers);
  return data;
};
