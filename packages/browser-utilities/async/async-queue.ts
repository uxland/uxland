/*
 * @license
 * BSD License
 *
 * Copyright (c) 2020, UXLand
 *
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software must display the following acknowledgement: This product includes software developed by the <copyright holder>.
 * 4. Neither the name of the <copyright holder> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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