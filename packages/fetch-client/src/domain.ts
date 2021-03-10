let STUB = 1;
/**
 * Collection of query string parameters
 * @memberof FetchClient
 * @since v1.0.0
 * @typedef {Object} QueryParams
 */
STUB = 1;
export type QueryParams = {[key: string]: any};

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
