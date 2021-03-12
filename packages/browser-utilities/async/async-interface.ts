let STUB = 1;
/** Async Runner
 * @memberof BrowserUtilities
 * @since v1.0.0
 * @typedef AsyncRunner
 * @param {function} callback - Callback function to call once asynchronous task has finished
 * @param {number=} delay - Delay in miliseconds to start asynchronous task
 */
STUB = 1;
export type AsyncRunner = (callback: () => void, delay?: number) => number;

/**
 * Async Interface
 * @memberof BrowserUtilities
 * @since v1.0.0
 * @interface AsyncInterface
 * @property {function} cancel - Cancel asynchronous task
 * @property {AsyncRunner} run - Run asynchronous task
 */
STUB = 1;
export interface AsyncInterface {
  cancel: (handle: number) => void;
  run: (callback: () => any, delay?: number) => number;
}
