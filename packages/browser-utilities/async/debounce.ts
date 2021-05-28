/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import {AsyncInterface} from './async-interface';
import {timeOut} from './time-out';

/**
 * Collapse multiple callbacks into one invocation after a timer.
 * @class
 * @name Debouncer
 * @memberof BrowserUtilities
 * @since v1.0.0
 */
export class Debouncer {
  constructor(
    private asyncModule: AsyncInterface = null,
    private callback: () => void = null,
    private handle: number = null
  ) {}
  /**
   * Sets the scheduler; that is, a module with the Async interface,
   * a callback and optional arguments to be passed to the run function
   * from the async module.
   *
   * @param {!AsyncInterface} asyncModule Object with Async interface.
   * @param {function()} callback Callback to run.
   * @return {void}
   */
  setConfig(asyncModule: AsyncInterface, callback: () => void): void {
    this.asyncModule = asyncModule;
    this.callback = callback;
    this.handle = this.asyncModule.run(() => {
      this.handle = null;
      this.callback();
    });
  }
  /**
   * Cancels an active debouncer and returns a reference to itself.
   *
   * @return {void}
   */
  cancel(): void {
    if (this.isActive()) {
      this.asyncModule.cancel(this.handle);
      this.handle = null;
    }
  }
  /**
   * Flushes an active debouncer and returns a reference to itself.
   *
   * @return {void}
   */
  flush(): void {
    if (this.isActive()) {
      this.cancel();
      this.callback();
    }
  }
  /**
   * Returns true if the debouncer is active.
   *
   * @return {boolean} True if active.
   */
  isActive(): boolean {
    return this.handle != null;
  }
  /**
   * Creates a debouncer if no debouncer is passed as a parameter
   * or it cancels an active debouncer otherwise. The following
   * example shows how a debouncer can be called multiple times within a
   * microtask and "debounced" such that the provided callback function is
   * called once. Add this method to a custom element:
   *
   * ```js
   * import {microTask, debouncer} from '@uxland/browser-utilities';
   * // ...
   *
   * _debounceWork() {
   *   this._debounceJob = Debouncer.debounce(this._debounceJob,
   *       microTask, () => this._doWork());
   * }
   * ```
   *
   * If the `_debounceWork` method is called multiple times within the same
   * microtask, the `_doWork` function will be called only once at the next
   * microtask checkpoint.
   *
   * Note: In testing it is often convenient to avoid asynchrony. To accomplish
   * this with a debouncer, you can use `enqueueDebouncer` and
   * `flush`. For example, extend the above example by adding
   * `enqueueDebouncer(this._debounceJob)` at the end of the
   * `_debounceWork` method. Then in a test, call `flush` to ensure
   * the debouncer has completed.
   *
   * @param {Debouncer?} debouncer Debouncer object.
   * @param {!AsyncInterface} asyncModule Object with Async interface
   * @param {function()} callback Callback to run.
   * @return {!Debouncer} Returns a debouncer object.
   */
  static debounce(
    debouncer: Debouncer,
    asyncModule: AsyncInterface,
    callback: () => void
  ): Debouncer {
    if (debouncer instanceof Debouncer) {
      debouncer.cancel();
    } else {
      debouncer = new Debouncer();
    }
    debouncer.setConfig(asyncModule, callback);
    return debouncer;
  }
}
export const debounce: (delay: number) => MethodDecorator =
  delay =>
  (target, propertyKey, descriptor): void => {
    const desc = descriptor as any;
    const originalCall: () => void = desc.value;
    desc.value = (...args: any[]): Debouncer =>
      //@ts-ignore
      (this.debouncer = Debouncer.debounce(
        //@ts-ignore
        this.debouncer,
        timeOut.after(delay),
        originalCall.apply(args)
      ));
  };

const debouncerQueue = new Set();

/**
 * Adds a `Debouncer` to a list of globally flushable tasks.
 *
 * @param {!Debouncer} debouncer Debouncer to enqueue
 * @return {void}
 */
export const enqueueDebouncer = function (debouncer) {
  debouncerQueue.add(debouncer);
};

/**
 * Flushes any enqueued debouncers
 *
 * @return {boolean} Returns whether any debouncers were flushed
 */
export const flushDebouncers = function () {
  const didFlush = Boolean(debouncerQueue.size);
  // If new debouncers are added while flushing, Set.forEach will ensure
  // newly added ones are also flushed
  debouncerQueue.forEach((debouncer: Debouncer) => {
    try {
      debouncer.flush();
    } catch (e) {
      setTimeout(() => {
        throw e;
      });
    }
  });
  return didFlush;
};
