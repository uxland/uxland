/**
 * Creates an asynchronous queue instance that will call provided function when possible
 * @class
 * @name AsyncQueue
 * @memberof BrowserUtilities
 * @since v1.0.0
 * @example
 *
 * const executor = (...args: any[]) => console.log('Queue Executor', args);
 * const queue = new AsyncQueue(executor);
 *
 * queue.enqueueItem(1); //=> 'Queue Executor' 1;
 */
export class AsyncQueue {
  private _ownQueue = [];
  private isProcessing = false;
  private executor: () => any;

  constructor(fn: () => any) {
    this.executor = fn;
  }

  /**
   * Enqueues item and tries to call executor with provided args
   * @param args Arguments to pass to executor function
   * @return {void}
   */
  public enqueueItem(...args: any[]): void {
    this._ownQueue.push([...args]);
    this.tryProcessQueue();
  }

  async tryProcessQueue(): Promise<void> {
    if (!this.isProcessing && this._ownQueue.length) {
      this.isProcessing = true;
      const args = this._ownQueue.pop();
      await this.executor.apply(undefined, [...args]);
      this.isProcessing = false;
      this.tryProcessQueue();
    }
  }
}
