/**
 * Returns base64 of input file
 * @function
 * @name toBase64
 * @async
 * @memberof BrowserUtilities
 * @param {File} file - The input file to transform to base64
 * @since v1.0.0
 * @returns {Promise<string>}
 * @example
 *
 * const file = new File(["foo"], "foo.txt", {
 *    type: "text/plain",
 * });
 * await toBase64(file); //=> data:text/plain;base64,Zm9v
 */
export const toBase64 = (file: File): Promise<string | ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result);
    reader.onerror = (error: any): void => reject(error);
  });
