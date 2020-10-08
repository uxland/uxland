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

let STUB = 1;
/**
 * Collection of query string parameters
 * @memberof FetchClient
 * @since v1.0.0
 * @typedef {Object} QueryParams
 */
STUB = 1;
export type QueryParams = { [key: string]: any };

/**
 * Handler function to manage fetch response
 * @memberof FetchClient
 * @since v1.0.0
 * @typedef {function} ResponseHandler
 * @param {*=} response Fetch response
 */
STUB = 1;
export type ResponseHandler = <T>(response) => T;

/**
 * Configuration interface
 * @memberof FetchClient
 * @since v1.0.0
 * @interface Configuration
 * @property {*=} headers Fetch headers
 * @property {*=} credentials Fetch credentials
 * @property {*=} mode Fetch mode
 */
STUB = 1;
export interface Configuration {
  headers?: any;
  credentials?: string;
  mode: string;
}
