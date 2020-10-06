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

export const setBaseUrl = (base: string) => (baseUrl = base);
export const getBaseUrl = (): string => baseUrl;

export const registerResponseHandler = (handler: ResponseHandler): void => {
  responseHandlers.push(handler);
};
export const getResponseHandlers = () => responseHandlers;

export const configure = (config: Configuration): void => {
  configuration = { ...configuration, ...config };
};
export const getConfiguration = (): Configuration => configuration;

export const setHeaders = (headers: any): void => {
  configuration = {
    ...configuration,
    headers: { ...configuration.headers, ...headers },
  };
};
export const getHeaders = (): any => configuration?.headers;
export const removeHeader = (key: string): void => {
  if (configuration?.headers[key]) delete configuration.headers[key];
};
export const resetHeaders = (): void => {
  configuration = { ...configuration, headers: { ...defaultHeaders } };
};

export const uxlFetch = async <T>(
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
