import { QueryParams } from "../domain";
import { toQueryParams } from "./to-query-params";

const ABSOLUTE_URL_REGEX = /^([a-z][a-z0-9+\-.]*:)?\/\//i;

const defaultQueryParams = {};
export const getRequestUrl = function (
  baseUrl: string,
  url: string,
  queryParams: QueryParams = {}
): string {
  if (ABSOLUTE_URL_REGEX.test(url)) return url;

  const resultingUrl = (baseUrl || "") + (url || "");
  const params = toQueryParams({ ...defaultQueryParams, ...queryParams });
  return params ? resultingUrl + "?" + params : resultingUrl;
};
