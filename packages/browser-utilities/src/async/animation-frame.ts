import {AsyncInterface} from './async-interface';

/**
 * Asynchronous task that will call provided callback in next window animation frame
 * @constant
 * @name animationFrame
 * @memberof BrowserUtilities
 * @since v1.0.0
 * @example
 *
 * const callback = () => console.log('task ended');
 * const handler = animationFrame.run(callback); //=> 'task ended'
 *
 * // To cancel asynchronous task
 * animationFrame.cancel(handler);
 */
export const animationFrame: AsyncInterface = {
  cancel: handle => window.cancelAnimationFrame(handle),
  run: callback => window.requestAnimationFrame(callback as FrameRequestCallback),
};
