/*
 * MIT License
 *
 * Copyright (c) 2020 UXLand
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
/** @namespace FetchClient */

import { Configuration, QueryParams, ResponseHandler } from "./domain";
import { handleErrors } from "./handlers/handle-errors";
import { handleResponse } from "./handlers/handle-response";
import { getRequestUrl } from "./helpers/get-request-url";
import { mergeRequest } from "./helpers/merge-request";

const CONTENT_TYPE_JSON = "application/json";

let baseUrl: string;
const responseHandlers: ResponseHandler[] = [];
const defaultHeaders = {
  "Content-Type": CONTENT_TYPE_JSON,
};
let configuration: Configuration = {
  headers: { ...defaultHeaders },
  credentials: "include",
  mode: "cors",
};

/**
 * Updates fetch client's base url
 * @memberof FetchClient
 * @since v1.0.0
 * @param base {string} Base URL
 * @returns {void|never}
 */
export const setBaseUrl = (base: string) => (baseUrl = base);
export const getBaseUrl = (): string => baseUrl;

/**
 * Adds a response handler
 * @memberof FetchClient
 * @since v1.0.0
 * @param {FetchClient.ResponseHandler} handler Response handler
 * @returns {void|never}
 */
export const registerResponseHandler = (handler: ResponseHandler): void => {
  responseHandlers.push(handler);
};
export const getResponseHandlers = () => responseHandlers;

/**
 * Updates fetch client's configuration
 * @memberof FetchClient
 * @since v1.0.0
 * @param {FetchClient.Configuration} config Configuration
 * @returns {void|never}
 */
export const configure = (config: Configuration): void => {
  configuration = { ...configuration, ...config };
};
export const getConfiguration = (): Configuration => configuration;

/**
 * Updates fetch client's headers
 * @memberof FetchClient
 * @since v1.0.0
 * @param {*} headers Headers
 * @returns {void|never}
 */
export const setHeaders = (headers: any): void => {
  configuration = {
    ...configuration,
    headers: { ...configuration.headers, ...headers },
  };
};
export const getHeaders = (): any => configuration?.headers;

/**
 * Removes provided header by ID
 * @memberof FetchClient
 * @since v1.0.0
 * @param {string} key Header key to be removed
 * @returns {void|never}
 */
export const removeHeader = (key: string): void => {
  if (configuration?.headers[key]) delete configuration.headers[key];
};

/**
 * Resets fetch client's headers to default
 * @memberof FetchClient
 * @since v1.0.0
 * @returns {void|never}
 */
export const resetHeaders = (): void => {
  configuration = { ...configuration, headers: { ...defaultHeaders } };
};

/**
 * Updates fetch client's configuration
 * @memberof FetchClient
 * @since v1.0.0
 * @param {string} uri Absolute or relative url to be fetch
 * @param {RequestInit} requestInit Request configuration
 * @param {FetchClient.QueryParams} queryParams Request query parameters as collection
 * @returns {*}
 */
export const fetchClient = async <T>(
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
