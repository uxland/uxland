export class AsyncQueue {
  private _ownQueue = [];
  private isProcessing = false;
  private executor: () => void;

  constructor(fn: () => void) {
    this.executor = fn;
  }

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
