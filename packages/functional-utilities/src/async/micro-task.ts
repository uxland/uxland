import { AsyncInterface } from './async-interface';

let microtaskCurrHandle = 0;
let microtaskLastHandle = 0;
const microtaskCallbacks = [];
let microtaskNodeContent = 0;
const microtaskNode = document && document.createTextNode('');
function microtaskFlush(): void {
  const len = microtaskCallbacks.length;
  for (let i = 0; i < len; i++) {
    const cb = microtaskCallbacks[i];
    if (cb) {
      try {
        cb();
      } catch (e) {
        setTimeout(() => {
          throw e;
        });
      }
    }
  }
  microtaskCallbacks.splice(0, len);
  microtaskLastHandle += len;
}
if (MutationObserver) new MutationObserver(microtaskFlush).observe(microtaskNode, { characterData: true });

export const microTask: AsyncInterface = {
  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof microTask
   * @param {!Function=} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run(callback: Function | undefined): number {
    microtaskNode.textContent = (microtaskNodeContent++).toString();
    microtaskCallbacks.push(callback);
    return microtaskCurrHandle++;
  },

  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(handle: number): void {
    const idx = handle - microtaskLastHandle;
    if (idx >= 0) {
      if (!microtaskCallbacks[idx]) {
        throw new Error('invalid async handle: ' + handle);
      }
      microtaskCallbacks[idx] = null;
    }
  }
};
