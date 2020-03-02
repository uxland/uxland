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

import { publish } from '@uxland/event-aggregator';

declare function serialize(key: string, value: string): string;
export interface Configuration {
  headers?: any;
  credentials?: string;
  mode: string;
}

export interface BapiRet {
  TYPE: string;
  MESSAGE: any;
  LOG_NO: any;
}
export interface InvalidRequestPayload {
  statusText?: string;
  status?: number | void;
}
export interface IFetchClient {
  fetch(input: any, requestInit?: any, queryParams?: any): Promise<any>;
  handleBapiRet(bapiRet: BapiRet): any;
}
export type ResponseHandler = <T>(response) => T;

const HEADER_CONTENT_TYPE = 'Content-Type';
const CONTENT_TYPE_JSON = 'application/json';

const SAP_CLIENT_PARAM = 'sap-client';

const ABSOLUTE_URL_REGEX = /^([a-z][a-z0-9+\-.]*:)?\/\//i;

const BAPIRET_ERROR_CODE = 'E';

export const INVALID_CREDENTIALS_EVENT = 'UXL-CLIENT:INVALID_CREDENTIALS_EVENT';
export const RESET_CREDENTIALS_EVENT = 'UXL-CLIENT:RESET_CREDENTIALS_EVENT';
export const INVALID_REQUEST_EVENT = 'UXL-CLIENT:INVALID_REQUEST_EVENT';

const configuration: Configuration = {
  headers: {
    'Content-Type': CONTENT_TYPE_JSON
  },
  credentials: 'include',
  mode: 'cors'
};

let baseUrl: string;
let defaultQueryParams: {};

const serializeValue = function(value: string | number | boolean): string {
  return value === null || typeof value === 'undefined' ? '' : encodeURIComponent(value);
};

const toQueryParams = function(queryParams: object, prefix?: any): string {
  const str = [];
  for (const p in queryParams) {
    if (queryParams.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p,
        v = queryParams[p];
      str.push(v !== null && typeof v === 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + serializeValue(v));
    }
  }
  return str.join('&');
};

const getRequestUrl = function(baseUrl: string, url: string, queryParams = {}): string {
  if (ABSOLUTE_URL_REGEX.test(url)) {
    return url;
  }

  const resultingUrl = (baseUrl || '') + url;
  const params = toQueryParams(Object.assign({}, defaultQueryParams, queryParams));
  return params ? resultingUrl + '?' + params : resultingUrl;
};

const mergeRequest = function(requestInit: RequestInit, config: Configuration): object {
  requestInit = requestInit || {};
  config = config || configuration;
  const headers = Object.assign({}, config.headers, requestInit.headers || {});
  return Object.assign({}, config, requestInit, { headers: headers });
};

const getCode = (r: any): number | void => {
  const code = r ? r.result || r.RESULT : null;
  if (code) {
    try {
      return parseInt(code);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const isUnauthorizedResponse = (r: any): boolean => {
  const code = getCode(r);
  return code && code == 401;
};
const isInvalidRequest = (r: any): boolean => {
  const code = getCode(r);
  return code && code >= 400;
};
const isResetCredentialsResponse = (r: any): boolean => {
  const code = getCode(r);
  return code && code == 402;
};
const isResponseContentTypeJSON = (response: Response): boolean => {
  const contentType = response.headers.get(HEADER_CONTENT_TYPE);
  return contentType && contentType.indexOf(CONTENT_TYPE_JSON) !== -1;
};

const getError = (r: any): InvalidRequestPayload => {
  return { status: getCode(r), statusText: r.text || r.TEXT };
};

const responseHandlers: ResponseHandler[] = [];

const defaultResponseHandler = <T>(result: T): T => {
  if (isUnauthorizedResponse(result)) {
    publish(INVALID_CREDENTIALS_EVENT, result);
    throw getError(result);
  }
  if (isResetCredentialsResponse(result)) {
    publish(RESET_CREDENTIALS_EVENT, result);
    throw getError(result);
  }
  if (isInvalidRequest(result)) {
    publish(INVALID_REQUEST_EVENT, getError(result));
    throw getError(result);
  }
  return result;
};

export const handleResponse = <T>(response: Response): Promise<T> => {
  return isResponseContentTypeJSON(response)
    ? response
        .json()
        .then(r => responseHandlers.reduce((previousValue, currentValue) => currentValue(previousValue), r))
    : response.text();
};

export const handleErrors = async (response: Response): Promise<Response | never> => {
  const microTask = (): Promise<void> => new Promise(resolve => resolve());
  if (!response.ok) {
    let error;
    try {
      const result = await response.json();
      error = Object.assign(new Error(), result, { status: response.status, statusText: response.statusText });
    } catch (e) {
      error = Object.assign(new Error(), { status: response.status, statusText: response.statusText });
    }

    if (response.status === 401) {
      await microTask();
      publish(INVALID_CREDENTIALS_EVENT, error);
    }
    if (response.status === 402) {
      await microTask();
      publish(RESET_CREDENTIALS_EVENT, error);
    } else {
      await microTask();
      publish(INVALID_REQUEST_EVENT, error);
    }
    throw error;
  }
  return response;
};

export const configure = (config: Configuration): void => {
  Object.assign(configuration, config);
};

export const withHeaders = (headers: any): void => {
  Object.assign(configuration.headers, headers);
};

export const removeHeader = (header: string): void => {
  if (configuration.headers[header]) delete configuration.headers[header];
};

export const withBaseUrl = (url: string): void => {
  baseUrl = url;
};

export const withQueryParams = (queryParams: any): void => {
  defaultQueryParams = queryParams;
};

export const withSapClientParam = (sapClient: string): void => {
  const queryParams = {};
  queryParams[SAP_CLIENT_PARAM] = sapClient;
  withQueryParams(queryParams);
};

export const handleBapiret = (bapiRet: BapiRet | BapiRet[]): string => {
  const arr = [].concat(bapiRet);
  const ret = arr[0];
  if (ret && ret.TYPE == BAPIRET_ERROR_CODE) throw new Error(ret.MESSAGE);
  return ret ? ret.MESSAGE : '';
};

class FetchClient implements IFetchClient {
  fetch<T>(input: any, requestInit?: any, queryParams?: any): Promise<T> {
    return fetch(getRequestUrl(baseUrl, input, queryParams), mergeRequest(requestInit, configuration))
      .then(r => handleErrors(r))
      .then(r => handleResponse<T>(r));
  }
  handleBapiRet = handleBapiret;
}

export class ServiceBase {
  private _fetchClient: FetchClient;
  get fetchClient(): IFetchClient {
    if (this._fetchClient == null) this._fetchClient = new FetchClient();
    return this._fetchClient;
  }
}
export const fetchClient = new FetchClient();
export const registerResponseHandler = (handler: ResponseHandler): void => {
  responseHandlers.push(handler);
};
registerResponseHandler(defaultResponseHandler);
