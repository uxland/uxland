import {isAndroid} from './browser';

const base64ToBlob = (base64: string, type = 'application/octet-stream') => {
  const binStr = atob(base64);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr], {type: type});
};

/**
 * Returns if it's a tablet's browser
 * @function
 * @name isTabletBrowser
 * @memberof BrowserUtilities
 * @since v1.0.0
 * @returns {boolean}
 * @example
 *
 * isTabletBrowser(); //=> true | false
 */

/**
 * Generates blob url from base64 string
 * @function
 * @name base64ToUrl
 * @memberof BrowserUtilities
 * @since v1.0.1
 * @param data {string} base64
 * @param type {string*} Document type
 * @param open {boolean*} To open document in new/same tab
 * @returns {string}
 */
export const base64ToUrl = (data: string, type = 'application/pdf', open?: boolean): string => {
  const blob = base64ToBlob(data, type);
  const url = URL.createObjectURL(blob);
  if (open)
    if (!isAndroid()) window.location.href = url;
    else window.open(url);
  return url;
};
