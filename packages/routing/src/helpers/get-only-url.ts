import { isPushStateAvailable } from "./is-push-state-available";

const cleanGETParam = (str) => str?.split(/\?(.*)?$/)[0];

/**
 * Returns only the path segment of the url, discarding host,
 * port and query parameters if provided
 * @param url
 * @param useHash
 * @param hash
 */
export const getOnlyUrl = (url: string, useHash = false, hash = "#") => {
  let onlyURL = String(url),
    split;

  if (isPushStateAvailable() && !useHash) {
    onlyURL = cleanGETParam(url)?.split(hash)[0];
  } else {
    split = url.split(hash);
    onlyURL =
      split.length > 1 ? cleanGETParam(split[1]) : cleanGETParam(split[0]);
  }

  return onlyURL;
};
